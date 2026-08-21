import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArenaNav from '@/components/arena/ArenaNav';
import BattleArena from '@/components/arena/BattleArena';
import { arenaMetadata } from '@/lib/arena/metadata';
import { hasLocale, supportedLocales, getTranslations, type Locale } from '@/lib/i18n/server';

/** Static shell; the battle itself is client-side against /api/arena/battle. */
export function generateStaticParams(): Array<{ locale: Locale }> {
  return supportedLocales.map((locale) => ({ locale }));
}

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
    path: '/arena/battle',
    title: t('arena.battle.title'),
    description: t('arena.battle.description'),
  });
}

export default async function ArenaBattlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ArenaNav locale={locale} active="battle" />

        <h2 className="text-2xl font-bold text-gray-900">{t('arena.battle.title')}</h2>
        <p className="mt-2 mb-6 max-w-2xl text-sm text-gray-600">
          {t('arena.battle.description')}
        </p>

        <BattleArena />
      </div>
    </div>
  );
}
