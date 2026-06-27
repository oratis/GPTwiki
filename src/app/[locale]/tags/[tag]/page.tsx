import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Tag } from 'lucide-react';
import WikiCard from '@/components/wiki/WikiCard';
import { getCachedWikisByTag } from '@/lib/cached-reads';
import {
  hasLocale,
  supportedLocales,
  getTranslations,
} from '@/lib/i18n/server';
import { localeHref } from '@/lib/i18n/links';

// Dynamic at request time — build env can't reach Firestore, so we can't
// pre-render content here. Cloud Run runtime has credentials.
export const dynamic = 'force-dynamic';

type RouteParams = { locale: string; tag: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, tag: rawTag } = await params;
  if (!hasLocale(locale)) return { title: { absolute: 'GPTwiki' } };
  const tag = decodeURIComponent(rawTag);
  const t = getTranslations(locale);

  const title = `${tag} — ${t('browse.title')}`;
  const description = `${t('browse.title')} · ${tag} · GPTwiki`;
  const canonical = `https://gptwiki.net/${locale}/tags/${encodeURIComponent(tag)}`;

  const languages: Record<string, string> = {};
  for (const loc of supportedLocales) {
    languages[loc] = `https://gptwiki.net/${loc}/tags/${encodeURIComponent(tag)}`;
  }
  languages['x-default'] = `https://gptwiki.net/en/tags/${encodeURIComponent(tag)}`;

  return {
    title,
    description,
    keywords: [tag],
    alternates: { canonical, languages },
    openGraph: { type: 'website', title, description, url: canonical, siteName: 'GPTwiki', locale },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, tag: rawTag } = await params;
  if (!hasLocale(locale)) notFound();
  const tag = decodeURIComponent(rawTag);
  const t = getTranslations(locale);

  const wikis = await getCachedWikisByTag(tag, 30);
  if (wikis.length === 0) notFound();

  // CollectionPage + ItemList schema — gives Google a structured view of
  // the tag landing page so the wiki links inside are easier to crawl/rank.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tag} — ${t('browse.title')}`,
    url: `https://gptwiki.net/${locale}/tags/${encodeURIComponent(tag)}`,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'GPTwiki',
      url: 'https://gptwiki.net',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: wikis.length,
      itemListElement: wikis.map((w, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://gptwiki.net/${locale}/wiki/${w.id}`,
        name: w.title,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href={localeHref(locale, '/browse')}
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('browse.title')}
      </Link>

      <div className="mb-8 flex items-center gap-3">
        <Tag className="h-7 w-7 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">{tag}</h1>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          {wikis.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wikis.map((wiki) => (
          <WikiCard key={wiki.id} wiki={wiki} />
        ))}
      </div>
    </div>
  );
}
