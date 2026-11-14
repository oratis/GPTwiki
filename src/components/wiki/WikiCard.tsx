'use client';

import Image from 'next/image';
import Link from '@/components/LocaleLink';
import { Eye, Clock, Bot, MessageSquare } from 'lucide-react';
import type { Wiki } from '@/types';
import { timeAgo, truncate } from '@/lib/utils';
import { getModelDisplayName } from '@/lib/models';
import { useI18n } from '@/lib/i18n/context';
import TagBadge from './TagBadge';

interface WikiCardProps {
  wiki: Wiki;
}

export default function WikiCard({ wiki }: WikiCardProps) {
  const { t, locale } = useI18n();

  return (
    <Link
      href={`/wiki/${wiki.id}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
    >
      {wiki.imageUrl && (
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={wiki.imageUrl}
            alt={wiki.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col p-5">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
        {wiki.title}
      </h3>
      <p className="mb-3 text-sm text-gray-600 line-clamp-2">
        {truncate(wiki.summary || wiki.question, 150)}
      </p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {[...new Set(wiki.tags?.filter(Boolean))].slice(0, 4).map((tag) => (
          <TagBadge key={tag}>{tag}</TagBadge>
        ))}
      </div>
      <div className="mt-auto space-y-2 border-t border-gray-100 pt-3 text-xs leading-5 text-gray-500">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap tabular-nums">
          <Eye aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(wiki.views)}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap">
          <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {timeAgo(wiki.createdAt, locale)}
        </span>
        {(wiki.threadCount ?? 0) > 0 && (
          <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-blue-600">
            <MessageSquare aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {wiki.threadCount}
          </span>
        )}
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex min-w-0 items-center gap-1" title={getModelDisplayName(wiki.aiModel)}>
          <Bot aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{getModelDisplayName(wiki.aiModel)}</span>
        </span>
        <span className="min-w-0 truncate" title={`${t('wiki.by')} ${wiki.authorName}`}>
          {t('wiki.by')} {wiki.authorName}
        </span>
        </div>
      </div>
      </div>
    </Link>
  );
}
