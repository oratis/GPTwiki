type ProductEvent =
  | 'question_submitted' | 'answer_received' | 'question_denied'
  | 'wiki_published' | 'followup_published' | 'battle_voted';
type Surface = 'chat' | 'article' | 'arena';
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
