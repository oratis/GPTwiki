import { unstable_cache } from 'next/cache';
import { getAllTags, getWikisByTag, getRecentWikis } from '@/lib/search';

/**
 * 60s-cached wrappers around the list-page Firestore reads (browse, tags,
 * wiki list). Those pages stay force-dynamic — a credential-less Docker build
 * must not prerender an empty "no wikis" state — but these caches stop a launch
 * spike from re-reading Firestore on every request. Same treatment as the home
 * page (see [locale]/page.tsx) and docs/flood-resistance.md.
 *
 * Each wrapper fails closed to [] so a transient Firestore error renders an
 * empty section instead of 500-ing the page.
 */

const TTL_SECONDS = 60;

/** All tags for a locale, 60s-cached. */
export function getCachedAllTags(locale: string) {
  return unstable_cache(
    () => getAllTags(locale).catch(() => []),
    ['all-tags', locale],
    { revalidate: TTL_SECONDS, tags: ['wikis'] }
  )();
}

/** Wikis for a tag, 60s-cached (keyed by tag + limit). */
export function getCachedWikisByTag(tag: string, limit: number) {
  return unstable_cache(
    () => getWikisByTag(tag, limit).catch(() => []),
    ['wikis-by-tag', tag, String(limit)],
    { revalidate: TTL_SECONDS, tags: ['wikis'] }
  )();
}

/** Most recent wikis (optionally locale-filtered), 60s-cached. */
export function getCachedRecentWikis(limit: number, locale?: string) {
  return unstable_cache(
    () => getRecentWikis(limit, locale).catch(() => []),
    ['recent-wikis', String(limit), locale ?? 'all'],
    { revalidate: TTL_SECONDS, tags: ['wikis'] }
  )();
}
