/**
 * Pure tokenization helpers shared by the search runtime (src/lib/search.ts)
 * and the one-shot backfill (scripts/backfill-keywords.ts). No Firestore
 * imports here so scripts can use it without initializing firebase-admin.
 */

// Common words carry no search signal and — because the old substring match
// did `title.includes(kw)` — caused "the"/"is"/"what" to match nearly every
// article (e.g. a "photic sneeze reflex" query surfaced "The Roche Limit").
export const SEARCH_STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'for',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am', 'as', 'by', 'from',
  'with', 'about', 'into', 'than', 'then', 'this', 'that', 'these', 'those',
  'it', 'its', 'i', 'you', 'he', 'she', 'we', 'they', 'do', 'does', 'did',
  'can', 'could', 'would', 'should', 'will', 'what', 'who', 'whom', 'whose',
  'which', 'how', 'why', 'when', 'where', 'there', 'here', 'my', 'your',
]);

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/[^\p{L}\p{N}]+/gu, ''))
    .filter(Boolean);
}

// CJK and Thai don't use spaces, so whitespace tokenization yields nothing
// useful — index character bigrams for those scripts instead. (Hangul is
// space-separated but compound-heavy; bigrams help recall there too.)
const CJK_THAI_RUN = /[぀-ヿ㐀-鿿豈-﫿가-힯฀-๿]+/gu;

export function scriptAwareTokens(s: string): string[] {
  const lower = s.toLowerCase();
  const grams: string[] = [];
  for (const run of lower.match(CJK_THAI_RUN) ?? []) {
    if (run.length === 1) grams.push(run);
    for (let i = 0; i < run.length - 1; i++) grams.push(run.slice(i, i + 2));
  }
  const rest = lower.replace(CJK_THAI_RUN, ' ');
  const words = tokenize(rest).filter((w) => w.length > 1 && !SEARCH_STOPWORDS.has(w));
  return [...words, ...grams];
}

const MAX_INDEXED_KEYWORDS = 30;

/**
 * Tokenized keyword array stored on each wiki doc (`keywords` field) so
 * search can query `array-contains-any` across the WHOLE collection instead
 * of only tags + a recent-doc window. Earlier parts win when the cap is hit,
 * so pass fields in priority order (title first).
 */
export function buildSearchKeywords(parts: Array<string | undefined>): string[] {
  const seen = new Set<string>();
  for (const part of parts) {
    if (!part) continue;
    for (const tok of scriptAwareTokens(part)) {
      if (seen.size >= MAX_INDEXED_KEYWORDS) return [...seen];
      seen.add(tok);
    }
  }
  return [...seen];
}
