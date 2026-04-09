'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Send, BookPlus, Loader2 } from 'lucide-react';
import type { AIModel, Message } from '@/types';
import { generateId } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/context';
import ModelSelector from './ModelSelector';
import MessageBubble from './MessageBubble';
import PublishDialog from './PublishDialog';
import WikiSuggestions from '../wiki/WikiSuggestions';

export default function ChatInterface() {
  const { t } = useI18n();
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState<AIModel>('claude');
  const [loading, setLoading] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // Show suggestions on first message
    if (messages.length === 0) {
      setSearchQuery(trimmed);
      setShowSuggestions(true);
    }

    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, model }),
      });

      if (!res.ok) {
        if (res.status === 403) {
          const err = await res.json();
          if (err.error === 'API_KEY_REQUIRED') {
            const profileUrl = session?.user?.id ? `/profile/${session.user.id}` : '/login';
            const errorMsg: Message = {
              id: generateId(),
              role: 'assistant',
              content: `${t('apiKeys.required')}\n\n[${t('apiKeys.configureHint')}](${profileUrl})`,
              timestamp: Date.now(),
            };
            setMessages([...newMessages, errorMsg]);
            setLoading(false);
            return;
          }
        }
        throw new Error('Chat request failed');
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');

      const assistantMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      setMessages([...newMessages, assistantMsg]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantMsg.content += decoder.decode(value, { stream: true });
        setMessages([...newMessages, { ...assistantMsg }]);
      }

      // Auto-show publish dialog after first complete exchange
      if (newMessages.length === 1) {
        setTimeout(() => setShowPublish(true), 500);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: t('chat.error'),
        timestamp: Date.now(),
      };
      setMessages([...newMessages, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Model selector */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <ModelSelector value={model} onChange={setModel} disabled={messages.length > 0} />
        {messages.length >= 2 && !loading && (
          <button
            onClick={() => setShowPublish(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors animate-pulse hover:animate-none"
          >
            <BookPlus className="h-4 w-4" />
            {t('chat.publishWiki')}
          </button>
        )}
      </div>

      {/* Suggestions bar */}
      {showSuggestions && searchQuery && (
        <WikiSuggestions query={searchQuery} onClose={() => setShowSuggestions(false)} />
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                {t('chat.startTitle')}
              </h2>
              <p className="mb-6 text-gray-500">
                {t('chat.startHint')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[t('chat.suggestion1'), t('chat.suggestion2'), t('chat.suggestion3')].map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                </div>
                <div className="rounded-2xl bg-gray-100 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-3xl gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chat.inputPlaceholder')}
            rows={1}
            className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ minHeight: '48px', maxHeight: '200px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      <PublishDialog
        open={showPublish}
        onClose={() => setShowPublish(false)}
        messages={messages}
        model={model}
      />
    </div>
  );
}
