/**
 * Precompute sitemap pagination cursors for the FULL corpus and store them in
 * Firestore (`_meta/sitemap_shards`), so the sitemap index can enumerate every
 * doc (~19M) without an in-request scan (that scan is the thing that timed out).
 *
 * This is the OFFLINE half of the "full long-tail" sitemap. It streams all wiki
 * `__name__` ids once (minutes, not a request), picks every BATCH_SIZE-th id as
 * a `startAfter` cursor, and writes the list. The sitemap index reads that doc
 * and emits one `<sitemap>?page=<cursor>` per checkpoint; the legacy
 * `?page=<docId>` sub-page (already in the route) serves each shard's 2000 docs.
 *
 * Run it on a schedule (see .github/workflows/sitemap-shards.yml). Reads
 * Firestore via ADC (WIF in CI) or FIREBASE_* in .env.local.
 *
 * NOTE: streaming ~19M refs is slow off-region (measured ~875/s from a laptop →
 * hours). Run it from a low-latency environment (GitHub-hosted runner, or a
 * Cloud Run Job in the Firestore region) — not a home connection.
 *
 * Usage:
 *   npx tsx scripts/build-sitemap-shards.ts                 # dry-run (no write)
 *   npx tsx scripts/build-sitemap-shards.ts --apply         # write the meta doc
 *   npx tsx scripts/build-sitemap-shards.ts --max=100000    # cap the scan (testing)
 */
import { initializeApp, cert, applicationDefault, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';

config({ path: '.env.local', override: true });

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const maxArg = args.find((a) => a.startsWith('--max='));
const MAX_SCAN = maxArg ? Number(maxArg.slice('--max='.length)) : Infinity;

const BATCH_SIZE = 2000;
// A Firestore doc is capped at ~1 MiB; ~20-char ids → ~40k checkpoints (80M
// docs) is the safe ceiling for a single doc. Chunk into multiple docs beyond.
const MAX_CHECKPOINTS_PER_DOC = 40000;
const META_PATH = '_meta/sitemap_shards';

function initFirebase() {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'gptwiki';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (clientEmail && privateKey) {
    const sa: ServiceAccount = { projectId, clientEmail, privateKey };
    return initializeApp({ credential: cert(sa), projectId });
  }
  console.log('▸ no FIREBASE_CLIENT_EMAIL/PRIVATE_KEY — using ADC');
  return initializeApp({ credential: applicationDefault(), projectId });
}

async function main(): Promise<void> {
  const db = getFirestore(initFirebase());
  console.log(`▸ scanning wiki ids${Number.isFinite(MAX_SCAN) ? ` (max ${MAX_SCAN})` : ''}${APPLY ? '' : ' (DRY RUN)'}`);

  const t0 = Date.now();
  const checkpoints: string[] = []; // startAfter ids; page "0" is the implicit first page
  const stream = db.collection('wikis').orderBy('__name__').select().stream();
  let count = 0;
  for await (const doc of stream as AsyncIterable<FirebaseFirestore.QueryDocumentSnapshot>) {
    count++;
    if (count % BATCH_SIZE === 0) checkpoints.push(doc.id);
    if (count % 500000 === 0) console.log(`  … ${count.toLocaleString()} scanned, ${checkpoints.length} shards, ${Math.round((Date.now() - t0) / 1000)}s`);
    if (count >= MAX_SCAN) break;
  }
  // Drop a trailing checkpoint that would page past the end.
  if (count % BATCH_SIZE === 0 && checkpoints.length) checkpoints.pop();

  console.log(`▸ ${count.toLocaleString()} docs → ${checkpoints.length} shards in ${Math.round((Date.now() - t0) / 1000)}s`);

  if (checkpoints.length > MAX_CHECKPOINTS_PER_DOC) {
    console.error(`✗ ${checkpoints.length} checkpoints exceeds single-doc ceiling (${MAX_CHECKPOINTS_PER_DOC}). Implement multi-doc chunking before enabling.`);
    process.exit(1);
  }

  if (!APPLY) {
    console.log(`(dry run) would write ${META_PATH} with ${checkpoints.length} shards`);
    return;
  }

  await db.doc(META_PATH).set({ computedAt: Date.now(), total: count, checkpoints });
  console.log(`✓ wrote ${META_PATH} (${checkpoints.length} shards, total=${count})`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('FATAL:', err);
    process.exit(1);
  });
