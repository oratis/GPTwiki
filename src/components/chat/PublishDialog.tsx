'use client';

import { useState } from 'react';
import { X, BookPlus, Loader2 } from 'lucide-react';
import type { Message, AIModel } from '@/types';
import { useI18n } from '@/lib/i18n/context';

interface PublishDialogProps {
  open: boolean;
  onClose: () => void;
  messages: Message[];
  model: AIModel;
}

export default function PublishDialog({ open, onClose, messages, model }: PublishDialogProps) {
  const { t } = useI18n();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [wikiId, setWikiId] = useState('');

  if (!open) return null;

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const question = messages.find((m) => m.role === 'user')?.content || '';
      const res = await fetch('/api/wiki', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          question,
          content: '',
          summary: '',
          tags: tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
          aiModel: model,
          conversation: messages,
        }),
      });

      if (!res.ok) throw new Error('Failed to publish');
      const data = await res.json();
      setWikiId(data.id);
      setPublished(true);
    } catch (error) {
      console.error('Publish error:', error);
      alert('Failed to publish wiki. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {published ? t('publish.success') : t('publish.title')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {published ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <BookPlus className="h-8 w-8 text-green-600" />
            </div>
            <p className="mb-4 text-gray-600">
              {t('publish.successMsg')}
            </p>
            <a
              href={`/wiki/${wikiId}`}
              className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {t('publish.viewWiki')}
            </a>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('publish.titleLabel')}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('publish.titlePlaceholder')}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('publish.tagsLabel')}
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder={t('publish.tagsPlaceholder')}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 rounded-lg bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                {t('publish.hint', { count: messages.length })}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {t('publish.cancel')}
              </button>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {publishing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('publish.publishing')}
                  </>
                ) : (
                  <>
                    <BookPlus className="h-4 w-4" />
                    {t('publish.publishBtn')}
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
