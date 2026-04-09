'use client';

import { useState, useEffect, use, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Eye, Bot, Clock, Tag, User, MessageSquare, MessageCirclePlus, Loader2 } from 'lucide-react';
import WikiContent from '@/components/wiki/WikiContent';
import WikiContinueChat from '@/components/wiki/WikiContinueChat';
import ShareButtons from '@/components/wiki/ShareButtons';
import MessageBubble from '@/components/chat/MessageBubble';
import { timeAgo } from '@/lib/utils';
import { getModelDisplayName } from '@/lib/models';
import { useI18n } from '@/lib/i18n/context';
import type { Wiki } from '@/types';

export default function WikiDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useI18n();
  const { data: session } = useSession();
  const [wiki, setWiki] = useState<Wiki | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConversation, setShowConversation] = useState(false);
  const [showContinueChat, setShowContinueChat] = useState(false);

  const fetchWiki = useCallback(() => {
    fetch(`/api/wiki/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setWiki)
      .catch(() => setWiki(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchWiki();
  }, [fetchWiki]);

  const handleWikiUpdated = () => {
    setShowContinueChat(false);
    setLoading(true);
    fetchWiki();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!wiki) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">{t('wiki.notFound')}</h1>
        <Link href="/wiki" className="text-blue-600 hover:underline">
          {t('wiki.backToWikis')}
        </Link>
      </div>
    );
  }

  const isAuthor = session?.user?.id === wiki.authorId;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/wiki"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('wiki.backToWikis')}
      </Link>

      <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">{wiki.title}</h1>

        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <Link href={`/profile/${wiki.authorId}`} className="flex items-center gap-1 hover:text-blue-600">
            <User className="h-4 w-4" />
            {wiki.authorName}
          </Link>
          <span className="flex items-center gap-1">
            <Bot className="h-4 w-4" />
            {getModelDisplayName(wiki.aiModel)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {wiki.views} {t('wiki.views')}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {timeAgo(wiki.createdAt)}
          </span>
        </div>

        {wiki.tags?.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {wiki.tags.map((tag) => (
              <Link
                key={tag}
                href={`/browse?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            ))}
          </div>
        )}

        {wiki.question && (
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">{t('wiki.originalQuestion')}</p>
            <p className="mt-1 text-gray-900">{wiki.question}</p>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <hr className="flex-1" />
          <div className="ml-4">
            <ShareButtons
              url={`https://gptwiki.net/wiki/${id}`}
              title={wiki.title}
              summary={wiki.summary || wiki.content?.substring(0, 200) || ''}
            />
          </div>
        </div>

        <WikiContent content={wiki.content} />
      </article>

      {/* Conversation section */}
      {wiki.conversation?.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConversation(!showConversation)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <MessageSquare className="h-4 w-4" />
              {showConversation ? t('wiki.hideConversation') : t('wiki.showConversation')} ({wiki.conversation.length} {t('wiki.messages')})
            </button>

            {session && showConversation && !showContinueChat && (
              <button
                onClick={() => setShowContinueChat(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <MessageCirclePlus className="h-4 w-4" />
                {t('wiki.continueAsk')}
              </button>
            )}
          </div>

          {showConversation && (
            <div className="mt-4 space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
              {wiki.conversation.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {/* Continue chat inline */}
              {showContinueChat && (
                <WikiContinueChat
                  wikiId={wiki.id}
                  initialConversation={wiki.conversation}
                  aiModel={wiki.aiModel}
                  isAuthor={isAuthor}
                  onWikiUpdated={handleWikiUpdated}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
