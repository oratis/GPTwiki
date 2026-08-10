import { getTranslations, type Locale } from '@/lib/i18n/server';
import { getModelPricing, buildParetoPoints } from '@/lib/arena/pricing';
import { getModelDisplayName } from '@/lib/models';
import type { AIModel } from '@/types';
import type { ArenaModelRating } from '@/types/arena';

/**
 * Rating against cost — the view that answers "cheap and good enough?", which
 * the ranked table cannot. Borrowed from arena.ai's Pareto toggle; with three
 * models it is arguably *more* readable than with fifty.
 *
 * Inline SVG rather than a chart library: three points and two axes do not
 * justify a dependency, and this stays a server component with no client JS.
 */
export default function ParetoView({
  locale,
  models,
}: {
  locale: Locale;
  models: ArenaModelRating[];
}) {
  const t = getTranslations(locale);
  const pricing = getModelPricing();
  const points = buildParetoPoints(models, pricing);

  if (points.length === 0) {
    const anyPriced = Object.keys(pricing).length > 0;
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        {anyPriced ? t('arena.pareto.noScores') : t('arena.pareto.notConfigured')}
      </div>
    );
  }

  // Plot geometry. Padding leaves room for axis labels; the domains are padded
  // by 10% so points never sit on the frame.
  const width = 640;
  const height = 320;
  const pad = { top: 20, right: 24, bottom: 44, left: 56 };

  const costs = points.map((p) => p.cost);
  const scores = points.map((p) => p.score);
  const costMin = Math.min(...costs);
  const costMax = Math.max(...costs);
  const scoreMin = Math.min(...scores);
  const scoreMax = Math.max(...scores);
  // A single point (or a tie) gives a zero-width domain; widen it so the
  // division below never yields NaN and the point lands mid-plot.
  const costSpan = costMax - costMin || Math.max(1, costMax);
  const scoreSpan = scoreMax - scoreMin || 100;

  const x = (cost: number) =>
    pad.left + ((cost - (costMin - costSpan * 0.1)) / (costSpan * 1.2)) * (width - pad.left - pad.right);
  const y = (score: number) =>
    height - pad.bottom - ((score - (scoreMin - scoreSpan * 0.1)) / (scoreSpan * 1.2)) * (height - pad.top - pad.bottom);

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full min-w-[480px]"
          role="img"
          aria-label={t('arena.pareto.title')}
        >
          {/* Axes */}
          <line
            x1={pad.left}
            y1={height - pad.bottom}
            x2={width - pad.right}
            y2={height - pad.bottom}
            stroke="#d1d5db"
          />
          <line x1={pad.left} y1={pad.top} x2={pad.left} y2={height - pad.bottom} stroke="#d1d5db" />

          <text
            x={(pad.left + width - pad.right) / 2}
            y={height - 8}
            textAnchor="middle"
            className="fill-gray-500"
            fontSize="11"
          >
            {t('arena.pareto.xAxis')}
          </text>
          <text
            x={14}
            y={(pad.top + height - pad.bottom) / 2}
            textAnchor="middle"
            transform={`rotate(-90 14 ${(pad.top + height - pad.bottom) / 2})`}
            className="fill-gray-500"
            fontSize="11"
          >
            {t('arena.pareto.yAxis')}
          </text>

          {points.map((point) => (
            <g key={point.model}>
              <circle
                cx={x(point.cost)}
                cy={y(point.score)}
                r={point.onFrontier ? 7 : 5}
                className={point.onFrontier ? 'fill-blue-600' : 'fill-gray-300'}
              />
              <text
                x={x(point.cost)}
                y={y(point.score) - 12}
                textAnchor="middle"
                className="fill-gray-700"
                fontSize="11"
              >
                {getModelDisplayName(point.model as AIModel)}
              </text>
              <text
                x={x(point.cost)}
                y={y(point.score) + 20}
                textAnchor="middle"
                className="fill-gray-400"
                fontSize="10"
              >
                {Math.round(point.score)} · ${point.cost.toFixed(2)}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <p className="mt-3 text-xs text-gray-500">{t('arena.pareto.frontierNote')}</p>
    </div>
  );
}
