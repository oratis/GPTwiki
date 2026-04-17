'use client';

import { useState } from 'react';
import { Code, Check, Copy } from 'lucide-react';

interface Props {
  wikiId: string;
}

/**
 * "Embed this wiki" dialog. Generates a responsive iframe snippet that
 * third-party blogs/forums can paste to render a GPTwiki card.
 */
export default function EmbedCodeButton({ wikiId }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
        title="Embed this wiki on your site"
      >
        <Code className="h-3.5 w-3.5" />
        Embed
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Embed this wiki</h3>
            <p className="mb-4 text-sm text-gray-600">
              Paste this snippet into any blog or forum to show a preview card linking
              back to GPTwiki.
            </p>
            <pre className="mb-3 max-h-48 overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
              {snippet}
            </pre>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy code
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
