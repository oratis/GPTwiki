import type { Locale } from '@/lib/i18n/locales';

/**
 * Locales the arena section is actually authored in.
 *
 * The rest of the site is translated across all 15 locales, so its pages can
 * honestly claim a full hreflang cluster. The arena is not: its copy — and the
 * methodology prose in particular — is written by hand in English and Chinese
 * only, because machine-translating a page that makes statistical claims
 * produces text nobody on the project can review (the same reasoning
 * `docs/auto-content-cron-plan.md` §7 used to reject 15-locale auto-content).
 *
 * That decision has a consequence that has to be honoured elsewhere: an arena
 * URL under any other locale serves *identical English*. Declaring it as the
 * Japanese alternate of the English page would tell search engines that 13
 * duplicate pages are 13 translations — the duplicate-content dilution this
 * repo is already careful about. So both the page metadata and the sitemap
 * narrow their alternates to this list.
 *
 * Add a locale here only once its `arena.*` keys and rules prose are written.
 */
export const ARENA_LOCALES: readonly Locale[] = ['en', 'zh'] as const;

/** True when `locale` has authored arena copy rather than the English fallback. */
export function hasArenaCopy(locale: string): boolean {
  return (ARENA_LOCALES as readonly string[]).includes(locale);
}
