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
} from '@/lib/i18n/server';
import { localeHref } from '@/lib/i18n/links';

// See note in [locale]/page.tsx — Docker build has no Firestore creds.
export const dynamic = 'force-dynamic';

type RouteParams = { locale: string };
type RouteSearch = { tag?: string };

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

  const tags = await getAllTags(locale).catch(() => []);
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
          <aside className="min-w-0 md:w-52 lg:w-56 md:shrink-0">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {t('browse.allCategories')}
            </h2>

            <nav aria-label={t('browse.allCategories')} className="flex gap-2 overflow-x-auto pb-2 md:max-h-[70vh] md:flex-col md:overflow-y-auto md:pe-2">
              {tags.map((tg) => {
                const active = selectedTag === tg.name;
                return (
                  <Link
                    key={tg.name}
                    href={localeHref(locale, `/browse?tag=${encodeURIComponent(tg.name)}`)}
                    aria-current={active ? 'page' : undefined}
                    title={tg.name}
                    className={`flex min-w-0 shrink-0 items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                      active
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="truncate">{tg.name}</span>
                    <span
                      className={`shrink-0 rounded-md px-2 py-0.5 text-xs tabular-nums ${
                        active ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {tg.count}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
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
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
