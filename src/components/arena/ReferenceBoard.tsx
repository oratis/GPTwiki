import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { localeHref } from '@/lib/i18n/links';
import { getTranslations, type Locale } from '@/lib/i18n/server';
import type { ArenaReferenceBoard } from '@/types/arena';

/**
 * A third-party leaderboard, reproduced under its own licence.
 *
 * Two rules govern everything in here, both from `docs/arena-reference-boards.md`:
 *
 *  1. **It must never read as ours.** The heading names the source, the numbers
 *     are never restyled to match our own board's table, and the attribution
 *     block is part of the component rather than a page-level footnote — so the
 *     credit cannot be separated from the data by a later refactor.
 *  2. **Nothing is adjusted.** Ratings, intervals, vote counts and ranks are the
 *     source's own. Renormalising them onto our scale would turn a reproduction
 *     into a derivative work and put our arithmetic inside their numbers.
 *
 * `board` carries its own attribution fields, so this component cannot be
 * rendered without them — that is why they are required on `ArenaReferenceBoard`
 * rather than optional.
 */
export default function ReferenceBoard({
  locale,
  board,
  compact = false,
}: {
  locale: Locale;
  board: ArenaReferenceBoard;
  /** Show a short excerpt with a link to the full page. */
  compact?: boolean;
}) {
  const t = getTranslations(locale);
  const rows = compact ? board.rows.slice(0, 10) : board.rows;
  const fmt = (n: number) => n.toLocaleString(locale);

  return (
    <section className="rounded-lg border border-gray-200 bg-white">
      <header className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">
          {t('arena.reference.heading', { source: board.sourceName })}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {t('arena.reference.notOurs', { source: board.sourceName })}
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
              <th scope="col" className="px-4 py-2 font-semibold">{t('arena.table.rank')}</th>
              <th scope="col" className="px-4 py-2 font-semibold">{t('arena.table.model')}</th>
              <th scope="col" className="px-4 py-2 font-semibold">{t('arena.reference.org')}</th>
              <th scope="col" className="px-4 py-2 font-semibold">{t('arena.table.score')}</th>
              <th scope="col" className="px-4 py-2 font-semibold">{t('arena.table.votes')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.modelName}
                className={`border-b border-gray-100 last:border-0 ${row.served ? 'bg-blue-50/60' : ''}`}
              >
                <td className="px-4 py-2 font-mono text-gray-500">{row.rank}</td>
                <td className="px-4 py-2 font-medium text-gray-900">
                  {row.modelName}
                  {row.served && (
                    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-normal text-blue-800">
                      {t('arena.reference.served')}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-gray-600">{row.organization || '—'}</td>
                <td className="px-4 py-2 font-mono text-gray-900">
                  {Math.round(row.rating)}
                  <span className="ml-1 text-xs text-gray-400">
                    ±{Math.round((row.ratingHigh - row.ratingLow) / 2)}
                  </span>
                </td>
                <td className="px-4 py-2 font-mono text-gray-600">{fmt(row.votes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compact && board.rows.length > rows.length && (
        <div className="border-t border-gray-100 px-4 py-3">
          <Link
            href={localeHref(locale, '/arena/reference')}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {t('arena.reference.seeAll', { count: fmt(board.rows.length) })} →
          </Link>
        </div>
      )}

      {/*
        Stated rather than left as a blank row. GPTwiki serves models this board
        does not rank, and an unexplained absence reads as our oversight instead
        of a fact about the source's coverage.
      */}
      {board.unrankedServedModels.length > 0 && (
        <p className="border-t border-gray-100 px-4 py-3 text-xs text-gray-500">
          {t('arena.reference.unranked', {
            source: board.sourceName,
            models: board.unrankedServedModels.join(', '),
          })}
        </p>
      )}

      {/*
        The licence requires attribution wherever the data appears, so this block
        lives inside the component that renders the rows — not on the page.
        Publish date and fetch time are shown separately: they are two different
        facts, and merging them into one "updated" line would imply we computed
        the ratings.
      */}
      <footer className="space-y-1 border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500">
        <p>
          {t('arena.reference.credit')}{' '}
          <a
            href={board.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-0.5 font-medium text-blue-600 hover:text-blue-700"
          >
            {board.sourceName}
            <ExternalLink className="h-3 w-3" />
          </a>
          {' · '}
          <a
            href={board.datasetUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:text-blue-700"
          >
            {t('arena.reference.dataset')}
          </a>
          {' · '}
          <a
            href={board.licenseUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-blue-600 hover:text-blue-700"
          >
            {board.license}
          </a>
        </p>
        <p className="font-mono">
          {t('arena.reference.published')}: {board.publishedAt} · {t('arena.reference.retrieved')}:{' '}
          {new Date(board.fetchedAt).toISOString().replace('T', ' ').slice(0, 16)} UTC
        </p>
      </footer>
    </section>
  );
}
