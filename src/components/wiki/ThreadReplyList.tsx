'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MessageSquarePlus, Loader2, Send, ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { track } from '@/lib/analytics';
import { useToast } from '@/components/ui/Toast';
import ThreadReplyCard from './ThreadReplyCard';
import ModelSelector from '@/components/chat/ModelSelector';
import type { ThreadReply, AIModel } from '@/types';

interface ThreadReplyListProps {
  wikiId: string;
  threadCount?: number;
  /** Enables the per-thread "merge into article" action for the wiki author. */
  wikiAuthorId?: string;
}

export default function ThreadReplyList({ wikiId, threadCount = 0, wikiAuthorId }: ThreadReplyListProps) {
  const { t } = useI18n();
  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();
  const [threads, setThreads] = useState<ThreadReply[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [mergingId, setMergingId] = useState<string | null>(null);

  const isWikiAuthor = !!wikiAuthorId && session?.user?.id === wikiAuthorId;

  // Compose state
  const [showCompose, setShowCompose] = useState(false);
  const [question, setQuestion] = useState('');
  const [model, setModel] = useState<AIModel>('claude');
  const [posting, setPosting] = useState(false);

  const loadThreads = useCallback(async (cursor?: number) => {
    setLoading(true);
    setLoadError(false);
    try {
      const url = cursor
        ? `/api/wiki/${wikiId}/threads?cursor=${cursor}&limit=10`
        : `/api/wiki/${wikiId}/threads?limit=10`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setThreads((prev) => cursor ? [...prev, ...data.threads] : data.threads);
      setNextCursor(data.nextCursor);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, [wikiId]);

  useEffect(() => {
    if (threadCount > 0) {
      loadThreads();
    } else {
      setHasLoaded(true);
    }
  }, [threadCount, loadThreads]);

  const handlePost = async () => {
    const trimmed = question.trim();
    if (!trimmed || posting) return;

    setPosting(true);
    try {
      const res = await fetch(`/api/wiki/${wikiId}/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed, aiModel: model }),
      });

      if (!res.ok) {
        const err = await res.json();
        if (err.error === 'API_KEY_REQUIRED') {
          toast(t('apiKeys.required'));
          return;
        }
        if (err.error === 'QUOTA_EXHAUSTED') {
          toast(t('chat.quotaExhausted'));
          return;
        }
        throw new Error('Failed to post');
      }

      const data = await res.json();
      // Funnel: a follow-up thread is the UGC growth loop in action.
      track('thread_created', { wiki_id: wikiId });
      setThreads((prev) => [...prev, data.thread]);
      setQuestion('');
      setShowCompose(false);
    } catch (error) {
      console.error('Post thread error:', error);
      toast(t('errors.replyFailed'));
    } finally {
      setPosting(false);
    }
  };

  const handleMerge = async (threadId: string) => {
    if (mergingId) return;
    setMergingId(threadId);
    try {
      const res = await fetch(`/api/wiki/${wikiId}/merge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        if (err?.error === 'API_KEY_REQUIRED') {
          toast(t('apiKeys.required'));
          return;
        }
        if (err?.error === 'QUOTA_EXHAUSTED') {
          toast(t('chat.quotaExhausted'));
          return;
        }
        throw new Error('Merge failed');
      }

      setThreads((prev) =>
        prev.map((th) => (th.id === threadId ? { ...th, mergedAt: Date.now() } : th))
      );
      toast(t('thread.mergeSuccess'), 'success');
      // The article content above changed — refetch the server-rendered page.
      router.refresh();
    } catch (error) {
      console.error('Merge thread error:', error);
      toast(t('thread.mergeFailed'));
    } finally {
      setMergingId(null);
    }
  };

  if (!hasLoaded) return null;

  return (
    <div className="mt-8">
      {/* Section header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <MessageSquarePlus className="h-5 w-5 text-blue-600" />
          {t('thread.replies')}
          {threads.length > 0 && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {threads.length}
            </span>
          )}
        </h2>

        {session && !showCompose && (
          <button
            onClick={() => setShowCompose(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <MessageSquarePlus className="h-4 w-4" />
            {t('thread.askFollowup')}
          </button>
        )}
      </div>

      {/* Thread list */}
      {loadError && threads.length === 0 ? (
        <div className="py-8 text-center">
          <p className="mb-3 text-sm text-gray-500">{t('thread.loadError')}</p>
          <button
            onClick={() => loadThreads()}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {t('common.retry')}
          </button>
        </div>
      ) : threads.length > 0 ? (
        <div className="space-y-4">
          {threads.map((reply) => (
            <ThreadReplyCard
              key={reply.id}
              reply={reply}
              onMerge={isWikiAuthor ? () => handleMerge(reply.id) : undefined}
              merging={mergingId === reply.id}
            />
          ))}
        </div>
      ) : (
        !showCompose && (
          <p className="py-8 text-center text-sm text-gray-400">
            {t('thread.noReplies')}
          </p>
        )
      )}

      {/* Load more */}
      {nextCursor && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => loadThreads(nextCursor)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {t('thread.loadMore')}
          </button>
        </div>
      )}

      {/* Compose area */}
      {showCompose && (
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/50 p-4">
          <h3 className="mb-3 text-sm font-semibold text-blue-800">
            {t('thread.askFollowup')}
          </h3>

          <div className="mb-3">
            <ModelSelector value={model} onChange={setModel} />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handlePost();
                }
              }}
              placeholder={t('thread.askFollowup')}
              disabled={posting}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            />
            <button
              onClick={handlePost}
              disabled={!question.trim() || posting}
              aria-label={t('chat.send')}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>

          {posting && (
            <p className="mt-2 text-xs text-blue-600">
              {t('thread.generating')}
            </p>
          )}

          <button
            onClick={() => setShowCompose(false)}
            className="mt-2 text-xs text-gray-500 hover:text-gray-700"
          >
            {t('common.cancel')}
          </button>
        </div>
      )}
    </div>
  );
}
