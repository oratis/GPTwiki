'use client';

import { useState, useEffect } from 'react';
import { Code, Check, Copy } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface Props {
  wikiId: string;
}

/**
 * "Embed this wiki" dialog. Generates a responsive iframe snippet that
 * third-party blogs/forums can paste to render a GPTwiki card.
 */
export default function EmbedCodeButton({ wikiId }: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const snippet = `<iframe
  src="https://gptwiki.net/embed/${wikiId}"
  width="100%"
  height="220"
  frameborder="0"
  loading="lazy"
  title="GPTwiki article"
  style="border:0;border-radius:12px;max-width:640px"></iframe>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        title={t('embed.tooltip')}
        aria-label={t('embed.tooltip')}
      >
        <Code className="h-3.5 w-3.5" />
        {t('embed.button')}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="embed-dialog-title"
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="embed-dialog-title" className="mb-2 text-lg font-semibold text-gray-900">
              {t('embed.heading')}
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              {t('embed.description')}
            </p>
            <pre className="mb-3 max-h-48 overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
              {snippet}
            </pre>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                {t('embed.close')}
              </button>
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" /> {t('share.copied')}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> {t('embed.copyCode')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
