import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { localeHref } from '@/lib/i18n/links';
import { getTranslations, type Locale } from '@/lib/i18n/server';

type ArenaSection = 'hub' | 'battle' | 'leaderboard' | 'hot' | 'rules' | 'contributors';

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

      <nav className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <Link
              key={tab.key}
              href={localeHref(locale, tab.path)}
              aria-current={isActive ? 'page' : undefined}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
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
