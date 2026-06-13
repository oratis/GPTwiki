/**
 * Editorial quality-tier seeder: hand-written DraftArticle batches
 * (content/ai-in-practice.ts, …) → one Seedream hero image per topicKey →
 * GCS → Firestore `wikis` → Typesense.
 *
 * How it differs from the legacy seeders (src/app/api/seed, seed-drafts.ts):
 *  - De-dup is a per-draft (title, language) point query; the legacy
 *    "read every existing title" scan is unusable at the current corpus size.
 *  - Articles carry imageUrl/imageWidth/imageHeight plus the inline hero
 *    markdown, and a `keywords` fallback index, and are upserted into
 *    Typesense at write time (when TYPESENSE_* is configured).
 *  - Attributed to the dedicated `gptwiki-editorial` identity (profile doc
 *    auto-created so the byline links somewhere real), source: 'editorial'.
 *
 * Image idempotency: the GCS object path is editorial/<topicKey>.jpg, so
 * re-runs reuse the already-uploaded image instead of re-billing Seedream.
 * Language variants share a topicKey and therefore share one image
 * (same convention as translate-wikis.ts, which copies image fields verbatim).
 * If image generation fails, that topic's drafts are SKIPPED (not seeded
 * imageless) so a later re-run completes them properly.
 *
 * Usage:
 *   npx tsx scripts/seed-editorial.ts                        # dry-run
 *   npx tsx scripts/seed-editorial.ts --apply                # write
 *   npx tsx scripts/seed-editorial.ts --apply --no-images    # text only
 *   npx tsx scripts/seed-editorial.ts --only=mcp-explained,ai-agents
 *   npx tsx scripts/seed-editorial.ts --batch=ai-in-practice
 */

import {
  initializeApp,
  cert,
  applicationDefault,
  type ServiceAccount,
} from 'firebase-admin/app';
import { getFirestore, FieldValue, type Firestore } from 'firebase-admin/firestore';
import { Storage } from '@google-cloud/storage';
import { config } from 'dotenv';
import { buildSearchKeywords } from '../src/lib/search-keywords';
import {
  isTypesenseEnabled,
  toTypesenseDoc,
  upsertWikiToTypesense,
} from '../src/lib/typesense';
import type { DraftArticle, DraftLanguage } from '../content/types';

config({ path: '.env.local', override: true });

// ─── CLI ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const NO_IMAGES = args.includes('--no-images');
function flag(name: string): string | undefined {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a ? a.slice(name.length + 3) : undefined;
}
const BATCH = flag('batch') ?? 'ai-in-practice';
const ONLY = new Set((flag('only') ?? '').split(',').filter(Boolean));

// ─── Config ──────────────────────────────────────────────────────────────
const EDITORIAL_ID = 'gptwiki-editorial';
const EDITORIAL_NAME = 'GPTwiki Editorial';
const SOURCE = 'editorial';

const ARK_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
const ARK_MODEL = 'doubao-seedream-5-0-260128';
// Seedream 5 requires ≥ 3,686,400 px; 2560×1440 is the smallest 16:9 that
// passes, and matches WikiContent's 16:9 crop.
const IMG_W = 2560;
const IMG_H = 1440;

const GCS_BUCKET = process.env.GCS_WIKI_IMAGES_BUCKET || 'gptwiki-images';

const LANGS = new Set<DraftLanguage>([
  'en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru', 'ar', 'hi', 'it', 'tr', 'vi', 'th',
]);

// Batches seedable by this script. Add new clusters here.
const BATCHES: Record<string, () => Promise<DraftArticle[]>> = {
  'ai-in-practice': () => import('../content/ai-in-practice').then((m) => m.aiInPractice),
  'personal-finance': () => import('../content/personal-finance').then((m) => m.personalFinance),
  'digital-buying': () => import('../content/digital-buying').then((m) => m.digitalBuying),
  'digital-security': () => import('../content/digital-security').then((m) => m.digitalSecurity),
  'health-basics': () => import('../content/health-basics').then((m) => m.healthBasics),
  'dev-practices': () => import('../content/dev-practices').then((m) => m.devPractices),
};

// ─── Init ────────────────────────────────────────────────────────────────
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

function initStorage(): Storage {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (clientEmail && privateKey) {
    return new Storage({
      projectId: process.env.FIREBASE_PROJECT_ID,
      credentials: { client_email: clientEmail, private_key: privateKey },
    });
  }
  return new Storage({ projectId: process.env.FIREBASE_PROJECT_ID });
}

// ─── Validation ──────────────────────────────────────────────────────────
function validateDraft(d: DraftArticle, i: number): string[] {
  const errs: string[] = [];
  const at = `[${i}] "${d.title ?? '?'}"`;
  for (const f of ['title', 'question', 'content', 'summary'] as const) {
    if (!d[f] || typeof d[f] !== 'string') errs.push(`${at}: missing ${f}`);
  }
  if (!Array.isArray(d.tags) || d.tags.length < 1 || d.tags.length > 8) {
    errs.push(`${at}: tags must have 1–8 entries`);
  }
  if (!LANGS.has(d.language)) errs.push(`${at}: bad language "${d.language}"`);
  if (d.content && !d.content.startsWith('# ')) errs.push(`${at}: content must start with "# Title"`);
  if (d.summary && d.summary.length > 320) errs.push(`${at}: summary too long (${d.summary.length})`);
  if (d.image && !d.topicKey) errs.push(`${at}: image requires topicKey`);
  if (d.image && (!d.image.prompt || !d.image.alt)) errs.push(`${at}: image needs prompt + alt`);
  for (const s of d.sources ?? []) {
    if (!s.title || !/^https:\/\//.test(s.url)) errs.push(`${at}: bad source ${s.url}`);
  }
  return errs;
}

// ─── Seedream ────────────────────────────────────────────────────────────
async function generateImage(prompt: string): Promise<string> {
  const res = await fetch(ARK_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ARK_API_KEY}`,
    },
    body: JSON.stringify({
      model: ARK_MODEL,
      prompt,
      sequential_image_generation: 'disabled',
      response_format: 'url',
      size: `${IMG_W}x${IMG_H}`,
      stream: false,
      watermark: false,
    }),
  });
  if (!res.ok) throw new Error(`Seedream ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = (await res.json()) as { data?: Array<{ url?: string }> };
  const url = data.data?.[0]?.url;
  if (!url) throw new Error(`Seedream returned no URL: ${JSON.stringify(data).slice(0, 300)}`);
  return url;
}

interface HeroImage {
  url: string;
  width: number;
  height: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────
/** Retry transient network failures (the local proxy likes to cut TLS
 *  connections mid-flight — ECONNRESET/fetch failed are normal here). */
async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 4): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i === attempts - 1) break;
      const msg = (err as Error).message ?? String(err);
      console.warn(`    ↻ retry ${i + 1}/${attempts - 1} ${label}: ${msg.slice(0, 120)}`);
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
  throw lastErr;
}

function injectHero(content: string, alt: string, url: string): string {
  const lines = content.split('\n');
  lines.splice(1, 0, '', `![${alt}](${url})`);
  return lines.join('\n');
}

/** True when an existing doc occupies this draft's (title, language) slot.
 *  Legacy docs without a language field count as English. */
async function slotTaken(db: Firestore, d: DraftArticle): Promise<boolean> {
  const snap = await db.collection('wikis').where('title', '==', d.title).limit(5).get();
  return snap.docs.some((doc) => {
    const lang = (doc.data().language as string | undefined) ?? 'en';
    return lang === d.language;
  });
}

async function ensureEditorialUser(db: Firestore): Promise<void> {
  const ref = db.collection('users').doc(EDITORIAL_ID);
  if ((await ref.get()).exists) return;
  await ref.set({
    id: EDITORIAL_ID,
    name: EDITORIAL_NAME,
    email: 'editorial@gptwiki.net',
    image: '',
    provider: 'system',
    wikisCount: 0,
    createdAt: Date.now(),
  });
  console.log(`▸ created users/${EDITORIAL_ID}`);
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const loadBatch = BATCHES[BATCH];
  if (!loadBatch) {
    console.error(`Unknown batch "${BATCH}". Available: ${Object.keys(BATCHES).join(', ')}`);
    process.exit(1);
  }
  let drafts = await loadBatch();
  if (ONLY.size) drafts = drafts.filter((d) => d.topicKey && ONLY.has(d.topicKey));

  console.log(`▸ batch=${BATCH} drafts=${drafts.length}${APPLY ? '' : ' (DRY RUN)'}${NO_IMAGES ? ' no-images' : ''}`);

  const errors = drafts.flatMap(validateDraft);
  if (errors.length) {
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }

  if (APPLY && !NO_IMAGES && !process.env.ARK_API_KEY) {
    console.error('ARK_API_KEY missing — set it in .env.local or pass --no-images');
    process.exit(1);
  }

  const db = getFirestore(initFirebase());
  const bucket = initStorage().bucket(GCS_BUCKET);

  if (APPLY) await ensureEditorialUser(db);

  // 1) One hero image per topicKey (first draft's prompt wins).
  const topics = new Map<string, string>(); // topicKey → prompt
  for (const d of drafts) {
    if (d.topicKey && d.image && !topics.has(d.topicKey)) topics.set(d.topicKey, d.image.prompt);
  }

  const heroes = new Map<string, HeroImage>();
  if (!NO_IMAGES) {
    for (const [key, prompt] of topics) {
      const objectPath = `editorial/${key}.jpg`;
      const file = bucket.file(objectPath);
      const publicUrl = `https://storage.googleapis.com/${GCS_BUCKET}/${objectPath}`;
      try {
        const [exists] = await withRetry(`exists ${key}`, () => file.exists());
        if (exists) {
          heroes.set(key, { url: publicUrl, width: IMG_W, height: IMG_H });
          console.log(`  ✓ image cached  ${key}`);
          continue;
        }
        if (!APPLY) {
          console.log(`  ○ would generate ${key}`);
          continue;
        }
        console.log(`  … generating    ${key}`);
        const buffer = await withRetry(`generate ${key}`, async () => {
          const tmpUrl = await generateImage(prompt);
          const res = await fetch(tmpUrl);
          if (!res.ok) throw new Error(`download ${res.status}`);
          return Buffer.from(await res.arrayBuffer());
        });
        await withRetry(`upload ${key}`, () =>
          file.save(buffer, {
            resumable: false,
            metadata: {
              contentType: 'image/jpeg',
              cacheControl: 'public, max-age=31536000, immutable',
            },
          })
        );
        heroes.set(key, { url: publicUrl, width: IMG_W, height: IMG_H });
        console.log(`  ✓ image uploaded ${key}`);
      } catch (err) {
        console.error(`  ✗ image failed  ${key}: ${(err as Error).message} — topic will be skipped`);
      }
    }
  }

  // 2) Seed drafts.
  const stats = { created: 0, skippedDup: 0, skippedNoImage: 0 };
  for (const d of drafts) {
    const hero = d.topicKey ? heroes.get(d.topicKey) : undefined;
    if (!NO_IMAGES && d.image && !hero && APPLY) {
      // Image generation failed above; leave this draft for a re-run.
      stats.skippedNoImage++;
      console.log(`  ⏭  ${d.language} "${d.title}" (image missing)`);
      continue;
    }
    if (await withRetry(`dup-check "${d.title}"`, () => slotTaken(db, d))) {
      stats.skippedDup++;
      console.log(`  ⏭  ${d.language} "${d.title}" (already seeded)`);
      continue;
    }

    const now = Date.now();
    const content = hero && d.image ? injectHero(d.content, d.image.alt, hero.url) : d.content;
    const doc: Record<string, unknown> = {
      title: d.title,
      question: d.question,
      content,
      summary: d.summary,
      tags: d.tags,
      language: d.language,
      authorId: EDITORIAL_ID,
      authorName: EDITORIAL_NAME,
      authorImage: '',
      aiModel: 'claude',
      conversation: [
        { id: 'q1', role: 'user', content: d.question, timestamp: now },
        { id: 'a1', role: 'assistant', content: d.summary, timestamp: now },
      ],
      views: 0,
      createdAt: now,
      updatedAt: now,
      source: SOURCE,
      keywords: buildSearchKeywords([d.title, d.question, d.tags.join(' '), d.summary]),
    };
    if (hero) {
      doc.imageUrl = hero.url;
      doc.imageWidth = hero.width;
      doc.imageHeight = hero.height;
    }
    if (d.sources?.length) doc.sources = d.sources;

    if (!APPLY) {
      console.log(`  ○ would create  ${d.language} "${d.title}"${hero ? ' +hero' : ''}`);
      stats.created++;
      continue;
    }

    const ref = db.collection('wikis').doc();
    await withRetry(`write "${d.title}"`, () => ref.set(doc));
    stats.created++;
    console.log(`  ✓ created       ${d.language} "${d.title}" → /wiki/${ref.id}`);

    if (isTypesenseEnabled()) {
      try {
        await upsertWikiToTypesense(
          toTypesenseDoc(ref.id, doc as Parameters<typeof toTypesenseDoc>[1])
        );
      } catch (err) {
        console.warn(`    ⚠ typesense upsert failed: ${(err as Error).message}`);
      }
    }
  }

  if (APPLY && stats.created > 0) {
    await withRetry('wikisCount update', () =>
      db
        .collection('users')
        .doc(EDITORIAL_ID)
        .update({ wikisCount: FieldValue.increment(stats.created) })
    );
  }

  console.log(
    `\n✓ Done. ${APPLY ? 'created' : 'would create'}=${stats.created} ` +
      `skipped-dup=${stats.skippedDup} skipped-no-image=${stats.skippedNoImage} ` +
      `images=${heroes.size}/${topics.size}`
  );
  process.exit(0);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
