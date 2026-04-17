'use client';

import Link from '@/components/LocaleLink';
import { Eye, Clock, Bot, MessageSquare } from 'lucide-react';
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
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
    >
      {wiki.imageUrl && (
        <div className="h-40 w-full overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={wiki.imageUrl}
            alt={wiki.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
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
        {(wiki.threadCount ?? 0) > 0 && (
          <span className="flex items-center gap-1 text-blue-500">
            <MessageSquare className="h-3.5 w-3.5" />
            {wiki.threadCount}
          </span>
        )}
        <span className="ml-auto text-gray-500">
          {t('wiki.by')} {wiki.authorName}
        </span>
      </div>
      </div>
    </Link>
  );
}
