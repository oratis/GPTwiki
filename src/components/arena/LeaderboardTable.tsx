import Link from 'next/link';
import { Info } from 'lucide-react';
import { localeHref } from '@/lib/i18n/links';
import { getTranslations, type Locale } from '@/lib/i18n/server';
import { getModelDisplayName } from '@/lib/models';
import type { AIModel } from '@/types';
import type { ArenaRatingSnapshot } from '@/types/arena';

/**
 * The public model board.
 *
 * Every display decision here exists to stop the page from claiming more than
 * the data supports: provisional rows show counts instead of a score, ranks are
 * printed as intervals, and a snapshot that has not been written yet renders an
 * empty state rather than zeroes.
 */
export default function LeaderboardTable({
  locale,
  snapshot,
}: {
  locale: Locale;
  snapshot: ArenaRatingSnapshot | null;
}) {
  const t = getTranslations(locale);

  if (!snapshot || snapshot.models.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
        <p className="mb-2 text-lg font-medium text-gray-900">{t('arena.empty.title')}</p>
        <p className="mx-auto max-w-xl text-sm text-gray-500">{t('arena.empty.body')}</p>
        <Link
          href={localeHref(locale, '/arena/rules')}
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {t('arena.nav.rules')} →
        </Link>
      </div>
    );
  }

  const anyProvisional = snapshot.models.some((m) => m.provisional);
  const fmt = (n: number) => n.toLocaleString(locale);

  return (
    <div>
      {anyProvisional && (
        <div className="mb-4 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
          <p className="text-sm text-amber-900">
            {t('arena.provisionalNote', { minVotes: snapshot.minVotes })}
          </p>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
              <th scope="col" className="px-4 py-3 font-semibold">{t('arena.table.rank')}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t('arena.table.model')}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t('arena.table.score')}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t('arena.table.record')}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t('arena.table.bothBad')}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t('arena.table.votes')}</th>
            </tr>
          </thead>
          <tbody>
            {snapshot.models.map((m) => (
              <tr key={m.model} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-mono text-gray-500">
                  {m.rankLow === null
                    ? '—'
                    : m.rankLow === m.rankHigh
                      ? m.rankLow
                      : `${m.rankLow}–${m.rankHigh}`}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {getModelDisplayName(m.model as AIModel)}
                  {m.provisional && (
                    <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-normal text-amber-800">
                      {t('arena.provisional')}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {m.score === null ? (
                    <span className="text-gray-400">—</span>
                  ) : (
                    <span className="font-mono text-gray-900">
                      {Math.round(m.score)}
                      <span className="ml-1 text-xs text-gray-400">
                        ±{Math.round((m.ciHigh! - m.ciLow!) / 2)}
                      </span>
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-gray-600">
                  {fmt(m.wins)}&thinsp;/&thinsp;{fmt(m.losses)}&thinsp;/&thinsp;{fmt(m.ties)}
                </td>
                <td className="px-4 py-3 font-mono text-gray-600">{fmt(m.bothBad)}</td>
                <td className="px-4 py-3 font-mono text-gray-600">{fmt(m.votes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-gray-500 sm:grid-cols-4">
        <div>
          <dt className="font-medium text-gray-700">{t('arena.meta.counted')}</dt>
          <dd className="font-mono">{fmt(snapshot.effectiveBattles)}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">{t('arena.meta.excluded')}</dt>
          <dd className="font-mono">{fmt(snapshot.excludedBattles)}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">{t('arena.meta.positionBias')}</dt>
          <dd className="font-mono">{snapshot.positionBias.toFixed(3)}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">{t('arena.meta.updated')}</dt>
          <dd className="font-mono">
            {new Date(snapshot.computedAt).toISOString().replace('T', ' ').slice(0, 16)} UTC
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-gray-400">{snapshot.method}</p>
    </div>
  );
}
