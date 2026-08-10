import type { Metadata } from 'next';
import { supportedLocales, type Locale } from '@/lib/i18n/server';

const BASE_URL = 'https://gptwiki.net';

/**
 * Metadata for an indexable /arena page: canonical plus one hreflang alternate
 * per locale, matching the pattern the rest of the site uses.
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
  for (const loc of supportedLocales) languages[loc] = `${BASE_URL}/${loc}${path}`;
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
