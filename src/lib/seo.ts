/**
 * SEO helpers: structured data (FAQPage, BreadcrumbList) and the emergency
 * noindex switch for mirrored Wikipedia pages.
 *
 * A note on FAQPage: Google restricted FAQ *rich results* to authoritative
 * government and health sites in August 2023, so do not expect expandable
 * Q&A in Google SERPs from this markup. It is emitted for answer engines
 * (GEO) and for any crawler that reads schema.org — that is the value, and
 * it is the only value.
 */

const BASE_URL = 'https://gptwiki.net';

/**
 * Emergency kill-switch for the Wikipedia mirror pages. The owner chose to keep
 * them indexed (decision 2026-06-25), but if Google flags the site for
 * scaled-content abuse, setting NOINDEX_WIKIPEDIA_MIRRORS noindexes every
 * `source: wikipedia-*` article at once without a redeploy of content
 * (`gcloud run services update gptwiki --update-env-vars NOINDEX_WIKIPEDIA_MIRRORS=true`;
 * build-time-prerendered pages lag up to the route's `revalidate`). Default off
 * → mirrors stay indexed.
 *
 * Accepts 1/true/yes case-insensitively: an emergency switch that silently
 * ignores `TRUE` or `1` is worse than no switch.
 */
export function mirrorPagesNoindexed(): boolean {
  const v = process.env.NOINDEX_WIKIPEDIA_MIRRORS?.trim().toLowerCase();
  return v === '1' || v === 'true' || v === 'yes';
}

/** True for articles mirrored from Wikipedia (source like "wikipedia-en-dump"). */
export function isWikipediaSourced(source?: string): boolean {
  return typeof source === 'string' && source.startsWith('wikipedia');
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Extract Q&A pairs from an article's markdown FAQ section so they can be
 * emitted as FAQPage structured data. The editorial content uses a consistent
 * shape: a `## FAQ` heading, then each question as a bold line ending in "?"
 * followed by its answer. Returns [] when there's no recognizable FAQ (e.g.
 * Wikipedia mirrors, freeform user articles), so it's always safe to call.
 */
export function extractFaq(content: string): FaqItem[] {
  if (!content) return [];

  // Isolate the FAQ section: from the FAQ heading to the next "## " heading.
  const heading = content.match(/^##\s+(?:FAQ|Frequently Asked Questions).*$/im);
  if (!heading || heading.index === undefined) return [];
  const after = content.slice(heading.index + heading[0].length);
  const nextHeading = after.search(/^##\s+/m);
  const section = nextHeading === -1 ? after : after.slice(0, nextHeading);

  // A question is a whole line in bold ending with "?" — or the full-width
  // "？" the Japanese clusters use (every ja FAQ article ends its questions
  // that way; with ASCII-only matching they extracted nothing). Everything up
  // to the next such line is its answer. (Matching whole lines avoids being
  // fooled by bold emphasis inside answer text.)
  const questionLine = /^\s*\*\*(.+?[?？])\*\*\s*$/;
  const items: FaqItem[] = [];
  let current: { question: string; answer: string[] } | null = null;

  for (const line of section.split('\n')) {
    const m = line.match(questionLine);
    if (m) {
      if (current) items.push(finalize(current));
      current = { question: m[1].trim(), answer: [] };
    } else if (current) {
      current.answer.push(line);
    }
  }
  if (current) items.push(finalize(current));

  return items.filter((f) => f.question && f.answer).slice(0, 10);
}

function finalize(c: { question: string; answer: string[] }): FaqItem {
  return { question: stripInlineMarkdown(c.question), answer: stripInlineMarkdown(c.answer.join(' ')).slice(0, 1000) };
}

/**
 * Reduce inline markdown to its visible text. `Answer.text` may carry limited
 * HTML but never markdown, so bold/italic markers, link syntax and code
 * backticks all have to go; a raw `[text](url)` in structured data is noise
 * to a crawler and a tell that the markup is mechanical.
 */
function stripInlineMarkdown(s: string): string {
  return s
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images → alt text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → text
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1') // italics
    .replace(/\s+/g, ' ')
    .trim();
}

/** FAQPage JSON-LD, or null when there are no FAQ items. */
export function buildFaqJsonLd(faq: FaqItem[]): object | null {
  if (faq.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/**
 * BreadcrumbList JSON-LD: <home> › <wiki> › <title>. The first two names are
 * the caller's localized strings (`header.brandName`, `header.browseWiki`) —
 * hard-coding "Home" / "Wiki" would emit English crumbs on the other 14
 * locales' pages.
 */
export function buildBreadcrumbJsonLd(
  locale: string,
  id: string,
  title: string,
  names: { home: string; wiki: string }
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: names.home, item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: names.wiki, item: `${BASE_URL}/${locale}/wiki` },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${BASE_URL}/${locale}/wiki/${id}`,
      },
    ],
  };
}

/**
 * Serialize JSON-LD for a `<script type="application/ld+json">` body. A bare
 * `JSON.stringify` is not safe there: the HTML parser ends the script element
 * at the first `</script>` regardless of JSON string context, so any article
 * text containing that sequence would break out of the tag. Escaping `<`
 * closes that door; `\u003c` is valid JSON and parsers decode it back.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
