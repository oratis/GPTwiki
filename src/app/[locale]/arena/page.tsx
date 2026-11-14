import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ScrollText, Swords, Trophy, Users } from 'lucide-react';
import ArenaNav from '@/components/arena/ArenaNav';
import LeaderboardTable from '@/components/arena/LeaderboardTable';
import { arenaMetadata } from '@/lib/arena/metadata';
import { getRatingSnapshot } from '@/lib/arena/ratings';
import { localeHref } from '@/lib/i18n/links';
import { hasLocale, getTranslations, type Locale } from '@/lib/i18n/server';

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
    path: '/arena',
    title: t('arena.title'),
    description: t('arena.subtitle'),
  });
}

export default async function ArenaHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);
  const snapshot = await getRatingSnapshot().catch(() => null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ArenaNav locale={locale} active="hub" />

        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:p-8">
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-gray-800">{t('arena.subtitle')}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href={localeHref(locale, '/arena/battle')} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              <Swords className="h-4 w-4" />{t('arena.battle.start')}<ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={localeHref(locale, '/arena/rules')} className="rounded-xl px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-100">{t('arena.nav.rules')}</Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            locale={locale}
            href="/arena/battle"
            icon={<Swords className="h-5 w-5 text-blue-600" />}
            title={t('arena.battle.title')}
            body={t('arena.battle.description')}
          />
          <Card
            locale={locale}
            href="/arena/leaderboard"
            icon={<Trophy className="h-5 w-5 text-blue-600" />}
            title={t('arena.leaderboard.title')}
            body={t('arena.leaderboard.description')}
          />
          <Card
            locale={locale}
            href="/arena/rules"
            icon={<ScrollText className="h-5 w-5 text-blue-600" />}
            title={t('arena.nav.rules')}
            body={t('arena.rules.teaser')}
          />
          <Card
            locale={locale}
            href="/arena/contributors"
            icon={<Users className="h-5 w-5 text-blue-600" />}
            title={t('leaderboard.title')}
            body={t('arena.contributors.description')}
          />
        </div>

        <h2 className="mt-10 mb-4 text-xl font-semibold text-gray-900">
          {t('arena.leaderboard.title')}
        </h2>
        <LeaderboardTable locale={locale} snapshot={snapshot} />
      </div>
    </div>
  );
}

function Card({
  locale,
  href,
  icon,
  title,
  body,
}: {
  locale: Locale;
  href: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={localeHref(locale, href)}
      className="group flex flex-col rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-blue-200 hover:bg-blue-50/40"
    >
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <span className="font-medium text-gray-900">{title}</span>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-gray-600">{body}</p>
      <ArrowRight className="mt-3 h-4 w-4 text-gray-300 transition-colors group-hover:text-blue-600" />
    </Link>
  );
}
