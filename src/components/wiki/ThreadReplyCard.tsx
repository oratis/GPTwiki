'use client';

import Image from 'next/image';
import { User, Bot, Clock } from 'lucide-react';
import { timeAgo } from '@/lib/utils';
import { getModelDisplayName } from '@/lib/models';
import WikiContent from './WikiContent';
import type { ThreadReply } from '@/types';

export default function ThreadReplyCard({ reply }: { reply: ThreadReply }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header: author + time + model */}
      <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
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
          {timeAgo(reply.createdAt)}
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
