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
const CONCURRENCY = Number(flagValue('concurrency') ?? 12);
const PAGE = Number(flagValue('page') ?? 200);

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

interface MediaWikiResponse {
  query?: {
    pages?: Record<
      string,
      {
        pageid?: number;
        title?: string;
        missing?: string;
        thumbnail?: WikiImage;
        original?: WikiImage;
      }
    >;
  };
}

type Action = 'skip-has-image' | 'skip-no-title' | 'no-wiki-match' | 'mirror-failed' | 'updated' | 'failed';

const USER_AGENT = 'GPTwiki-Bot/1.0 (https://gptwiki.net)';

async function fetchWikipediaImage(
  title: string,
  lang: string,
): Promise<{ thumbnail?: WikiImage; original?: WikiImage } | null> {
  // Use MediaWiki API with prop=pageimages — same endpoint the seed flow
  // uses, but querying by title instead of randomly sampling.
  const url = new URL(`https://${lang}.wikipedia.org/w/api.php`);
  url.searchParams.set('action', 'query');
  url.searchParams.set('format', 'json');
  url.searchParams.set('prop', 'pageimages');
  url.searchParams.set('piprop', 'thumbnail|original');
  url.searchParams.set('pithumbsize', '640');
  url.searchParams.set('titles', title);
  url.searchParams.set('redirects', '1');
  url.searchParams.set('origin', '*');

  try {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 15_000);
    const res = await fetch(url.toString(), {
      headers: { 'User-Agent': USER_AGENT },
      signal: ac.signal,
    }).finally(() => clearTimeout(timer));
    if (!res.ok) return null;
    const data = (await res.json()) as MediaWikiResponse;
    const pages = data.query?.pages;
    if (!pages) return null;
    const page = Object.values(pages)[0];
    if (!page || page.missing !== undefined) return null;
    if (!page.thumbnail) return null;
    return { thumbnail: page.thumbnail, original: page.original };
  } catch {
    return null;
  }
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

interface ProcessResult {
  action: Action;
  detail?: string;
}

async function processDoc(docId: string, data: WikiDoc): Promise<ProcessResult> {
  if (data.imageUrl && data.imageUrl.trim().length > 0) {
    return { action: 'skip-has-image' };
  }
  if (!data.title) {
    return { action: 'skip-no-title' };
  }

  const lang = data.language || 'en';
  const wikiImages = await fetchWikipediaImage(data.title, lang);
  if (!wikiImages || !wikiImages.thumbnail) {
    return { action: 'no-wiki-match', detail: `${lang}:${data.title}` };
  }

  const thumb = wikiImages.thumbnail;
  const orig = wikiImages.original;

  // Mirror to GCS so we never persist a Wikimedia upstream URL that may
  // be purged. Same prefix conventions as the seed flow.
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

  // Insert markdown image into content. The seed flow uses the article
  // title as alt text, so we do the same.
  const newContent = insertImageMarkdown(data.content ?? '', data.title, mirroredThumb);
  if (newContent !== (data.content ?? '')) {
    updates.content = newContent;
  }

  if (!DRY) {
    await db.collection('wikis').doc(docId).update(updates);
  }
  return { action: 'updated', detail: `${lang}:${data.title} → ${mirroredThumb}` };
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
  let done = false;

  while (!done) {
    let q = db.collection('wikis').orderBy('__name__').limit(PAGE);
    if (lastId) q = q.startAfter(lastId);
    const snap = await q.get();
    if (snap.empty) break;

    for (let i = 0; i < snap.docs.length; i += CONCURRENCY) {
      const chunk = snap.docs.slice(i, i + CONCURRENCY);
      const results = await Promise.all(
        chunk.map(async (doc) => {
          const data = doc.data() as WikiDoc;
          try {
            return await processDoc(doc.id, data);
          } catch (err) {
            console.error(`[${doc.id}] error:`, (err as Error).message);
            return { action: 'failed' as Action };
          }
        }),
      );
      for (let j = 0; j < results.length; j++) {
        const r = results[j];
        stats.scanned++;
        stats[r.action]++;
        if (r.action === 'updated') {
          console.log(`  ✓ ${chunk[j].id}  ${r.detail}`);
        } else if (r.action === 'no-wiki-match') {
          console.log(`  ✗ ${chunk[j].id}  no match: ${r.detail}`);
        } else if (r.action === 'mirror-failed') {
          console.log(`  ⚠ ${chunk[j].id}  mirror failed: ${r.detail}`);
        }
      }
      if (LIMIT && stats.scanned >= LIMIT) {
        done = true;
        break;
      }
    }

    lastId = snap.docs[snap.docs.length - 1].id;
    console.log(
      `  page done: scanned=${stats.scanned} updated=${stats.updated} ` +
        `no-match=${stats['no-wiki-match']} mirror-failed=${stats['mirror-failed']} ` +
        `had-image=${stats['skip-has-image']} no-title=${stats['skip-no-title']} ` +
        `failed=${stats.failed} lastId=${lastId}`,
    );

    if (snap.size < PAGE) break;
  }

  console.log(`\n${tag()} done.`, stats);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
