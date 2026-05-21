/**
 * One-shot migration: walk the `wikis` collection and rewrite any
 * `upload.wikimedia.org` (or other non-GCS) image URLs to GCS-hosted
 * mirrors. On permanent upstream failure (404), null the field and strip
 * the broken `![alt](url)` from the markdown content so the UI no longer
 * renders a dead image frame.
 *
 * Usage:
 *   npx tsx scripts/backfill-images.ts                    # full run
 *   npx tsx scripts/backfill-images.ts --dry-run          # log only
 *   npx tsx scripts/backfill-images.ts --limit=500        # cap scanned docs
 *   npx tsx scripts/backfill-images.ts --start-after=ID   # resume from doc id
 *   npx tsx scripts/backfill-images.ts --concurrency=8    # parallel mirrors
 *
 * Idempotent: docs already on GCS are skipped; failed re-mirrors null
 * the field so subsequent runs don't keep retrying the same dead URL.
 */

import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import { mirrorImageToGCS, isGcsUrl } from '../src/lib/gcs';

config({ path: '.env.local', override: true });

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
function flagValue(name: string): string | undefined {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.slice(name.length + 3) : undefined;
}
const LIMIT = Number(flagValue('limit') ?? 0);
const START_AFTER = flagValue('start-after');
const CONCURRENCY = Number(flagValue('concurrency') ?? 12);
const PAGE = Number(flagValue('page') ?? 200);

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};
const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

interface WikiDoc {
  imageUrl?: string | null;
  originalImageUrl?: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
  content?: string;
}

type Action = 'skip' | 'updated' | 'cleared' | 'failed';

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripMarkdownImage(content: string, url: string): string {
  // Match `![any alt](url)` followed by optional trailing newlines.
  const re = new RegExp(`!\\[[^\\]]*\\]\\(${escapeRegex(url)}\\)\\n*`, 'g');
  return content.replace(re, '');
}

async function processDoc(
  docId: string,
  data: WikiDoc,
): Promise<{ action: Action; clearedUrls: string[] }> {
  const updates: Record<string, unknown> = {};
  let content = data.content ?? '';
  const cleared: string[] = [];
  let touched = false;
  let mirrorSucceeded = false;

  if (data.imageUrl && !isGcsUrl(data.imageUrl)) {
    touched = true;
    const mirrored = await mirrorImageToGCS(data.imageUrl, { prefix: 'wikipedia/thumb' });
    if (mirrored) {
      content = content.split(data.imageUrl).join(mirrored);
      updates.imageUrl = mirrored;
      mirrorSucceeded = true;
    } else {
      content = stripMarkdownImage(content, data.imageUrl);
      updates.imageUrl = FieldValue.delete();
      updates.imageWidth = FieldValue.delete();
      updates.imageHeight = FieldValue.delete();
      cleared.push(data.imageUrl);
    }
  }

  if (data.originalImageUrl && !isGcsUrl(data.originalImageUrl)) {
    touched = true;
    const mirrored = await mirrorImageToGCS(data.originalImageUrl, { prefix: 'wikipedia/orig' });
    if (mirrored) {
      content = content.split(data.originalImageUrl).join(mirrored);
      updates.originalImageUrl = mirrored;
      mirrorSucceeded = true;
    } else {
      content = stripMarkdownImage(content, data.originalImageUrl);
      updates.originalImageUrl = FieldValue.delete();
      cleared.push(data.originalImageUrl);
    }
  }

  if (!touched) return { action: 'skip', clearedUrls: [] };

  if (content !== (data.content ?? '')) updates.content = content;
  updates.updatedAt = Date.now();

  if (!DRY_RUN) {
    await db.collection('wikis').doc(docId).update(updates);
  }

  const action: Action = mirrorSucceeded ? 'updated' : 'cleared';
  return { action, clearedUrls: cleared };
}

function docNeedsWork(data: WikiDoc): boolean {
  if (data.imageUrl && !isGcsUrl(data.imageUrl)) return true;
  if (data.originalImageUrl && !isGcsUrl(data.originalImageUrl)) return true;
  return false;
}

async function main(): Promise<void> {
  console.log(`▸ Backfill image URLs to GCS${DRY_RUN ? ' (DRY RUN)' : ''}`);
  console.log(
    `▸ page=${PAGE} concurrency=${CONCURRENCY}` +
      (LIMIT ? ` limit=${LIMIT}` : '') +
      (START_AFTER ? ` start-after=${START_AFTER}` : ''),
  );

  const stats: { scanned: number } & Record<Action, number> = {
    scanned: 0,
    updated: 0,
    cleared: 0,
    skip: 0,
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
          if (!docNeedsWork(data)) return { action: 'skip' as Action, clearedUrls: [] };
          try {
            return await processDoc(doc.id, data);
          } catch (err) {
            console.error(`[${doc.id}] error:`, (err as Error).message);
            return { action: 'failed' as Action, clearedUrls: [] };
          }
        }),
      );
      for (const r of results) {
        stats.scanned++;
        stats[r.action]++;
        for (const u of r.clearedUrls) {
          console.log(`  CLEARED ${u}`);
        }
      }
      if (LIMIT && stats.scanned >= LIMIT) {
        done = true;
        break;
      }
    }

    lastId = snap.docs[snap.docs.length - 1].id;
    console.log(
      `  page done: scanned=${stats.scanned} updated=${stats.updated} cleared=${stats.cleared} skipped=${stats.skip} failed=${stats.failed} lastId=${lastId}`,
    );

    if (snap.size < PAGE) break;
  }

  console.log(`\n✓ Done. Final:`, stats);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
