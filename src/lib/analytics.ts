/**
 * Thin, SSR-safe wrapper over the gtag() that GoogleAnalytics.tsx installs.
 *
 * Every growth event goes through track() so the event taxonomy lives in one
 * place and TypeScript catches typos in event names. These are the funnel and
 * loop events the GTM plan measures (see docs/gtm-plan-2026H2.md §7):
 * register → first question → publish → UGC thread, plus embed, share, and
 * subscribe.
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      name: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export type AnalyticsEvent =
  | 'question_asked' // funnel: user sent a chat message (is_first flags the activation step)
  | 'wiki_published' // funnel: conversation published as an article
  | 'thread_created' // funnel: follow-up thread merged-in fuel (UGC growth)
  | 'share_click' // article shared to a social network / link copied
  | 'embed_copy' // embed iframe snippet copied
  | 'embed_impression' // embed card rendered on a third-party page
  | 'newsletter_subscribe' // email captured for the newsletter
  | 'waitlist_join'; // Pro waitlist joined (willingness-to-pay)

/**
 * Fire a GA4 custom event. No-ops on the server and before gtag has loaded, so
 * it's always safe to call from client components and event handlers.
 */
export function track(event: AnalyticsEvent, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}
