'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Check, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { useToast } from '@/components/ui/Toast';

/**
 * "Pro coming soon" card shown next to the API key manager on the user's own
 * profile. One-click waitlist join — measures willingness to pay before any
 * billing work is built.
 */
export default function ProWaitlistCard() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/waitlist')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setJoined(!!d.joined);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const join = async () => {
    if (joining || joined) return;
    setJoining(true);
    try {
      const res = await fetch('/api/waitlist', { method: 'POST' });
      if (!res.ok) throw new Error('join failed');
      setJoined(true);
    } catch {
      toast(t('chat.error'));
    } finally {
      setJoining(false);
    }
  };

  if (loading) return null;

  return (
    <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
      <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-amber-900">
        <Sparkles className="h-4 w-4 text-amber-500" />
        {t('waitlist.title')}
      </h3>
      <p className="mb-3 text-sm text-amber-800/80">{t('waitlist.description')}</p>
      {joined ? (
        <p className="flex items-center gap-1.5 text-sm font-medium text-green-700">
          <Check className="h-4 w-4" />
          {t('waitlist.joined')}
        </p>
      ) : (
        <button
          onClick={join}
          disabled={joining}
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50 transition-colors"
        >
          {joining ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {t('waitlist.join')}
        </button>
      )}
    </div>
  );
}
