/**
 * One-shot backfill: find wikis without an `imageUrl`, look up the title
 * on the matching-language Wikipedia, mirror the page thumbnail to GCS,
 * and patch the wiki doc with imageUrl/imageWidth/imageHeight/
 * originalImageUrl. Also prepends `![title](url)` into the content
 * markdown so the article renders an inline header image consistent with
 * Wikipedia-seeded wikis.
 *
 * Sources (in order of intent):
 *   1. MediaWiki pageimages by exact title on `{wiki.language}.wikipedia.org`
 *      (redirects=1 handles renames / disambiguation suffixes the seed
 *      flow would have followed).
 *
 * Wikis whose title doesn't resolve on Wikipedia are left alone — better
 * to ship them imageless than attach a wrong image.
 *
 * Usage:
 *   npx tsx scripts/backfill-wiki-images.ts                    # dry-run
 *   npx tsx scripts/backfill-wiki-images.ts --apply            # write to Firestore + GCS
 *   npx tsx scripts/backfill-wiki-images.ts --limit=500        # cap docs scanned
 *   npx tsx scripts/backfill-wiki-images.ts --start-after=ID   # resume from doc id
 *   npx tsx scripts/backfill-wiki-images.ts --concurrency=8    # parallel image fetches
 *
 * Idempotent: wikis with imageUrl already set are skipped; failed
 * lookups don't write anything, so subsequent runs can re-try.
 */

import {
  initializeApp,
  cert,
  applicationDefault,
  type ServiceAccount,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import { mirrorImageToGCS, isGcsUrl } from '../src/lib/gcs';

config({ path: '.env.local', override: true });

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const DRY = !APPLY;
function flagValue(name: string): string | undefined {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.slice(name.length + 3) : undefined;
}
const LIMIT = Number(flagValue('limit') ?? 0);
const START_AFTER = flagValue('start-after');
// With batched Wikipedia lookups (50 titles/call) the Firestore page size
// no longer caps the API spend, so we use a bigger page for fewer round
// trips. CONCURRENCY now controls GCS upload parallelism for the docs
// that actually have a Wikipedia thumbnail (~35% of scanned).
const CONCURRENCY = Number(flagValue('concurrency') ?? 24);
const PAGE = Number(flagValue('page') ?? 500);

function initFirebase() {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'gptwiki';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (clientEmail && privateKey) {
    const sa: ServiceAccount = { projectId, clientEmail, privateKey };
    return initializeApp({ credential: cert(sa), projectId });
  }
  console.log('▸ no FIREBASE_CLIENT_EMAIL/PRIVATE_KEY in env — using ADC');
  return initializeApp({ credential: applicationDefault(), projectId });
}

const app = initFirebase();
const db = getFirestore(app);

interface WikiDoc {
  title?: string;
  content?: string;
  language?: string;
  imageUrl?: string | null;
  originalImageUrl?: string | null;
}

interface WikiImage {
  source: string;
  width?: number;
  height?: number;
}

interface MediaWikiPage {
  pageid?: number;
  title?: string;
  missing?: string;
  thumbnail?: WikiImage;
  original?: WikiImage;
}

interface MediaWikiResponse {
  query?: {
    normalized?: { from: string; to: string }[];
    redirects?: { from: string; to: string }[];
    pages?: Record<string, MediaWikiPage>;
  };
}

type Action = 'skip-has-image' | 'skip-no-title' | 'no-wiki-match' | 'mirror-failed' | 'updated' | 'failed';

const USER_AGENT = 'GPTwiki-Bot/1.0 (https://gptwiki.net)';
const MEDIAWIKI_BATCH_SIZE = 50; // MediaWiki API caps `titles=` at 50.

/**
 * Batch-fetch pageimages from `{lang}.wikipedia.org` for up to 50 titles
 * in a single API call. Returns a map keyed by the *original* requested
 * title, threading the response's `normalized` + `redirects` arrays so
 * disambiguation/redirect aliases still resolve to the right page.
 */
async function fetchWikipediaImagesBatch(
  titles: string[],
  lang: string,
): Promise<Map<string, { thumbnail: WikiImage; original?: WikiImage }>> {
  const out = new Map<string, { thumbnail: WikiImage; original?: WikiImage }>();
  if (titles.length === 0) return out;

  const url = new URL(`https://${lang}.wikipedia.org/w/api.php`);
  url.searchParams.set('action', 'query');
  url.searchParams.set('format', 'json');
  url.searchParams.set('prop', 'pageimages');
  url.searchParams.set('piprop', 'thumbnail|original');
  url.searchParams.set('pithumbsize', '640');
  url.searchParams.set('pilimit', String(titles.length));
  url.searchParams.set('titles', titles.join('|'));
  url.searchParams.set('redirects', '1');
  url.searchParams.set('origin', '*');

  let data: MediaWikiResponse | null = null;
  try {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 20_000);
    const res = await fetch(url.toString(), {
      headers: { 'User-Agent': USER_AGENT },
      signal: ac.signal,
    }).finally(() => clearTimeout(timer));
    if (!res.ok) return out;
    data = (await res.json()) as MediaWikiResponse;
  } catch {
    return out;
  }

  const pages = data?.query?.pages;
  if (!pages) return out;

  // Forward each original title through the normalize → redirect chain to
  // find the title under which it now appears in `pages`.
  const finalTitle = new Map<string, string>();
  for (const t of titles) finalTitle.set(t, t);
  const apply = (mapping: { from: string; to: string }[] | undefined) => {
    if (!mapping) return;
    for (const m of mapping) {
      for (const [k, v] of finalTitle) {
        if (v === m.from) finalTitle.set(k, m.to);
      }
    }
  };
  apply(data?.query?.normalized);
  apply(data?.query?.redirects);

  // Index pages by their final title for O(1) lookup.
  const pageByTitle = new Map<string, MediaWikiPage>();
  for (const p of Object.values(pages)) {
    if (p?.title) pageByTitle.set(p.title, p);
  }

  for (const [orig, final] of finalTitle) {
    const p = pageByTitle.get(final);
    if (!p || p.missing !== undefined) continue;
    if (!p.thumbnail) continue;
    out.set(orig, { thumbnail: p.thumbnail, original: p.original });
  }
  return out;
}

/**
 * Insert `![title](url)` markdown into the content. If the content opens
 * with `# Title\n\n`, slot the image right after that heading so the
 * layout matches Wikipedia-seeded wikis. Otherwise prepend. Guards
 * against re-insertion if any markdown image already points at this url.
 */
function insertImageMarkdown(content: string, title: string, url: string): string {
  if (!content) return `![${title}](${url})\n\n`;
  const alreadyHasUrl = content.includes(`](${url})`);
  if (alreadyHasUrl) return content;
  const imageMd = `![${title}](${url})\n\n`;
  // Match `# Heading\n\n` at very start.
  const headingMatch = content.match(/^(# [^\n]*\n\n)/);
  if (headingMatch) {
    return headingMatch[1] + imageMd + content.slice(headingMatch[1].length);
  }
  return imageMd + content;
}

interface EligibleDoc {
  id: string;
  title: string;
  lang: string;
  content: string;
}

function classifyDoc(
  doc: { id: string; data: WikiDoc },
): { action: 'skip-has-image' | 'skip-no-title' } | { eligible: EligibleDoc } {
  if (doc.data.imageUrl && doc.data.imageUrl.trim().length > 0) {
    return { action: 'skip-has-image' };
  }
  if (!doc.data.title) {
    return { action: 'skip-no-title' };
  }
  return {
    eligible: {
      id: doc.id,
      title: doc.data.title,
      lang: doc.data.language || 'en',
      content: doc.data.content ?? '',
    },
  };
}

/**
 * Slice an array into fixed-size chunks. Last chunk may be smaller.
 */
function chunked<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/**
 * Per-language batched fetch: groups eligible docs by language, sends
 * one MediaWiki API call per 50-title chunk in parallel. Returns a flat
 * map of docId → page image data for the ones that resolved.
 */
async function fetchAllImages(
  eligible: EligibleDoc[],
): Promise<Map<string, { thumbnail: WikiImage; original?: WikiImage }>> {
  const byLang = new Map<string, EligibleDoc[]>();
  for (const e of eligible) {
    const list = byLang.get(e.lang) ?? [];
    list.push(e);
    byLang.set(e.lang, list);
  }

  type BatchTask = { lang: string; docs: EligibleDoc[] };
  const tasks: BatchTask[] = [];
  for (const [lang, docs] of byLang) {
    for (const c of chunked(docs, MEDIAWIKI_BATCH_SIZE)) {
      tasks.push({ lang, docs: c });
    }
  }

  // Within a language, MediaWiki rate-limits per-IP. Fire all batches in
  // parallel — 5xx/429 just yields an empty map for that batch and those
  // docs will roll up as 'no-wiki-match' (retryable on a future run).
  const results = await Promise.all(
    tasks.map(async (t) => {
      const titleToImage = await fetchWikipediaImagesBatch(
        t.docs.map((d) => d.title),
        t.lang,
      );
      // Map back from title to docId. Multiple docs can share a title
      // across languages but within a single batch they're unique.
      const out = new Map<string, { thumbnail: WikiImage; original?: WikiImage }>();
      for (const d of t.docs) {
        const img = titleToImage.get(d.title);
        if (img) out.set(d.id, img);
      }
      return out;
    }),
  );

  const merged = new Map<string, { thumbnail: WikiImage; original?: WikiImage }>();
  for (const r of results) for (const [k, v] of r) merged.set(k, v);
  return merged;
}

async function mirrorAndWrite(
  eligible: EligibleDoc,
  images: { thumbnail: WikiImage; original?: WikiImage },
): Promise<{ action: Action; detail?: string }> {
  const thumb = images.thumbnail;
  const orig = images.original;

  const [mirroredThumb, mirroredOrig] = await Promise.all([
    isGcsUrl(thumb.source)
      ? Promise.resolve(thumb.source)
      : mirrorImageToGCS(thumb.source, { prefix: 'wikipedia/thumb' }),
    orig && !isGcsUrl(orig.source)
      ? mirrorImageToGCS(orig.source, { prefix: 'wikipedia/orig' })
      : Promise.resolve(orig?.source ?? null),
  ]);

  if (!mirroredThumb) {
    return { action: 'mirror-failed', detail: thumb.source };
  }

  const updates: Record<string, unknown> = {
    imageUrl: mirroredThumb,
    updatedAt: Date.now(),
  };
  if (thumb.width) updates.imageWidth = thumb.width;
  if (thumb.height) updates.imageHeight = thumb.height;
  if (mirroredOrig) updates.originalImageUrl = mirroredOrig;

  const newContent = insertImageMarkdown(eligible.content, eligible.title, mirroredThumb);
  if (newContent !== eligible.content) {
    updates.content = newContent;
  }

  if (!DRY) {
    await db.collection('wikis').doc(eligible.id).update(updates);
  }
  return { action: 'updated', detail: `${eligible.lang}:${eligible.title} → ${mirroredThumb}` };
}

function tag(): string {
  return DRY ? '[dry-run]' : '[apply]';
}

async function main(): Promise<void> {
  console.log(`${tag()} backfill missing wiki images`);
  console.log(
    `${tag()} page=${PAGE} concurrency=${CONCURRENCY}` +
      (LIMIT ? ` limit=${LIMIT}` : '') +
      (START_AFTER ? ` start-after=${START_AFTER}` : ''),
  );

  const stats: { scanned: number } & Record<Action, number> = {
    scanned: 0,
    'skip-has-image': 0,
    'skip-no-title': 0,
    'no-wiki-match': 0,
    'mirror-failed': 0,
    updated: 0,
    failed: 0,
  };
  let lastId: string | undefined = START_AFTER;

  while (true) {
    let q = db.collection('wikis').orderBy('__name__').limit(PAGE);
    if (lastId) q = q.startAfter(lastId);
    const snap = await q.get();
    if (snap.empty) break;

    // ── Phase 1: classify ──────────────────────────────────────────
    const eligible: EligibleDoc[] = [];
    for (const doc of snap.docs) {
      const data = doc.data() as WikiDoc;
      const c = classifyDoc({ id: doc.id, data });
      if ('action' in c) {
        stats[c.action]++;
        stats.scanned++;
      } else {
        eligible.push(c.eligible);
      }
    }

    // ── Phase 2: batched Wikipedia lookup ──────────────────────────
    const images = eligible.length > 0 ? await fetchAllImages(eligible) : new Map();

    // ── Phase 3: mirror + write, with bounded GCS concurrency ──────
    const eligibleWithImage = eligible.filter((e) => images.has(e.id));
    const eligibleNoMatch = eligible.filter((e) => !images.has(e.id));
    for (const e of eligibleNoMatch) {
      stats['no-wiki-match']++;
      stats.scanned++;
      console.log(`  ✗ ${e.id}  no match: ${e.lang}:${e.title}`);
    }

    for (let i = 0; i < eligibleWithImage.length; i += CONCURRENCY) {
      const batch = eligibleWithImage.slice(i, i + CONCURRENCY);
      const results = await Promise.all(
        batch.map(async (e) => {
          try {
            return await mirrorAndWrite(e, images.get(e.id)!);
          } catch (err) {
            console.error(`[${e.id}] error:`, (err as Error).message);
            return { action: 'failed' as Action };
          }
        }),
      );
      for (let j = 0; j < results.length; j++) {
        const r = results[j];
        stats[r.action]++;
        stats.scanned++;
        if (r.action === 'updated') {
          console.log(`  ✓ ${batch[j].id}  ${r.detail}`);
        } else if (r.action === 'mirror-failed') {
          console.log(`  ⚠ ${batch[j].id}  mirror failed: ${r.detail}`);
        }
      }
    }

    lastId = snap.docs[snap.docs.length - 1].id;
    console.log(
      `  page done: scanned=${stats.scanned} updated=${stats.updated} ` +
        `no-match=${stats['no-wiki-match']} mirror-failed=${stats['mirror-failed']} ` +
        `had-image=${stats['skip-has-image']} no-title=${stats['skip-no-title']} ` +
        `failed=${stats.failed} lastId=${lastId}`,
    );

    if (LIMIT && stats.scanned >= LIMIT) break;
    if (snap.size < PAGE) break;
  }

  console.log(`\n${tag()} done.`, stats);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
