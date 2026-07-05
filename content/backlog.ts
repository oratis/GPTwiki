import type { DraftLanguage } from './types';

// ─── Auto-author backlog ────────────────────────────────────────────────────
// The topic queue scripts/auto-author.ts pulls from. A HUMAN curates the
// `question` + a stable `topicKey`; the generator drafts title/content/summary/
// tags/sources from the question. Keep questions specific and decision/how-to
// shaped — that's the editorial voice the existing clusters use.
//
// status lifecycle:  pending → drafted (a PR exists) → seeded (merged + seeded)
// auto-author picks only `pending`, in order, up to its per-run cap.

export type BacklogStatus = 'pending' | 'drafted' | 'seeded';

export interface BacklogTopic {
  /** Stable slug; becomes the DraftArticle topicKey (shared by future locales). */
  topicKey: string;
  /** The question the article answers (becomes DraftArticle.question). */
  question: string;
  /** Loose cluster label for grouping; need not match a seed batch name. */
  cluster: string;
  /** Locales to eventually cover. auto-author drafts `en` ONLY; locale
   *  expansion stays the existing human-reviewed translate flow. */
  locales: DraftLanguage[];
  status: BacklogStatus;
}

export const backlog: BacklogTopic[] = [
  // Pending — ADD NEW TOPICS HERE as { ..., status: 'pending' }, priority first.
  // Currently empty (all seeded), so the daily cron idles until you add more.
  //
  // Seeded to production (auto-author skips anything not `pending`).
  { topicKey: 'ssd-vs-hdd', question: 'SSD vs HDD — which should I choose, and does the difference still matter?', cluster: 'digital-buying', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'spaced-repetition', question: 'Does spaced repetition really work, and how do I use it?', cluster: 'learning-productivity', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'git-rebase-vs-merge', question: 'Rebase vs merge — which should I use, and when?', cluster: 'dev-practices', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'microwave-nutrients', question: 'Does microwaving food destroy its nutrients or make it unsafe?', cluster: 'everyday-science', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'cast-iron-seasoning', question: 'How does seasoning a cast-iron pan actually work?', cluster: 'cooking-science', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'emergency-fund-size', question: 'How big should my emergency fund really be?', cluster: 'personal-finance', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'salary-negotiation', question: 'How do I negotiate a job offer without blowing it?', cluster: 'careers-work', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'heat-pump-worth-it', question: 'Is a heat pump actually worth switching to?', cluster: 'home-energy', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'standing-desk-worth-it', question: 'Is a standing desk actually better for my health?', cluster: 'health-basics', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'index-funds-vs-etfs', question: 'Index funds vs ETFs — which should I actually pick?', cluster: 'personal-finance', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'vpn-when-needed', question: 'Do I actually need a VPN, and when does it really help?', cluster: 'digital-security', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'passkeys-explained', question: 'What are passkeys, and should I switch away from passwords?', cluster: 'digital-security', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'protein-how-much', question: 'How much protein do I actually need in a day?', cluster: 'health-basics', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'usb-c-vs-thunderbolt', question: 'What is the real difference between USB-C and Thunderbolt, and does it matter for me?', cluster: 'digital-buying', locales: ['en', 'zh'], status: 'seeded' },
  { topicKey: 'wifi-6-worth-it', question: 'Is upgrading to a Wi-Fi 6 or 6E router actually worth it?', cluster: 'digital-buying', locales: ['en', 'zh'], status: 'seeded' },
];

/** Oldest-first pending topics, up to `limit`. */
export function pendingTopics(limit: number): BacklogTopic[] {
  return backlog.filter((t) => t.status === 'pending').slice(0, Math.max(0, limit));
}
