'use client';

import Link from 'next/link';
import { Eye, Clock, Bot } from 'lucide-react';
import type { Wiki } from '@/types';
import { timeAgo, truncate } from '@/lib/utils';
import { getModelDisplayName } from '@/lib/models';
import { useI18n } from '@/lib/i18n/context';

interface WikiCardProps {
  wiki: Wiki;
}

export default function WikiCard({ wiki }: WikiCardProps) {
  const { t } = useI18n();

  return (
    <Link
      href={`/wiki/${wiki.id}`}
      className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
    >
      <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
        {wiki.title}
      </h3>
      <p className="mb-3 text-sm text-gray-600 line-clamp-2">
        {truncate(wiki.summary || wiki.question, 150)}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {wiki.tags?.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          {wiki.views}
        </span>
        <span className="flex items-center gap-1">
          <Bot className="h-3.5 w-3.5" />
          {getModelDisplayName(wiki.aiModel)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {timeAgo(wiki.createdAt)}
        </span>
        <span className="ml-auto text-gray-500">
          {t('wiki.by')} {wiki.authorName}
        </span>
      </div>
    </Link>
  );
}
