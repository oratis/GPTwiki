// Shape of a publish-ready draft article. Mirrors the seed `entries` format
// (src/app/api/seed/route.ts): ingestion adds authorId/authorName/aiModel/
// conversation/views/timestamps/source. `language` drives the per-locale
// category + popular/recent filtering. All prose here is original (no copied
// source text).
export interface DraftArticle {
  /** Article title — also the de-dup key at seed time. */
  title: string;
  /** The question that frames the article (shown as "Original Question"). */
  question: string;
  /** Full article body in Markdown. */
  content: string;
  /** 1–2 sentence summary (used for cards, meta description, OG subtitle). */
  summary: string;
  /** Lowercase category/keyword tags. */
  tags: string[];
  /** ISO 639-1 content language (one of the 15 supported locales). */
  language: DraftLanguage;
  /**
   * Stable key shared by all language variants of one topic. The editorial
   * seeder (scripts/seed-editorial.ts) generates ONE hero image per topicKey
   * and reuses it across variants — mirrors how translate-wikis.ts copies
   * image fields verbatim.
   */
  topicKey?: string;
  /** Seedream hero-image spec; `alt` doubles as the rendered caption. */
  image?: {
    /** English text-to-image prompt (shared per topicKey; first one wins). */
    prompt: string;
    /** Alt/caption text in the article's own language. */
    alt: string;
  };
  /** External references rendered as the article's References section. */
  sources?: { title: string; url: string }[];
}

export type DraftLanguage =
  | 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'pt'
  | 'ru' | 'ar' | 'hi' | 'it' | 'tr' | 'vi' | 'th';
