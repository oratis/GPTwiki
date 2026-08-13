import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/server';
import { ARENA_LOCALES } from './locales';

const BASE_URL = 'https://gptwiki.net';

/**
 * Metadata for an indexable /arena page: canonical plus one hreflang alternate
 * per *authored* locale.
 *
 * Not per supported locale, unlike the rest of the site. Arena copy exists in
 * English and Chinese only (see `./locales`), so the other 13 URLs serve
 * identical English — claiming them as translations would present 13 duplicate
 * pages to search engines as a 15-way hreflang cluster. The page already tells
 * the reader it is untranslated; the head must not tell crawlers otherwise.
 *
 * Battle permalinks deliberately do NOT go through here — they are noindex and
 * excluded from every sitemap shard, because a page holding two AI answers to
 * one prompt is thin, near-duplicate, and mass-producible, which is exactly the
 * shape `docs/auto-content-cron-plan.md` §7 blocked over. Anything that reaches
 * the index has to come through the normal wiki publish path.
 */
export function arenaMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  /** Path under the locale prefix, e.g. `/arena/rules`. */
  path: string;
  title: string;
  description: string;
}): Metadata {
  const canonical = `${BASE_URL}/${locale}${path}`;
  const languages: Record<string, string> = {};
  for (const loc of ARENA_LOCALES) languages[loc] = `${BASE_URL}/${loc}${path}`;
  languages['x-default'] = `${BASE_URL}/en${path}`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonical,
      siteName: 'GPTwiki',
      locale,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
