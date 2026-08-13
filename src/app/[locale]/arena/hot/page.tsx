import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Flame, MessageSquare, Eye } from 'lucide-react';
import ArenaNav from '@/components/arena/ArenaNav';
import { arenaMetadata } from '@/lib/arena/metadata';
import { getHotSnapshot } from '@/lib/arena/ratings';
import { TIER_THRESHOLDS } from '@/lib/arena/hot-scoring';
import { localeHref } from '@/lib/i18n/links';
import { hasLocale, getTranslations } from '@/lib/i18n/server';

// See note in [locale]/page.tsx — the Docker build has no Firestore creds.
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = getTranslations(locale);
  return arenaMetadata({
    locale,
    path: '/arena/hot',
    title: t('arena.hot.title'),
    description: t('arena.hot.description'),
  });
}

export default async function ArenaHotPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);

  const snapshot = await getHotSnapshot().catch(() => null);
  const items = snapshot?.items ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <ArenaNav locale={locale} active="hot" />

        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Flame className="h-6 w-6 text-orange-500" />
          {t('arena.hot.title')}
        </h2>
        <p className="mt-2 mb-6 max-w-2xl text-sm text-gray-600">{t('arena.hot.description')}</p>

        {items.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
            <p className="mb-2 text-lg font-medium text-gray-900">{t('arena.hot.empty.title')}</p>
            <p className="mx-auto max-w-xl text-sm text-gray-500">{t('arena.hot.empty.body')}</p>
          </div>
        ) : (
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white">
            {items.map((item, i) => (
              <li key={item.id} className="flex items-start gap-4 px-4 py-3">
                <span className="w-6 pt-0.5 font-mono text-sm text-gray-400">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <Link
                    href={localeHref(locale, `/wiki/${item.id}`)}
                    className="block truncate text-sm font-medium text-gray-900 hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-600">
                      {t(`arena.hot.tier.${item.tier}`)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {item.views.toLocaleString(locale)}
                    </span>
                    {item.threadCount > 0 && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {item.threadCount.toLocaleString(locale)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="pt-0.5 font-mono text-sm text-gray-500">
                  {item.score.toFixed(1)}
                </span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-6 space-y-2 border-t border-gray-200 pt-4 text-xs text-gray-500">
          <p>{t('arena.hot.method')}</p>
          <p>
            {t('arena.hot.thresholds', {
              editorial: TIER_THRESHOLDS.editorial,
              user: TIER_THRESHOLDS.user,
              mirror: TIER_THRESHOLDS.mirror,
            })}
          </p>
          {snapshot && (
            <p className="font-mono">
              {t('arena.meta.updated')}:{' '}
              {new Date(snapshot.computedAt).toISOString().replace('T', ' ').slice(0, 16)} UTC ·{' '}
              {t('arena.hot.window', { days: snapshot.windowDays })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
