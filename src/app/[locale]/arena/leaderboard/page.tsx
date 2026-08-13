import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArenaNav from '@/components/arena/ArenaNav';
import LeaderboardTable from '@/components/arena/LeaderboardTable';
import { arenaMetadata } from '@/lib/arena/metadata';
import { getRatingSnapshot } from '@/lib/arena/ratings';
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
    path: '/arena/leaderboard',
    title: t('arena.leaderboard.title'),
    description: t('arena.leaderboard.description'),
  });
}

export default async function ArenaLeaderboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);

  // A missing snapshot is the normal pre-launch state, and a Firestore hiccup
  // should degrade to the empty state rather than 500 a static-ish page.
  const snapshot = await getRatingSnapshot().catch(() => null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ArenaNav locale={locale} active="leaderboard" />

        <h2 className="text-2xl font-bold text-gray-900">{t('arena.leaderboard.title')}</h2>
        <p className="mt-2 mb-6 text-sm text-gray-600">{t('arena.leaderboard.description')}</p>

        <LeaderboardTable locale={locale} snapshot={snapshot} />
      </div>
    </div>
  );
}
