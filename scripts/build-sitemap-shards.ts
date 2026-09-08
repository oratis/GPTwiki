/**
 * Precompute sitemap pagination cursors for the FULL corpus and store them in
 * Firestore (`_meta/sitemap_shards`), so the sitemap index can enumerate every
 * doc (~19M) without an in-request scan (that scan is the thing that timed out).
 *
 * This is the OFFLINE half of the "full long-tail" sitemap. It walks all wiki
 * `__name__` ids (minutes, not a request), picks every BATCH_SIZE-th id as a
 * `startAfter` cursor, and writes the list. The sitemap index reads that doc
 * and emits one `<sitemap>?page=<cursor>` per checkpoint; the legacy
 * `?page=<docId>` sub-page (already in the route) serves each shard's 2000 docs.
 *
 * Run it on a schedule (see .github/workflows/sitemap-shards.yml). Reads
 * Firestore via ADC (WIF in CI) or FIREBASE_* in .env.local.
 *
 * WHY THE SCAN IS PAGED. This used to issue ONE unbounded `.stream()` over the
 * whole collection, and it could never have finished: the SDK stamps a single
 * `startTime` per `_stream()` call and gives up once
 * `total_timeout_millis` — 600s for runQuery — has elapsed
 * (@google-cloud/firestore query-util.js `_hasRetryTimedOut`, firestore_client_config.json).
 * Run 32463577209 died at 10.6 min having read 7.5M of 19M ids, surfacing the
 * server's own `EXECUTION_DEADLINE_EXCEEDED` as an unretryable failure. That
 * budget is client-side, so moving this to a Cloud Run Job would not have
 * helped. Bounded pages each get a fresh budget, which is the entire fix.
 *
 * VERIFIED, and the number that matters is the wall clock, not the id count.
 * A capped run against production on 2026-08-21 walked 300,000 ids in 640s
 * across 3 page boundaries and exited 0:
 *
 *   … 100,000 scanned,  50 shards, 1 pages, 196s (511/s)
 *   … 200,000 scanned, 100 shards, 2 pages, 418s (478/s)
 *   … 300,000 scanned, 150 shards, 3 pages, 640s (469/s)
 *
 * 640s is past the 600s `total_timeout_millis` that killed the single-stream
 * version, so this run is the regression test: the old code could not have
 * reached the end of it at any throughput. Reproduce with `--max=300000` from
 * anywhere slow enough to take ten minutes — a fast in-region runner finishes
 * 300k well inside the budget and therefore proves nothing.
 *
 * Throughput measured 2026-08-21: ~13,700 ids/s on a GitHub-hosted runner
 * (in-region) against ~470-510 ids/s over a home connection — roughly 28x, so
 * a full sweep is ~23 min in-region and ~11 h from a laptop. Run it somewhere
 * low-latency.
 *
 * Usage:
 *   npx tsx scripts/build-sitemap-shards.ts                 # dry-run (no write)
 *   npx tsx scripts/build-sitemap-shards.ts --apply         # write the meta doc
 *   npx tsx scripts/build-sitemap-shards.ts --max=100000    # cap the scan (testing)
 *
 * COST, because publishing this is not free and the bill recurs. One full scan
 * reads every document once (~19M reads ≈ $11 at $0.06/100k). Worse, the
 * artifact it publishes is itself a read amplifier: 9,485 sub-pages × 2,000
 * documents means a crawler working through the whole index costs another full
 * corpus of reads. `--max=` exists partly so this can be exercised without
 * paying for the full sweep.
 */
import { initializeApp, cert, applicationDefault, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import {
  MAX_CHECKPOINTS_PER_DOC,
  checkpointsInPage,
  trimTrailingCheckpoint,
  expectedCheckpointCount,
} from '../src/lib/sitemap-shards';

config({ path: '.env.local', override: true });

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const maxArg = args.find((a) => a.startsWith('--max='));
const MAX_SCAN = maxArg ? Number(maxArg.slice('--max='.length)) : Infinity;
if (maxArg && !(Number.isInteger(MAX_SCAN) && MAX_SCAN > 0)) {
  // NaN would read as "no cap" at every `Number.isFinite(MAX_SCAN)` test below,
  // including the one that refuses --apply alongside --max=. A typo, or a
  // separator that is only legal in a JS literal (Number('250_000') is NaN),
  // would then quietly run the full ~19M-read sweep and publish.
  console.error(
    `✗ --max= needs a positive integer in plain digits; got "${maxArg.slice('--max='.length)}". ` +
      'Refusing rather than falling through to an uncapped scan.'
  );
  process.exit(1);
}

const META_PATH = '_meta/sitemap_shards';

/**
 * Documents fetched per bounded query. I/O granularity only — unrelated to
 * SITEMAP_BATCH_SIZE, which is the sitemap's wire contract. Never merge them.
 *
 * Why 100k: each `.stream()` call gets its own 600s total-retry budget and each
 * gRPC attempt a 300s deadline, so a page has to finish comfortably inside
 * both. At the 13,700 ids/s measured on a runner a page takes ~7s; even a
 * twentyfold degradation lands well inside the per-attempt deadline. Larger
 * pages buy little (190 round trips over a ~24 min scan is under 3% overhead)
 * and cost the margin that makes this safe.
 */
const PAGE_SIZE = 100_000;

/** Attempts per page before the run gives up. A page holds no state, so a
 *  retry re-issues the same bounded query from the same cursor. */
const PAGE_RETRIES = 3;

/**
 * How short a scan may fall before the result is refused rather than published.
 *
 * The corpus legitimately moves under a 20-minute scan, so this is not an
 * equality check — but a scan that ends early for any other reason produces a
 * *plausible* checkpoint list that is simply too short, and publishing it
 * silently truncates the sitemap to the prefix that was reached. Since
 * `checkpoints.length` is the index's URL budget, that is a worse outcome than
 * writing nothing at all, and it would be invisible: the run exits 0 and the
 * index looks fine, just smaller.
 */
const MIN_SCAN_COMPLETENESS = 0.99;

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

/**
 * Fetch one bounded page of document ids in `__name__` order.
 *
 * `after` is a plain document id, or null for the first page — not a
 * FieldPath and not a `wikis/<id>` path. TypeScript will not catch a wrong
 * type here (`startAfter(...fieldValues: any[])`); the SDK throws at runtime,
 * mid-scan.
 *
 * Returns only page-local state, so a failed attempt can be retried from the
 * same cursor with nothing to unwind.
 */
async function scanPage(
  col: FirebaseFirestore.CollectionReference,
  after: string | null,
  limit: number
): Promise<string[]> {
  let q: FirebaseFirestore.Query = col.orderBy('__name__').select();
  if (after !== null) q = q.startAfter(after);
  const stream = q.limit(limit).stream();
  const ids: string[] = [];
  for await (const doc of stream as AsyncIterable<FirebaseFirestore.QueryDocumentSnapshot>) {
    ids.push(doc.id);
  }
  return ids;
}

async function scanPageWithRetry(
  col: FirebaseFirestore.CollectionReference,
  after: string | null,
  limit: number
): Promise<string[]> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await scanPage(col, after, limit);
    } catch (err) {
      if (attempt >= PAGE_RETRIES) throw err;
      const waitMs = 2000 * 2 ** attempt;
      console.warn(
        `  ! page after=${after ?? '<start>'} failed (attempt ${attempt + 1}/${PAGE_RETRIES + 1}): ` +
          `${(err as Error).message} — retrying in ${waitMs / 1000}s`
      );
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }
}

async function main(): Promise<void> {
  // --max= is a deliberately partial scan, so it skips the completeness gate
  // below; combining it with --apply would publish a checkpoint list covering
  // only the prefix that was scanned, which is precisely the truncation the
  // gate exists to prevent. Refuse rather than trust the operator's intent.
  if (APPLY && Number.isFinite(MAX_SCAN)) {
    console.error(
      '✗ --apply with --max= would publish a truncated sitemap (only the first ' +
        `${MAX_SCAN.toLocaleString()} docs would be enumerated). Drop one of them: ` +
        '--max= alone to exercise the scan, --apply alone to publish a full one.'
    );
    process.exit(1);
  }

  const db = getFirestore(initFirebase());
  const col = db.collection('wikis');
  console.log(`▸ scanning wiki ids${Number.isFinite(MAX_SCAN) ? ` (max ${MAX_SCAN})` : ''}${APPLY ? '' : ' (DRY RUN)'}`);

  // Cheap relative to the scan (one aggregation, not 19M reads) and the only
  // way to tell a complete scan from one that stopped early — see
  // MIN_SCAN_COMPLETENESS.
  const expectedTotal = (await col.count().get()).data().count;
  console.log(`▸ collection reports ${expectedTotal.toLocaleString()} docs`);

  const t0 = Date.now();
  const checkpoints: string[] = []; // startAfter ids; page "0" is the implicit first page
  let count = 0;
  let cursor: string | null = null;
  let pages = 0;

  for (;;) {
    const remaining = Number.isFinite(MAX_SCAN) ? MAX_SCAN - count : Infinity;
    if (remaining <= 0) break;
    const limit = Math.min(PAGE_SIZE, remaining);

    const ids = await scanPageWithRetry(col, cursor, limit);
    if (ids.length === 0) break;

    // Global position, never page-local: paging must not change which ids are
    // picked. scripts/test-sitemap-shards.ts pins that across page sizes.
    checkpoints.push(...checkpointsInPage(ids, count));
    count += ids.length;
    cursor = ids[ids.length - 1];
    pages++;

    const secs = (Date.now() - t0) / 1000;
    console.log(
      `  … ${count.toLocaleString()} scanned, ${checkpoints.length} shards, ` +
        `${pages} pages, ${Math.round(secs)}s (${Math.round(count / Math.max(secs, 0.001)).toLocaleString()}/s)`
    );

    // Deliberately NOT `if (ids.length < limit) break`. A short page does not
    // mean the collection ended: when the SDK resumes a broken stream it asks
    // for `limit - numDocumentsReceived` (query-util.js:232), and that counter
    // increments on every non-NOOP response — including the document-less
    // progress responses the wire protocol explicitly permits — so a resumed
    // page can come back short while there is more to read. Ending the scan
    // there would publish a truncated checkpoint list and exit 0. An empty page
    // is the only sound terminator; the cost is one extra round trip in ~190.
  }

  const trimmed = trimTrailingCheckpoint(checkpoints, count);
  const secs = Math.round((Date.now() - t0) / 1000);
  console.log(`▸ ${count.toLocaleString()} docs → ${trimmed.length} shards in ${secs}s (${pages} pages)`);

  if (trimmed.length > MAX_CHECKPOINTS_PER_DOC) {
    console.error(
      `✗ ${trimmed.length} checkpoints exceeds single-doc ceiling (${MAX_CHECKPOINTS_PER_DOC}). ` +
        'Implement multi-doc chunking — and note the route reads exactly one doc, so it needs changing too.'
    );
    process.exit(1);
  }

  // Refuse to publish a truncated list. Skipped under --max=, which is a
  // deliberately partial scan.
  if (!Number.isFinite(MAX_SCAN)) {
    const completeness = expectedTotal > 0 ? count / expectedTotal : 1;
    if (completeness < MIN_SCAN_COMPLETENESS) {
      console.error(
        `✗ scan covered ${count.toLocaleString()} of ${expectedTotal.toLocaleString()} docs ` +
          `(${(completeness * 100).toFixed(1)}%, floor ${(MIN_SCAN_COMPLETENESS * 100).toFixed(0)}%). ` +
          'Refusing to publish: a short list silently truncates the sitemap to the prefix it reached, ' +
          'and nothing downstream would notice. Not writing; the previous doc (if any) stands.'
      );
      process.exit(1);
    }
    // Internal invariant, NOT a second completeness check: both sides derive
    // from `count`, so correct code can never trip it. It catches the
    // incremental accumulation above drifting from the closed form in
    // sitemap-shards.ts — a code bug, not a short scan. (Checking against
    // `expectedTotal` instead would fire spuriously whenever the corpus grows
    // by a batch mid-scan, which it legitimately does.)
    const expectedShards = expectedCheckpointCount(count);
    if (trimmed.length !== expectedShards) {
      console.error(
        `✗ invariant violated: ${trimmed.length} checkpoints for ${count.toLocaleString()} docs, ` +
          `expected ${expectedShards}. The checkpoint arithmetic has drifted from the scan — refusing to publish.`
      );
      process.exit(1);
    }
  }

  if (!APPLY) {
    console.log(`(dry run) would write ${META_PATH} with ${trimmed.length} shards`);
    return;
  }

  await db.doc(META_PATH).set({ computedAt: Date.now(), total: count, checkpoints: trimmed });
  console.log(`✓ wrote ${META_PATH} (${trimmed.length} shards, total=${count})`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('FATAL:', err);
    process.exit(1);
  });
