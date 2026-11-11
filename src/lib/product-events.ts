type ProductEvent =
  | 'question_submitted' | 'answer_received' | 'question_denied'
  | 'wiki_published' | 'followup_published' | 'battle_voted'
  | 'newsletter_submitted' | 'waitlist_joined' | 'author_followed';
type Surface = 'chat' | 'article' | 'arena' | 'footer' | 'profile';
type Denial = 'API_KEY_REQUIRED' | 'QUOTA_EXHAUSTED';

declare global {
  interface Window {
    gtag?: (command: 'event', event: ProductEvent, params: { surface: Surface; reason?: Denial }) => void;
    dataLayer?: unknown[];
  }
}

export function trackProductEvent(event: ProductEvent, surface: Surface, reason?: Denial) {
  if (!process.env.NEXT_PUBLIC_GA_ID || typeof window === 'undefined') return;
  try {
    const send = window.gtag ?? function () {
      // gtag consumes queued Arguments objects, including before its script has loaded.
      // eslint-disable-next-line prefer-rest-params
      (window.dataLayer ??= []).push(arguments);
    };
    send('event', event, reason ? { surface, reason } : { surface });
  } catch {
    // Browser extensions may disable analytics while allowing the app to run.
  }
}

/** Read denial codes without consuming the response used by chat's UI. */
export async function requestChat(surface: 'chat' | 'article', init: RequestInit) {
  const res = await fetch('/api/chat', init);
  if (res.status === 403 && process.env.NEXT_PUBLIC_GA_ID) {
    const body = await res.clone().json().catch(() => null);
    if (body?.error === 'API_KEY_REQUIRED' || body?.error === 'QUOTA_EXHAUSTED') {
      trackProductEvent('question_denied', surface, body.error);
    }
  }
  return res;
}
