import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import WikiCard from '@/components/wiki/WikiCard';
import HomeSearchIsland from '@/components/wiki/HomeSearchIsland';
import { searchWikis, getRecentWikis } from '@/lib/search';
import {
  hasLocale,
  supportedLocales,
  getTranslations,
} from '@/lib/i18n/server';

// See note in [locale]/page.tsx — Docker build has no Firestore creds,
// so build-time pre-render would cache an empty "noWikis" state.
export const dynamic = 'force-dynamic';

type RouteParams = { locale: string };
type RouteSearch = { q?: string };

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<RouteSearch>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { q } = await searchParams;
  if (!hasLocale(locale)) return {};
  const t = getTranslations(locale);

  const isSearch = !!q?.trim();
  const title = isSearch
    ? `${t('home.searchResults')}: ${q}`
    : t('wiki.browseTitle');
  const description = isSearch
    ? `${t('home.searchResults')}: ${q} · GPTwiki`
    : t('wiki.browseTitle');
  // Canonical for the search results page is the unfiltered list — search
  // result variants shouldn't compete with the canonical browse URL.
  const canonical = `https://gptwiki.net/${locale}/wiki`;

  const languages: Record<string, string> = {};
  for (const loc of supportedLocales) languages[loc] = `https://gptwiki.net/${loc}/wiki`;
  languages['x-default'] = 'https://gptwiki.net/en/wiki';

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: isSearch ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { type: 'website', title, description, url: canonical, siteName: 'GPTwiki', locale },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function WikiListPage({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<RouteSearch>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);

  const query = q?.trim() ?? '';
  const wikis = query
    ? await searchWikis(query, 30).catch(() => [])
    : await getRecentWikis(30).catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <BookOpen className="h-7 w-7 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">
          {query ? `${t('home.searchResults')} (${wikis.length})` : t('wiki.browseTitle')}
        </h1>
      </div>

      <div className="mb-8 max-w-2xl">
        <HomeSearchIsland locale={locale} placeholder={t('wiki.searchPlaceholder')} />
      </div>

      {wikis.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wikis.map((wiki) => (
            <WikiCard key={wiki.id} wiki={wiki} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500">
          {query ? t('home.noResults') : t('wiki.noWikis')}
        </div>
      )}
    </div>
  );
}
