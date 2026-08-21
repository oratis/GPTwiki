import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArenaNav from '@/components/arena/ArenaNav';
import ReferenceBoard from '@/components/arena/ReferenceBoard';
import { arenaMetadata } from '@/lib/arena/metadata';
import { getReferenceBoard } from '@/lib/arena/ratings';
import { localeHref } from '@/lib/i18n/links';
import { hasLocale, getTranslations } from '@/lib/i18n/server';

// See note in [locale]/page.tsx — the Docker build has no Firestore creds.
export const dynamic = 'force-dynamic';

/**
 * A third-party leaderboard, reproduced under licence.
 *
 * Indexable, unlike the battle permalinks: this page has substantive content
 * with a named source, a licence, and a publication date, which is the opposite
 * of the thin near-duplicate shape `docs/auto-content-cron-plan.md` §7 blocked.
 *
 * It is a separate route from /arena/leaderboard on purpose. Our board and this
 * one rank different models by different votes, and the surest way to keep a
 * reader from conflating them is to never put them under one heading.
 */
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
    path: '/arena/reference',
    title: t('arena.reference.title'),
    description: t('arena.reference.description'),
  });
}

export default async function ArenaReferencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);

  // A missing board is the normal state before the first fetch, and a Firestore
  // hiccup should degrade to the empty state rather than 500 the page.
  const board = await getReferenceBoard().catch(() => null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ArenaNav locale={locale} active="reference" />

        <h2 className="text-2xl font-bold text-gray-900">{t('arena.reference.title')}</h2>
        <p className="mt-2 mb-6 max-w-3xl text-sm text-gray-600">
          {t('arena.reference.description')}
        </p>

        {board ? (
          <ReferenceBoard locale={locale} board={board} />
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
            <p className="mb-2 text-lg font-medium text-gray-900">
              {t('arena.reference.empty.title')}
            </p>
            <p className="mx-auto max-w-xl text-sm text-gray-500">
              {t('arena.reference.empty.body')}
            </p>
          </div>
        )}

        <p className="mt-6 max-w-3xl text-xs text-gray-500">
          {t('arena.reference.disclaimer')}{' '}
          <Link
            href={localeHref(locale, '/arena/rules')}
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            {t('arena.nav.rules')}
          </Link>
          {' · '}
          <Link
            href={localeHref(locale, '/arena/leaderboard')}
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            {t('arena.nav.leaderboard')}
          </Link>
        </p>
      </div>
    </div>
  );
}
