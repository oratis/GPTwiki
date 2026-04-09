'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Clock, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import WikiCard from '@/components/wiki/WikiCard';
import type { Wiki } from '@/types';

export default function RecentWikisSection() {
  const { t } = useI18n();
  const [wikis, setWikis] = useState<Wiki[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchWikis = useCallback(async (cursor?: number) => {
    const isInitial = cursor === undefined;
    if (isInitial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const params = new URLSearchParams({ limit: '12' });
      if (cursor !== undefined) {
        params.set('cursor', String(cursor));
      }
      const res = await fetch(`/api/wiki/recent?${params}`);
      const data = await res.json();

      setWikis((prev) => (isInitial ? data.wikis : [...prev, ...data.wikis]));
      setNextCursor(data.nextCursor ?? null);
    } catch (error) {
      console.error('Failed to fetch recent wikis:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchWikis();
  }, [fetchWikis]);

  useEffect(() => {
    if (!sentinelRef.current || nextCursor === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && nextCursor !== null) {
          fetchWikis(nextCursor);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [nextCursor, loadingMore, fetchWikis]);

  return (
    <section>
      <div className="mb-6 flex items-center gap-2">
        <Clock className="h-6 w-6 text-gray-600" />
        <h2 className="text-2xl font-bold text-gray-900">{t('home.recentWikis')}</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wikis.map((wiki) => (
              <WikiCard key={wiki.id} wiki={wiki} />
            ))}
          </div>

          {loadingMore && (
            <div className="mt-6 flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          )}

          {!loadingMore && nextCursor === null && wikis.length > 0 && (
            <p className="mt-6 text-center text-sm text-gray-500">No more wikis</p>
          )}

          <div ref={sentinelRef} className="h-4" />
        </>
      )}
    </section>
  );
}
