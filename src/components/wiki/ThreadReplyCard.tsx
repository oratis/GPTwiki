'use client';

import Image from 'next/image';
import { User, Bot, Clock, GitMerge, Loader2, CheckCircle2 } from 'lucide-react';
import { timeAgo } from '@/lib/utils';
import { getModelDisplayName } from '@/lib/models';
import { useI18n } from '@/lib/i18n/context';
import WikiContent from './WikiContent';
import type { ThreadReply } from '@/types';

interface ThreadReplyCardProps {
  reply: ThreadReply;
  /** Present only for the wiki author — merges this thread into the article. */
  onMerge?: () => void;
  merging?: boolean;
}

export default function ThreadReplyCard({ reply, onMerge, merging = false }: ThreadReplyCardProps) {
  const { t, locale } = useI18n();
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header: author + time + model */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          {reply.authorImage ? (
            <Image
              src={reply.authorImage}
              alt={reply.authorName}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full"
            />
          ) : (
            <User className="h-4 w-4" />
          )}
          <span className="font-medium text-gray-700">{reply.authorName}</span>
        </div>
        <span className="flex items-center gap-1">
          <Bot className="h-3.5 w-3.5" />
          {getModelDisplayName(reply.aiModel)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {timeAgo(reply.createdAt, locale)}
        </span>

        <span className="ml-auto">
          {reply.mergedAt ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t('thread.merged')}
            </span>
          ) : (
            onMerge && (
              <button
                onClick={onMerge}
                disabled={merging}
                className="inline-flex items-center gap-1.5 rounded-lg border border-green-600 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50 disabled:opacity-50 transition-colors"
              >
                {merging ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {t('thread.merging')}
                  </>
                ) : (
                  <>
                    <GitMerge className="h-3.5 w-3.5" />
                    {t('thread.mergeIntoArticle')}
                  </>
                )}
              </button>
            )
          )}
        </span>
      </div>

      {/* Question */}
      <div className="mb-3 rounded-lg bg-blue-50 p-3">
        <p className="text-sm font-medium text-blue-800">{reply.question}</p>
      </div>

      {/* AI Answer */}
      <div className="prose prose-sm max-w-none text-gray-700">
        <WikiContent content={reply.answer} />
      </div>
    </div>
  );
}
