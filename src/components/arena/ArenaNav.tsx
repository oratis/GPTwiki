import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { localeHref } from '@/lib/i18n/links';
import { getTranslations, type Locale } from '@/lib/i18n/server';

type ArenaSection =
  | 'hub'
  | 'battle'
  | 'leaderboard'
  | 'reference'
  | 'hot'
  | 'rules'
  | 'contributors';

/**
 * Shared header + sub-navigation for the /arena section. Server component —
 * the whole section is static or snapshot-driven, so nothing here needs to be
 * interactive.
 */
export default function ArenaNav({
  locale,
  active,
}: {
  locale: Locale;
  active: ArenaSection;
}) {
  const t = getTranslations(locale);
  const tabs: Array<{ key: ArenaSection; path: string; label: string }> = [
    { key: 'hub', path: '/arena', label: t('arena.nav.overview') },
    { key: 'battle', path: '/arena/battle', label: t('arena.nav.battle') },
    { key: 'leaderboard', path: '/arena/leaderboard', label: t('arena.nav.leaderboard') },
    { key: 'reference', path: '/arena/reference', label: t('arena.nav.reference') },
    { key: 'hot', path: '/arena/hot', label: t('arena.nav.hot') },
    { key: 'rules', path: '/arena/rules', label: t('arena.nav.rules') },
    { key: 'contributors', path: '/arena/contributors', label: t('arena.nav.contributors') },
  ];

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-3">
        <Trophy className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">{t('arena.title')}</h1>
      </div>

      <nav aria-label={t('arena.title')} className="flex gap-1.5 overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <Link
              key={tab.key}
              href={localeHref(locale, tab.path)}
              aria-current={isActive ? 'page' : undefined}
              className={`shrink-0 whitespace-nowrap rounded-xl border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                isActive
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
