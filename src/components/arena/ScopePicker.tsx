import Link from 'next/link';
import { localeHref } from '@/lib/i18n/links';
import { getTranslations, type Locale } from '@/lib/i18n/server';
import { OVERALL_SCOPE, scopeOptions } from '@/lib/arena/scopes';

type View = 'ranking' | 'pareto';

/**
 * Scope tabs plus the ranking/Pareto toggle. Plain links rather than a select,
 * so every slice has a shareable URL and the page stays a server component.
 */
export default function ScopePicker({
  locale,
  scope,
  view,
}: {
  locale: Locale;
  scope: string;
  view: View;
}) {
  const t = getTranslations(locale);

  const href = (next: { scope?: string; view?: View }) => {
    const params = new URLSearchParams();
    const nextScope = next.scope ?? scope;
    const nextView = next.view ?? view;
    if (nextScope !== OVERALL_SCOPE) params.set('scope', nextScope);
    if (nextView !== 'ranking') params.set('view', nextView);
    const query = params.toString();
    return localeHref(locale, `/arena/leaderboard${query ? `?${query}` : ''}`);
  };

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {scopeOptions(locale).map((option) => {
          const active = option.scope === scope;
          return (
            <Link
              key={option.scope}
              href={href({ scope: option.scope })}
              aria-current={active ? 'true' : undefined}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                active
                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t(option.label)}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-1.5">
        {(['ranking', 'pareto'] as const).map((candidate) => {
          const active = candidate === view;
          return (
            <Link
              key={candidate}
              href={href({ view: candidate })}
              aria-current={active ? 'true' : undefined}
              className={`rounded-md border px-3 py-1 text-xs font-medium transition-colors ${
                active
                  ? 'border-gray-300 bg-gray-100 text-gray-900'
                  : 'border-transparent text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t(candidate === 'ranking' ? 'arena.view.ranking' : 'arena.view.pareto')}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
