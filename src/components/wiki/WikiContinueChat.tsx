'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Send, RefreshCw, FilePlus, Loader2 } from 'lucide-react';
import type { AIModel, Message } from '@/types';
import { generateId } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/context';
import MessageBubble from '@/components/chat/MessageBubble';

interface WikiContinueChatProps {
  wikiId: string;
  initialConversation: Message[];
  aiModel: AIModel;
  isAuthor: boolean;
  onWikiUpdated: () => void;
}

export default function WikiContinueChat({
  wikiId,
  initialConversation,
  aiModel,
  isAuthor,
  onWikiUpdated,
}: WikiContinueChatProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [creating, setCreating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [newMessages]);

  const allMessages = [...initialConversation, ...newMessages];

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    const updatedNew = [...newMessages, userMsg];
    setNewMessages(updatedNew);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...initialConversation, ...updatedNew],
          model: aiModel,
        }),
      });

      if (!res.ok) throw new Error('Chat request failed');
      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');

      const assistantMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };
      setNewMessages([...updatedNew, assistantMsg]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMsg.content += decoder.decode(value, { stream: true });
        setNewMessages([...updatedNew, { ...assistantMsg }]);
      }
    } catch (error) {
      console.error('Continue chat error:', error);
      setNewMessages([
        ...updatedNew,
        { id: generateId(), role: 'assistant', content: t('chat.error'), timestamp: Date.now() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateWiki = async () => {
    if (!isAuthor || newMessages.length === 0) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/wiki/${wikiId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation: allMessages }),
      });

      if (!res.ok) throw new Error('Update failed');
      onWikiUpdated();
    } catch (error) {
      console.error('Update wiki error:', error);
      alert('Failed to update wiki');
    } finally {
      setUpdating(false);
    }
  };

  const handleCreateNewWiki = async () => {
    if (newMessages.length < 2) return;
    setCreating(true);

    try {
      const res = await fetch('/api/wiki', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: newMessages,
          aiModel,
          title: '',
          question: newMessages[0]?.content || '',
          content: '',
          tags: [],
        }),
      });

      if (!res.ok) throw new Error('Create failed');
      const data = await res.json();
      router.push(`/wiki/${data.id}`);
    } catch (error) {
      console.error('Create wiki error:', error);
      alert('Failed to create wiki');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50/50 p-4">
      <h3 className="mb-4 text-sm font-semibold text-blue-800">
        {t('wiki.continueTitle')}
      </h3>

      {/* New messages */}
      {newMessages.length > 0 && (
        <div className="mb-4 space-y-3">
          {newMessages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={t('wiki.continueAsk')}
          disabled={loading}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>

      {/* Action buttons */}
      {newMessages.length >= 2 && !loading && (
        <div className="mt-3 flex flex-wrap gap-2">
          {isAuthor && (
            <button
              onClick={handleUpdateWiki}
              disabled={updating || creating}
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {updating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('wiki.updating')}
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  {t('wiki.appendToWiki')}
                </>
              )}
            </button>
          )}
          <button
            onClick={handleCreateNewWiki}
            disabled={creating || updating}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {creating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('wiki.creating')}
              </>
            ) : (
              <>
                <FilePlus className="h-4 w-4" />
                {t('wiki.createNewWiki')}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
