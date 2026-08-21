/**
 * Process-local TTL memo for whole-site query results.
 *
 * Per-Cloud Run instance only, like rate-limit.ts — not shared across
 * instances. Good enough here: the values it holds (popular wikis, the tag
 * cloud) are identical for every visitor, so each instance converges on the
 * same answer and the worst case is one Firestore query per instance per
 * TTL instead of one per request.
 *
 * Why not the framework's caching:
 *  - Route-level `export const revalidate` is out. The routes reading these
 *    values (/api/search, /api/tags) rate-limit on the caller's IP, so they
 *    have to stay dynamic; static-rendering them would hand every caller
 *    one shared response and disable the limiter.
 *  - `unstable_cache` is marked replaced by `use cache` as of Next 16
 *    (node_modules/next/dist/docs/.../unstable_cache.md), and `use cache`
 *    needs `cacheComponents: true` — an app-wide change to the rendering
 *    model, which is not something a cost fix should drag in.
 *  - Either way the entries would live in Next's data cache, which under
 *    `output: "standalone"` on Cloud Run is a file cache inside the
 *    container: the same per-instance lifetime as this Map, but paying
 *    serialize/deserialize on every hit for values that carry whole article
 *    bodies and conversation transcripts.
 *  - Caching the in-flight promise (below) collapses a burst of concurrent
 *    misses into a single query. That matters most on a cold instance,
 *    which is exactly when a crawler burst used to fan out into one full
 *    scan per request.
 */

interface Entry {
  // The in-flight or settled load. Storing the promise (not the resolved
  // value) is what makes concurrent misses share one query.
  value: Promise<unknown>;
  expiresAt: number;
}

const entries = new Map<string, Entry>();

// Keys are derived from code constants and validated locales, so the map
// stays tiny; sweep expired entries anyway so a future caller with a wider
// key space can't grow it without bound.
const SWEEP_THRESHOLD = 64;

function sweep(now: number) {
  if (entries.size < SWEEP_THRESHOLD) return;
  for (const [k, v] of entries.entries()) {
    if (v.expiresAt <= now) entries.delete(k);
  }
}

/**
 * Return the memoized result for `key`, or run `load()` and memoize it for
 * `ttlMs`. Rejections are evicted immediately so a transient Firestore
 * error isn't pinned for the whole window.
 *
 * Every caller within a window shares one resolved value — treat it as
 * read-only.
 */
export function cachedForTTL<T>(
  key: string,
  ttlMs: number,
  load: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const hit = entries.get(key);
  if (hit && hit.expiresAt > now) return hit.value as Promise<T>;

  sweep(now);
  const value = load().catch((err) => {
    entries.delete(key);
    throw err;
  });
  entries.set(key, { value, expiresAt: now + ttlMs });
  return value;
}
