'use client';

import { useState, useEffect } from 'react';
import Link from '@/components/LocaleLink';
import { X, ExternalLink, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import type { Wiki } from '@/types';

interface WikiSuggestionsProps {
  query: string;
  onClose: () => void;
}

export default function WikiSuggestions({ query, onClose }: WikiSuggestionsProps) {
  const { t } = useI18n();
  const [wikis, setWikis] = useState<Wiki[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setWikis(data.wikis || []);
      } catch {
        setWikis([]);
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [query]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 border-b border-blue-100 bg-blue-50 px-4 py-2">
        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
        <span className="text-sm text-blue-700">{t('wiki.searchingWikis')}</span>
      </div>
    );
  }

  if (wikis.length === 0) return null;

  return (
    <div className="border-b border-blue-100 bg-blue-50 px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-800">
          {t('wiki.relatedFound')} ({wikis.length})
        </span>
        <button onClick={onClose} className="text-blue-400 hover:text-blue-600">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {wikis.slice(0, 5).map((wiki) => (
          <Link
            key={wiki.id}
            href={`/wiki/${wiki.id}`}
            target="_blank"
            className="flex shrink-0 items-center gap-1 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-50 transition-colors"
          >
            {wiki.title}
            <ExternalLink className="h-3 w-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}
