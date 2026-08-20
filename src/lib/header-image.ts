/**
 * The `hasHeaderImage` derivation, shared by the search runtime
 * (src/lib/search.ts), every path that writes a wiki doc, and the one-shot
 * backfill (scripts/backfill-header-image-flag.ts). No Firestore imports
 * here so scripts can use it without initializing firebase-admin.
 *
 * The flag exists because Firestore can't rank `views desc` while filtering
 * on "has an image": `imageUrl` is absent (not null) on image-less docs, so
 * an inequality filter matches nothing and can't be combined with the sort
 * anyway. Denormalising the predicate into a boolean turns the popular-wiki
 * query into a plain equality + orderBy that an index can answer in `limit`
 * reads. Every writer must keep it in sync with `imageUrl`.
 */

/** A wiki "has a header image" when imageUrl is a non-empty string. */
export function hasHeaderImage(data: { imageUrl?: unknown }): boolean {
  return typeof data.imageUrl === 'string' && data.imageUrl.trim().length > 0;
}
