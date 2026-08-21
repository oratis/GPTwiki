import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { User } from 'lucide-react';
import ArenaNav from '@/components/arena/ArenaNav';
import { arenaMetadata } from '@/lib/arena/metadata';
import { getTopContributors, toPublicUserProfile } from '@/lib/search';
import { localeHref } from '@/lib/i18n/links';
import { hasLocale, getTranslations } from '@/lib/i18n/server';

/**
 * The contributor board.
 *
 * `getTopContributors` has been queryable through `GET /api/leaderboard` for a
 * while, but nothing in the app ever rendered it — and its `leaderboard.*`
 * strings were sitting translated in all 15 locales, unused. This is the page
 * they were written for. The JSON endpoint stays as the public data surface;
 * this page reads the library directly, as the other server pages do.
 */

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
    path: '/arena/contributors',
    title: t('leaderboard.title'),
    description: t('arena.contributors.description'),
  });
}

export default async function ArenaContributorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);

  const contributors = await getTopContributors(20)
    .then((users) => users.map(toPublicUserProfile))
    .catch(() => []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <ArenaNav locale={locale} active="contributors" />

        <h2 className="text-2xl font-bold text-gray-900">{t('leaderboard.title')}</h2>
        <p className="mt-2 mb-6 text-sm text-gray-600">{t('arena.contributors.description')}</p>

        {contributors.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
            {t('arena.contributors.empty')}
          </div>
        ) : (
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white">
            {contributors.map((user, i) => (
              <li key={user.id} className="flex items-center gap-4 px-4 py-3">
                <span className="w-6 font-mono text-sm text-gray-400">{i + 1}</span>
                {user.image ? (
                  <Image
                    src={user.image}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <User className="h-8 w-8 text-gray-300" />
                )}
                <Link
                  href={localeHref(locale, `/profile/${user.id}`)}
                  className="flex-1 truncate text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  {user.name}
                </Link>
                <span className="font-mono text-sm text-gray-500">
                  {user.wikisCount.toLocaleString(locale)}{' '}
                  <span className="text-xs text-gray-400">{t('leaderboard.wikis')}</span>
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
