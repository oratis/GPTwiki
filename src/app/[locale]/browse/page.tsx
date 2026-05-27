import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Folder, Tag } from 'lucide-react';
import WikiCard from '@/components/wiki/WikiCard';
import { getAllTags, getWikisByTag } from '@/lib/search';
import {
  hasLocale,
  supportedLocales,
  getTranslations,
  type Locale,
} from '@/lib/i18n/server';
import { localeHref } from '@/lib/i18n/links';

export const revalidate = 600;

type RouteParams = { locale: string };
type RouteSearch = { tag?: string };

export function generateStaticParams(): Array<{ locale: Locale }> {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<RouteSearch>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { tag } = await searchParams;
  if (!hasLocale(locale)) return {};
  const t = getTranslations(locale);

  const title = tag ? `${tag} · ${t('browse.title')}` : t('browse.title');
  const description = tag
    ? `${t('browse.title')} — ${tag}`
    : t('browse.title');

  // Per-tag URLs are mirrored at /tags/[tag] (the canonical version).
  // Point ?tag=… variants at that canonical to avoid duplicate-content
  // splits.
  const canonical = tag
    ? `https://gptwiki.net/${locale}/tags/${encodeURIComponent(tag)}`
    : `https://gptwiki.net/${locale}/browse`;

  const languages: Record<string, string> = {};
  for (const loc of supportedLocales) {
    languages[loc] = tag
      ? `https://gptwiki.net/${loc}/tags/${encodeURIComponent(tag)}`
      : `https://gptwiki.net/${loc}/browse`;
  }
  languages['x-default'] = tag
    ? `https://gptwiki.net/en/tags/${encodeURIComponent(tag)}`
    : 'https://gptwiki.net/en/browse';

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: { type: 'website', title, description, url: canonical, siteName: 'GPTwiki', locale },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function BrowsePage({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<RouteSearch>;
}) {
  const { locale } = await params;
  const { tag: rawTag } = await searchParams;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);

  const tags = await getAllTags().catch(() => []);
  // Default to the most popular tag so the page never renders empty for crawlers.
  const selectedTag = rawTag?.trim() || tags[0]?.name;

  const wikis = selectedTag
    ? await getWikisByTag(selectedTag, 30).catch(() => [])
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Folder className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            {t('browse.title')}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 flex-shrink-0">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {t('browse.allCategories')}
            </h2>

            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {tags.map((tg) => {
                const active = selectedTag === tg.name;
                return (
                  <Link
                    key={tg.name}
                    href={localeHref(locale, `/browse?tag=${encodeURIComponent(tg.name)}`)}
                    className={`flex items-center justify-between gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                      active
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span>{tg.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        active ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {tg.count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex-1">
            {!selectedTag ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Folder className="w-12 h-12 mb-4" />
                <p className="text-lg">{t('browse.selectCategory')}</p>
              </div>
            ) : wikis.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <p className="text-lg">{t('browse.noWikis')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wikis.map((wiki) => (
                  <WikiCard key={wiki.id} wiki={wiki} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
