/**
 * Tests for the long-tail sitemap's checkpoint arithmetic (src/lib/sitemap-shards.ts).
 *
 * The builder walks ~19M document ids and records every 2000th one as a cursor;
 * the sitemap route serves one sub-page per cursor with
 * `startAfter(cursor).limit(2000)`. Two things make this worth pinning offline:
 *
 *  - There is no Firestore emulator in this project, so the arithmetic is the
 *    only part that CAN be tested — and it is the part that carries the
 *    contract.
 *  - The scan is now paged (a single unbounded stream could never finish: the
 *    SDK gives up after a 600s total-retry budget per call). Paging must not
 *    change which ids come out. The obvious way to break that is a page-local
 *    modulus, which yields a plausible list that gaps every shard — no type
 *    error, no crash, just a sitemap quietly missing most of the corpus.
 *
 * `checkpoints.length` is not metadata: every sub-page is capped at 2000, so
 * the list length IS the sitemap's total URL budget. One missing checkpoint
 * costs 2,000 URLs their place in the index.
 *
 * Run with `npm test`.
 */
import assert from 'node:assert/strict';
import {
  MAX_CHECKPOINTS_PER_DOC,
  MAX_INDEX_SHARDS,
  SITEMAP_BATCH_SIZE,
  checkpointsInPage,
  expectedCheckpointCount,
  trimTrailingCheckpoint,
} from '../src/lib/sitemap-shards';

let failures = 0;
let run = 0;

function test(name: string, fn: () => void): void {
  run++;
  try {
    fn();
    console.log(`  ok  ${name}`);
  } catch (err) {
    failures++;
    console.error(`FAIL  ${name}`);
    console.error(`      ${(err as Error).message.split('\n').join('\n      ')}`);
  }
}

/** Synthetic ids that sort in generation order, like Firestore auto-ids do. */
const ids = (n: number): string[] =>
  Array.from({ length: n }, (_, i) => `id${String(i).padStart(9, '0')}`);

const B = SITEMAP_BATCH_SIZE;

console.log('\nsitemap shards: checkpoint selection');

test('the first cursor is the 2000th document, not the 1st or the 2001st', () => {
  const all = ids(6000);
  assert.deepEqual(checkpointsInPage(all, 0), [all[B - 1], all[2 * B - 1], all[3 * B - 1]]);
});

test('a page carries no checkpoint when it contains no multiple of the batch', () => {
  assert.deepEqual(checkpointsInPage(ids(100), 0), []);
  assert.deepEqual(checkpointsInPage(ids(1999), 0), []);
});

test('paging does not change the result, for any page size', () => {
  const all = ids(25_000);
  const oneShot = checkpointsInPage(all, 0);
  // 1 and 7 are the pathological small sizes; 1999/2001/3000 straddle the
  // batch boundary; 25_000 and 40_000 are whole-corpus and oversized.
  for (const pageSize of [1, 7, 999, 1999, 2000, 2001, 3000, 10_000, 25_000, 40_000]) {
    const paged: string[] = [];
    for (let off = 0; off < all.length; off += pageSize) {
      paged.push(...checkpointsInPage(all.slice(off, off + pageSize), off));
    }
    assert.deepEqual(paged, oneShot, `page size ${pageSize}`);
  }
});

test('a checkpoint landing exactly on a page boundary is counted once', () => {
  const all = ids(4000);
  assert.deepEqual(checkpointsInPage(all.slice(B - 1, B + 1), B - 1), [all[B - 1]]);
  assert.deepEqual(checkpointsInPage(all.slice(B, 2 * B), B), [all[2 * B - 1]]);
});

test('an empty page contributes nothing at any offset', () => {
  assert.deepEqual(checkpointsInPage([], 0), []);
  assert.deepEqual(checkpointsInPage([], 4000), []);
});

console.log('\nsitemap shards: the trailing checkpoint');

test('a total that is an exact multiple of the batch drops its last cursor', () => {
  // Otherwise startAfter(<final doc>) serves an empty <urlset>.
  const cps = checkpointsInPage(ids(4000), 0);
  assert.equal(cps.length, 2);
  assert.deepEqual(trimTrailingCheckpoint(cps, 4000).length, 1);
});

test('a total that is not a multiple keeps every cursor', () => {
  for (const total of [3999, 4001, 18_968_589]) {
    const cps = ['a', 'b', 'c'];
    assert.deepEqual(trimTrailingCheckpoint(cps, total), cps, String(total));
  }
});

test('trimming an empty list is a no-op rather than a crash', () => {
  assert.deepEqual(trimTrailingCheckpoint([], 4000), []);
  assert.deepEqual(trimTrailingCheckpoint([], 0), []);
});

test('trimming does not mutate its input', () => {
  const cps = ['a', 'b'];
  trimTrailingCheckpoint(cps, 4000);
  assert.deepEqual(cps, ['a', 'b']);
});

console.log('\nsitemap shards: capacity');

test('checkpoint count matches ceil(total / batch) - 1 across the boundaries', () => {
  for (const n of [0, 1, 1999, 2000, 2001, 3999, 4000, 4001, 100_000, 100_001]) {
    const cps = trimTrailingCheckpoint(checkpointsInPage(ids(n), 0), n);
    assert.equal(cps.length, expectedCheckpointCount(n), `total ${n}`);
  }
});

test('the live corpus produces the expected number of shards', () => {
  // Measured 2026-08-21: count() over `wikis` = 18,968,589.
  assert.equal(expectedCheckpointCount(18_968_589), 9484);
  // +1 for the implicit page=0 the route emits unconditionally.
  assert.equal(9484 + 1, 9485);
});

test('a corpus of one batch or less needs no cursors at all', () => {
  assert.equal(expectedCheckpointCount(0), 0);
  assert.equal(expectedCheckpointCount(1), 0);
  assert.equal(expectedCheckpointCount(B), 0); // page=0 covers exactly these
});

console.log('\nsitemap shards: ceilings');

test('the index clamp stays under the sitemaps.org 50,000-entry limit', () => {
  // The index also emits static + editorial + 60 recent + page=0.
  assert.ok(MAX_INDEX_SHARDS + 63 <= 50_000, `${MAX_INDEX_SHARDS} + 63 must fit in 50,000`);
});

test("the builder's per-document ceiling stays under Firestore's 40,000 index entries", () => {
  // `checkpoints` is an unexempted array field: ~1 index entry per element.
  assert.ok(MAX_CHECKPOINTS_PER_DOC < 40_000);
  // …and is not so low that today's corpus trips it.
  assert.ok(MAX_CHECKPOINTS_PER_DOC > expectedCheckpointCount(18_968_589));
});

test('the wire contract is 2000 on both sides', () => {
  // The route does limit(SITEMAP_BATCH_SIZE); changing this alone gaps or
  // double-serves every shard. Both sides now import this constant.
  assert.equal(SITEMAP_BATCH_SIZE, 2000);
});

console.log(`\n${run - failures}/${run} passed`);
if (failures) process.exit(1);
