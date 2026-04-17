'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import WikiCard from '@/components/wiki/WikiCard';
import WikiSearch from '@/components/wiki/WikiSearch';
import { useI18n } from '@/lib/i18n/context';
import type { Wiki } from '@/types';

export default function WikiListPage() {
  const { t } = useI18n();
  const [wikis, setWikis] = useState<Wiki[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/wiki')
      .then((res) => res.json())
      .then((data) => setWikis(data.wikis || []))
      .catch(() => setWikis([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const url = query.trim()
        ? `/api/search?q=${encodeURIComponent(query)}`
        : '/api/wiki';
      const res = await fetch(url);
      const data = await res.json();
      setWikis(data.wikis || []);
    } catch {
      setWikis([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <BookOpen className="h-7 w-7 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">{t('wiki.browseTitle')}</h1>
      </div>

      <div className="mb-8 max-w-2xl">
        <WikiSearch onSearch={handleSearch} placeholder={t('wiki.searchPlaceholder')} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : wikis.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wikis.map((wiki) => (
            <WikiCard key={wiki.id} wiki={wiki} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500">
          {t('wiki.noWikis')}
        </div>
      )}
    </div>
  );
}
