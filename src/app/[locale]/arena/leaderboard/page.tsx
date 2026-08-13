import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArenaNav from '@/components/arena/ArenaNav';
import LeaderboardTable from '@/components/arena/LeaderboardTable';
import ParetoView from '@/components/arena/ParetoView';
import ScopePicker from '@/components/arena/ScopePicker';
import { arenaMetadata } from '@/lib/arena/metadata';
import { getRatingSnapshot } from '@/lib/arena/ratings';
import { OVERALL_SCOPE, normalizeScope } from '@/lib/arena/scopes';
import { hasLocale, getTranslations } from '@/lib/i18n/server';

// See note in [locale]/page.tsx — the Docker build has no Firestore creds.
export const dynamic = 'force-dynamic';

type RouteParams = { locale: string };
type RouteSearch = { scope?: string; view?: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = getTranslations(locale);
  // Canonical points at the unsliced board: the scope and view variants are the
  // same rows re-cut, so letting each combination claim its own canonical would
  // split the page's own signal across a dozen near-duplicates.
  return arenaMetadata({
    locale,
    path: '/arena/leaderboard',
    title: t('arena.leaderboard.title'),
    description: t('arena.leaderboard.description'),
  });
}

export default async function ArenaLeaderboardPage({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<RouteSearch>;
}) {
  const { locale } = await params;
  const { scope: rawScope, view: rawView } = await searchParams;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);

  const scope = normalizeScope(rawScope);
  const view = rawView === 'pareto' ? 'pareto' : 'ranking';

  // A missing snapshot is the normal pre-launch state, and a Firestore hiccup
  // should degrade to the empty state rather than 500 a static-ish page.
  const snapshot = await getRatingSnapshot(scope).catch(() => null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ArenaNav locale={locale} active="leaderboard" />

        <h2 className="text-2xl font-bold text-gray-900">{t('arena.leaderboard.title')}</h2>
        <p className="mt-2 mb-6 text-sm text-gray-600">{t('arena.leaderboard.description')}</p>

        <ScopePicker locale={locale} scope={scope} view={view} />

        {scope !== OVERALL_SCOPE && (
          <p className="mb-4 text-xs text-gray-500">{t('arena.scope.sliceNote')}</p>
        )}

        {view === 'pareto' ? (
          <ParetoView locale={locale} models={snapshot?.models ?? []} />
        ) : (
          <LeaderboardTable locale={locale} snapshot={snapshot} />
        )}
      </div>
    </div>
  );
}
