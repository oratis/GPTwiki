/**
 * SEO helpers for the GTM "safe SEO + hedge" plan (docs/gtm-plan-2026H2.md §2.1, §5.1):
 * structured data (FAQPage, BreadcrumbList) and the emergency noindex switch
 * for mirrored Wikipedia pages.
 */

const BASE_URL = 'https://gptwiki.net';

/**
 * Emergency kill-switch for the Wikipedia mirror pages. The owner chose to keep
 * them indexed (decision 2026-06-25), but if Google flags the site for
 * scaled-content abuse, flipping NOINDEX_WIKIPEDIA_MIRRORS=true noindexes every
 * `source: wikipedia-*` article at once without a redeploy of content. Default
 * off → mirrors stay indexed.
 */
export function mirrorPagesNoindexed(): boolean {
  return process.env.NOINDEX_WIKIPEDIA_MIRRORS === 'true';
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

  // A question is a whole line in bold ending with "?". Everything up to the
  // next such line is its answer. (Matching whole lines avoids being fooled by
  // bold emphasis inside answer text.)
  const questionLine = /^\s*\*\*(.+?\?)\*\*\s*$/;
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
  const answer = c.answer
    .join(' ')
    .replace(/\*\*(.+?)\*\*/g, '$1') // strip bold
    .replace(/\*(.+?)\*/g, '$1') // strip italics
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1000);
  return { question: c.question, answer };
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

/** BreadcrumbList JSON-LD: Home › Wiki › <title>. */
export function buildBreadcrumbJsonLd(
  locale: string,
  id: string,
  title: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Wiki', item: `${BASE_URL}/${locale}/wiki` },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${BASE_URL}/${locale}/wiki/${id}`,
      },
    ],
  };
}
