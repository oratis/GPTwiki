'use client';

import { useEffect, useRef } from 'react';

/**
 * Fires a single embed-impression beacon when the card renders inside a host
 * page's iframe. Uses sendBeacon (survives the page being navigated away) and
 * falls back to a keepalive fetch. Renders nothing.
 *
 * The endpoint forwards to GA4 server-side, so no Google script is loaded into
 * third-party pages. See src/app/api/embed-impression/route.ts.
 */
export default function EmbedImpressionBeacon({ wikiId }: { wikiId: string }) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    const url = '/api/embed-impression';
    const body = JSON.stringify({ wikiId });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
      } else {
        void fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        });
      }
    } catch {
      // Best-effort: a failed impression beacon must never break the card.
    }
  }, [wikiId]);

  return null;
}
