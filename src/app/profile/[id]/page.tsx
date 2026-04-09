'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { User, Calendar, BookOpen, Loader2, ArrowLeft } from 'lucide-react';
import WikiCard from '@/components/wiki/WikiCard';
import ApiKeyManager from '@/components/profile/ApiKeyManager';
import { useI18n } from '@/lib/i18n/context';
import { timeAgo } from '@/lib/utils';
import type { Wiki, UserProfile } from '@/types';

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useI18n();
  const { data: session } = useSession();
  const isOwnProfile = session?.user?.id === id;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [wikis, setWikis] = useState<Wiki[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/user/${id}`).then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      }),
      fetch(`/api/wiki?userId=${id}`).then((res) => {
        if (!res.ok) return [];
        return res.json();
      }),
    ])
      .then(([userData, wikiData]) => {
        setUser(userData);
        setWikis(Array.isArray(wikiData) ? wikiData : wikiData.wikis ?? []);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <User className="mx-auto mb-4 h-16 w-16 text-gray-300" />
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          {t('profile.userNotFound')}
        </h1>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.backHome') || 'Back to Home'}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backHome') || 'Back'}
      </Link>

      {/* Profile card */}
      <div className="rounded-2xl bg-gray-50 p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white shadow">
              <User className="h-12 w-12 text-blue-500" />
            </div>
          )}

          {/* User info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>

            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {t('profile.joined')} {timeAgo(user.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {t('profile.wikisCount', { n: user.wikisCount })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* API Key Manager - only for own profile */}
      {isOwnProfile && (
        <div className="mb-8">
          <ApiKeyManager />
        </div>
      )}

      {/* User's wikis */}
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        {t('profile.title')}
      </h2>

      {wikis.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wikis.map((wiki) => (
            <WikiCard key={wiki.id} wiki={wiki} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-gray-50 py-16 text-center">
          <BookOpen className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-gray-500">{t('profile.noWikis')}</p>
        </div>
      )}
    </div>
  );
}
