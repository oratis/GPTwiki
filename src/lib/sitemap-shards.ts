/**
 * Checkpoint arithmetic for the long-tail sitemap, shared by the builder and
 * the route so the two cannot drift apart.
 *
 * The sitemap index enumerates ~19M wiki documents by handing out cursors: the
 * builder walks the collection in `__name__` order and records every
 * SITEMAP_BATCH_SIZE-th document id, and the route serves one sub-page per
 * cursor with `startAfter(cursor).limit(SITEMAP_BATCH_SIZE)`. Those two numbers
 * are a wire contract — they were previously two independent literals in two
 * files, where changing one would have silently gapped or double-served every
 * shard.
 *
 * The functions here are pure so the arithmetic can be tested without
 * Firestore: there is no emulator in this project, and importing the builder
 * from a test would start a 19M-document scan.
 */

/**
 * Documents per sitemap sub-page.
 *
 * WIRE CONTRACT: the route does `limit(SITEMAP_BATCH_SIZE)` and the builder
 * places one cursor every SITEMAP_BATCH_SIZE documents. Both sides must use
 * this constant, forever.
 */
export const SITEMAP_BATCH_SIZE = 2000;

/**
 * Most checkpoints the index will emit, whatever the builder wrote.
 *
 * sitemaps.org caps a sitemap index at 50,000 entries, and this index also
 * emits a fixed prefix (static + editorial + 60 `recent-*` buckets + the
 * implicit `page=0`). Exceeding the cap does not degrade gracefully — the whole
 * index is rejected, taking the editorial and recent sitemaps down with the
 * long tail — so the route clamps rather than trusting its input.
 */
export const MAX_INDEX_SHARDS = 49_000;

/**
 * Most checkpoints the builder will store in the single meta document.
 *
 * The binding limit is not the 1 MiB document size (30,000 ids ≈ 630 KB) but
 * Firestore's 40,000-index-entries-per-document cap: `checkpoints` is an array
 * field with no exemption, so it costs roughly one index entry per element.
 * At today's 9,484 checkpoints there is ample room either way; this ceiling is
 * what stops a future corpus from silently producing a write Firestore rejects.
 */
export const MAX_CHECKPOINTS_PER_DOC = 30_000;

/**
 * The checkpoint ids inside one page of scanned ids.
 *
 * `countBefore` is how many documents preceded this page in the global scan.
 * Paging the scan must not change which ids come out, so the modulus is taken
 * on the global position — a page-local modulus is the obvious way to break
 * this, and it produces a plausible-looking list that gaps every shard.
 */
export function checkpointsInPage(ids: readonly string[], countBefore: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < ids.length; i++) {
    if ((countBefore + i + 1) % SITEMAP_BATCH_SIZE === 0) out.push(ids[i]);
  }
  return out;
}

/**
 * Drop a trailing checkpoint that would page past the end of the collection.
 *
 * When the total is an exact multiple of SITEMAP_BATCH_SIZE, the last
 * checkpoint lands on the final document, and `startAfter(<final document>)`
 * serves an empty `<urlset>`. Computed on the global total after the whole
 * scan, never per page.
 */
export function trimTrailingCheckpoint(cps: readonly string[], total: number): string[] {
  return total % SITEMAP_BATCH_SIZE === 0 && cps.length ? cps.slice(0, -1) : [...cps];
}

/**
 * How many checkpoints a complete scan of `total` documents should produce.
 *
 * `checkpoints.length` is not metadata about the corpus — it *is* the sitemap's
 * URL budget, because every sub-page is capped at SITEMAP_BATCH_SIZE. A list
 * short by one costs 2,000 URLs their place in the index.
 */
export function expectedCheckpointCount(total: number): number {
  return Math.max(0, Math.ceil(total / SITEMAP_BATCH_SIZE) - 1);
}
