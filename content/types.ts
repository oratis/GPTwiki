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
  /** ISO 639-1 content language. */
  language: 'en';
}
