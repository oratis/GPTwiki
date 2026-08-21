'use client';

import { useState } from 'react';
import { Mail, Check, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

/**
 * Newsletter email capture. Rendered in the footer so it appears on every page.
 * Posts to /api/subscribe; nothing is instrumented here — the event taxonomy in
 * docs/analytics-plan-2026-08-21.md puts `waitlist_joined`-style events on the
 * server, and its ingest layer does not exist yet.
 */
export default function EmailSubscribe() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading' || !email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        setStatus('error');
        return;
      }
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <p className="flex items-center gap-1.5 text-sm font-medium text-green-700">
        <Check className="h-4 w-4" />
        {t('newsletter.success')}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-sm flex-col gap-1.5">
      <label htmlFor="newsletter-email" className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
        <Mail className="h-4 w-4 text-blue-600" />
        {t('newsletter.title')}
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletter.placeholder')}
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : t('newsletter.button')}
        </button>
      </div>
      {status === 'error' && <p className="text-xs text-red-600">{t('newsletter.error')}</p>}
    </form>
  );
}
