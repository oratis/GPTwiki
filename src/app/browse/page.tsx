'use client';

import { useState, useEffect, useCallback } from 'react';
import { Folder, Loader2, Tag } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import WikiCard from '@/components/wiki/WikiCard';
import type { Wiki } from '@/types';

interface TagWithCount {
  name: string;
  count: number;
}

export default function BrowsePage() {
  const { t } = useI18n();
  const [tags, setTags] = useState<TagWithCount[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [wikis, setWikis] = useState<Wiki[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [loadingWikis, setLoadingWikis] = useState(false);

  useEffect(() => {
    fetch('/api/tags')
      .then((res) => res.json())
      .then((data) => {
        const fetched = data.tags ?? [];
        setTags(fetched);
        if (fetched.length > 0) {
          handleTagClick(fetched[0].name);
        }
      })
      .catch(() => setTags([]))
      .finally(() => setLoadingTags(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTagClick = useCallback(async (tag: string) => {
    setSelectedTag(tag);
    setLoadingWikis(true);
    try {
      const res = await fetch(`/api/wiki/by-tag?tag=${encodeURIComponent(tag)}`);
      const data = await res.json();
      setWikis(data.wikis ?? []);
    } catch {
      setWikis([]);
    } finally {
      setLoadingWikis(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Folder className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            {t('browse.title')}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Tags sidebar */}
          <div className="md:w-1/4 flex-shrink-0">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {t('browse.allCategories')}
            </h2>

            {loadingTags ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                {tags.map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => handleTagClick(tag.name)}
                    className={`flex items-center justify-between gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                      selectedTag === tag.name
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span>{tag.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedTag === tag.name
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {tag.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wikis grid */}
          <div className="flex-1">
            {!selectedTag ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Folder className="w-12 h-12 mb-4" />
                <p className="text-lg">{t('browse.selectCategory')}</p>
              </div>
            ) : loadingWikis ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : wikis.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <p className="text-lg">{t('browse.noWikis')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wikis.map((wiki) => (
                  <WikiCard key={wiki.id} wiki={wiki} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
