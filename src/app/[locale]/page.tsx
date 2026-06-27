import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { MessageSquarePlus, TrendingUp, Clock } from 'lucide-react';
import WikiCard from '@/components/wiki/WikiCard';
import HomeSearchIsland from '@/components/wiki/HomeSearchIsland';
import RecentWikisSection from '@/components/wiki/RecentWikisSection';
import { getPopularWikis, getRecentWikis } from '@/lib/search';
import {
  hasLocale,
  supportedLocales,
  getTranslations,
} from '@/lib/i18n/server';
import { localeHref } from '@/lib/i18n/links';

// Render on demand at request time (where Firebase credentials exist). We
// deliberately skip generateStaticParams / static prerender here — the Docker
// build environment has no Firestore credentials, so a build-time pre-render
// would lock in an empty "No wikis yet" HTML after every deploy. The Firestore
// reads themselves are cached for 60s (see getCachedHomeData) so this staying
// dynamic doesn't mean re-reading the database on every request.
export const dynamic = 'force-dynamic';

type RouteParams = { locale: string };

/**
 * The home page is the #1 landing target for a launch spike (HN front page ≈
 * 50 UV/min). It stays force-dynamic (so a credential-less Docker build can't
 * bake in an empty "no wikis" state), but its Firestore reads are cached for
 * 60s per locale via unstable_cache — so a traffic flood is served from the
 * data cache instead of hammering Firestore on every request. This caps origin
 * cost without changing the rendered HTML's freshness much (60s lag on the
 * popular/recent lists is fine).
 */
function getCachedHomeData(locale: string) {
  return unstable_cache(
    async () => {
      // Failures fall back to empty arrays — the page renders without that
      // section rather than 500-ing on a transient Firestore error.
      const [popular, recent] = await Promise.all([
        getPopularWikis(9, locale).catch(() => []),
        getRecentWikis(12, locale).catch(() => []),
      ]);
      return { popular, recent };
    },
    ['home-data', locale], // locale in the key → one cache entry per locale
    { revalidate: 60, tags: ['wikis'] }
  )();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = getTranslations(locale);
  const title = `${t('home.title')} — ${t('home.subtitle')}`;
  const description = t('home.subtitle');
  const canonical = `https://gptwiki.net/${locale}`;

  const languages: Record<string, string> = {};
  for (const loc of supportedLocales) languages[loc] = `https://gptwiki.net/${loc}`;
  languages['x-default'] = 'https://gptwiki.net/en';

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

export default async function HomePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);

  // Locale-filtered, 60s-cached on the server so crawlers see populated HTML
  // and a launch spike doesn't re-read Firestore on every request.
  const { popular, recent } = await getCachedHomeData(locale);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            {t('home.title')}
          </h1>
          <p className="mb-8 text-lg text-blue-100 sm:text-xl">
            {t('home.subtitle')}
          </p>
          <div className="mx-auto mb-8 max-w-2xl">
            <HomeSearchIsland locale={locale} placeholder={t('home.searchPlaceholder')} />
          </div>
          <Link
            href={localeHref(locale, '/chat')}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg hover:bg-blue-50 transition-colors"
          >
            <MessageSquarePlus className="h-5 w-5" />
            {t('home.startConversation')}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Popular wikis — SSR'd so the link graph is crawlable */}
        <section>
          <div className="mb-8 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">{t('home.popularWikis')}</h2>
          </div>

          {popular.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((wiki) => (
                <WikiCard key={wiki.id} wiki={wiki} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Clock className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">{t('home.noWikis')}</h3>
              <p className="mb-6 text-gray-500">{t('home.noWikisHint')}</p>
              <Link
                href={localeHref(locale, '/chat')}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                <MessageSquarePlus className="h-4 w-4" />
                {t('home.createFirst')}
              </Link>
            </div>
          )}
        </section>

        {/* Recent wikis — initial batch SSR'd; infinite-scroll loads more on the client */}
        <section className="mt-12">
          <RecentWikisSection initialWikis={recent} />
        </section>
      </div>
    </div>
  );
}
