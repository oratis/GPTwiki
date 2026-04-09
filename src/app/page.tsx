'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquarePlus, Search, TrendingUp, Clock } from 'lucide-react';
import WikiCard from '@/components/wiki/WikiCard';
import WikiSearch from '@/components/wiki/WikiSearch';
import RecentWikisSection from '@/components/wiki/RecentWikisSection';
import LeaderboardSection from '@/components/wiki/LeaderboardSection';
import { useI18n } from '@/lib/i18n/context';
import type { Wiki } from '@/types';

export default function HomePage() {
  const { t } = useI18n();
  const [wikis, setWikis] = useState<Wiki[]>([]);
  const [searchResults, setSearchResults] = useState<Wiki[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/search')
      .then((res) => res.json())
      .then((data) => setWikis(data.wikis || []))
      .catch(() => setWikis([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSearchResults(data.wikis || []);
    } catch {
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const displayWikis = searchResults ?? wikis;
  const isSearching = searchResults !== null;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            {t('home.title')}
          </h1>
          <p className="mb-8 text-lg text-blue-100 sm:text-xl">
            {t('home.subtitle')}
          </p>
          <div className="mx-auto mb-8 max-w-2xl">
            <WikiSearch onSearch={handleSearch} placeholder={t('home.searchPlaceholder')} />
          </div>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg hover:bg-blue-50 transition-colors"
          >
            <MessageSquarePlus className="h-5 w-5" />
            {t('home.startConversation')}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Popular / Search Results */}
        <section>
          <div className="mb-8 flex items-center gap-2">
            {isSearching ? (
              <>
                <Search className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  {t('home.searchResults')} ({searchResults.length})
                </h2>
                <button onClick={() => setSearchResults(null)} className="ml-2 text-sm text-blue-600 hover:underline">
                  {t('home.clear')}
                </button>
              </>
            ) : (
              <>
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">{t('home.popularWikis')}</h2>
              </>
            )}
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
                  <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
                  <div className="mb-3 h-4 w-full rounded bg-gray-100" />
                  <div className="mb-3 h-4 w-2/3 rounded bg-gray-100" />
                  <div className="flex gap-2">
                    <div className="h-5 w-16 rounded-full bg-gray-100" />
                    <div className="h-5 w-12 rounded-full bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayWikis.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayWikis.map((wiki) => (
                <WikiCard key={wiki.id} wiki={wiki} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Clock className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                {isSearching ? t('home.noResults') : t('home.noWikis')}
              </h3>
              <p className="mb-6 text-gray-500">
                {isSearching ? t('home.noResultsHint') : t('home.noWikisHint')}
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                <MessageSquarePlus className="h-4 w-4" />
                {t('home.createFirst')}
              </Link>
            </div>
          )}
        </section>

        {/* Leaderboard + Recent (hide during search) */}
        {!isSearching && (
          <>
            <section className="mt-12">
              <LeaderboardSection />
            </section>

            <section className="mt-12">
              <RecentWikisSection />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
