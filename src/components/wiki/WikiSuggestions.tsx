'use client';

import { useState, useEffect } from 'react';
import Link from '@/components/LocaleLink';
import { X, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { truncate } from '@/lib/utils';
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
    let cancelled = false;
    const search = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (!cancelled) setWikis(data.wikis || []);
      } catch {
        if (!cancelled) setWikis([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    search();
    return () => {
      cancelled = true;
    };
  }, [query]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 border-b border-blue-100 bg-blue-50 px-4 py-2">
        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
        <span className="text-sm text-blue-700">{t('wiki.searchingWikis')}</span>
      </div>
    );
  }

  // No existing content matched — say nothing and let the AI answer.
  if (wikis.length === 0) return null;

  const [top, ...rest] = wikis;

  return (
    <div className="border-b border-blue-100 bg-blue-50 px-4 py-3">
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 flex items-start justify-between gap-3">
          <span className="flex items-center gap-1.5 text-sm font-medium text-blue-800">
            <BookOpen className="h-4 w-4 shrink-0" />
            {t('wiki.existingPrompt')}
          </span>
          <button
            onClick={onClose}
            aria-label={t('embed.close')}
            className="shrink-0 text-blue-400 hover:text-blue-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Prominent top match — the existing article that best answers the question */}
        <Link
          href={`/wiki/${top.id}`}
          target="_blank"
          className="group flex items-center justify-between gap-3 rounded-lg border border-blue-200 bg-white px-4 py-3 transition-colors hover:border-blue-400 hover:bg-blue-50"
        >
          <span className="min-w-0">
            <span className="block truncate font-semibold text-blue-900">{top.title}</span>
            {top.summary && (
              <span className="mt-0.5 block truncate text-xs text-gray-500">
                {truncate(top.summary, 110)}
              </span>
            )}
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600">
            {t('wiki.readArticle')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Other related articles */}
        {rest.length > 0 && (
          <div className="mt-2">
            <span className="text-xs text-blue-700/70">{t('wiki.alsoRelated')}:</span>
            <div className="mt-1 flex gap-2 overflow-x-auto pb-1">
              {rest.slice(0, 4).map((wiki) => (
                <Link
                  key={wiki.id}
                  href={`/wiki/${wiki.id}`}
                  target="_blank"
                  className="shrink-0 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs text-blue-700 transition-colors hover:bg-blue-50"
                >
                  {wiki.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
