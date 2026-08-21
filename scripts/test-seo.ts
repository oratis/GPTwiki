/**
 * Tests for src/lib/seo.ts — the structured-data builders on the article page
 * and the mirror-page noindex switch.
 *
 * The FAQ extractor runs over every article body, so the cases below are the
 * shapes that actually occur in content/: the en/fr/de/it clusters end
 * questions with "?", the ja clusters with full-width "？", and answers can
 * carry inline links and code that must not leak into Answer.text. The
 * serializer case is the one that matters for safety: `</script>` inside
 * article text must not end the JSON-LD element.
 *
 * Run with `npm test`.
 */
import assert from 'node:assert/strict';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  extractFaq,
  isWikipediaSourced,
  mirrorPagesNoindexed,
  serializeJsonLd,
} from '../src/lib/seo';

let failures = 0;
let run = 0;

function test(name: string, fn: () => void): void {
  run++;
  try {
    fn();
    console.log(`  ok  ${name}`);
  } catch (err) {
    failures++;
    console.error(`FAIL  ${name}`);
    console.error(`      ${(err as Error).message.split('\n').join('\n      ')}`);
  }
}

console.log('\nseo: FAQ extraction');

test('extracts bold-question / answer pairs from a ## FAQ section', () => {
  const faq = extractFaq(
    [
      '## Body',
      'Some text with **bold** inside.',
      '',
      '## FAQ',
      '**Is it safe?**',
      'Yes, when used as directed.',
      'Second line of the same answer.',
      '',
      '**How long does it last?**',
      'About **two** years.',
      '',
      '## Sources',
      '**Not a question?** this is under another heading',
    ].join('\n')
  );
  assert.deepEqual(faq, [
    { question: 'Is it safe?', answer: 'Yes, when used as directed. Second line of the same answer.' },
    { question: 'How long does it last?', answer: 'About two years.' },
  ]);
});

test('full-width ？ (ja clusters) is a question terminator too', () => {
  const faq = extractFaq('## FAQ\n**安全ですか？**\nはい。\n');
  assert.deepEqual(faq, [{ question: '安全ですか？', answer: 'はい。' }]);
});

test('"Frequently Asked Questions" heading is accepted, case-insensitively', () => {
  assert.equal(extractFaq('## frequently asked questions\n**Why?**\nBecause.').length, 1);
});

test('returns [] when there is no FAQ section or no parsable questions', () => {
  assert.deepEqual(extractFaq(''), []);
  assert.deepEqual(extractFaq('# Title\n\nNo faq here.'), []);
  assert.deepEqual(extractFaq('## FAQ\nJust prose, no bold questions.'), []);
});

test('a question with no answer text is dropped', () => {
  assert.deepEqual(extractFaq('## FAQ\n**Orphan?**\n\n**Kept?**\nYes.'), [
    { question: 'Kept?', answer: 'Yes.' },
  ]);
});

test('inline links, code, images and emphasis are reduced to visible text', () => {
  const [item] = extractFaq(
    '## FAQ\n**Where is the `config`?**\nSee [the docs](https://example.com/x) and ![diagram](img.png) — *really*.'
  );
  assert.equal(item.question, 'Where is the config?');
  assert.equal(item.answer, 'See the docs and diagram — really.');
});

test('caps at 10 items and 1000 answer characters', () => {
  const many = Array.from({ length: 14 }, (_, i) => `**Q${i}?**\n${'a'.repeat(1200)}`).join('\n');
  const faq = extractFaq(`## FAQ\n${many}`);
  assert.equal(faq.length, 10);
  assert.equal(faq[0].answer.length, 1000);
});

console.log('\nseo: JSON-LD builders');

test('buildFaqJsonLd is null for no items and FAQPage otherwise', () => {
  assert.equal(buildFaqJsonLd([]), null);
  const ld = buildFaqJsonLd([{ question: 'Q?', answer: 'A.' }]) as Record<string, unknown>;
  assert.equal(ld['@type'], 'FAQPage');
  assert.deepEqual(ld.mainEntity, [
    { '@type': 'Question', name: 'Q?', acceptedAnswer: { '@type': 'Answer', text: 'A.' } },
  ]);
});

test('breadcrumbs use the caller-supplied localized names, in order', () => {
  const ld = buildBreadcrumbJsonLd('ja', 'abc', '記事', { home: 'GPTwiki', wiki: 'Wikiを見る' }) as {
    itemListElement: { position: number; name: string; item: string }[];
  };
  assert.deepEqual(
    ld.itemListElement.map((e) => [e.position, e.name, e.item]),
    [
      [1, 'GPTwiki', 'https://gptwiki.net/ja'],
      [2, 'Wikiを見る', 'https://gptwiki.net/ja/wiki'],
      [3, '記事', 'https://gptwiki.net/ja/wiki/abc'],
    ]
  );
});

test('serializeJsonLd cannot be broken out of with </script>', () => {
  const out = serializeJsonLd({ text: 'x</script><script>alert(1)</script>' });
  assert.ok(!out.includes('</script>'), out);
  assert.ok(!out.includes('<'), out);
  assert.deepEqual(JSON.parse(out), { text: 'x</script><script>alert(1)</script>' });
});

console.log('\nseo: mirror noindex switch');

/** Run `fn` with NOINDEX_WIKIPEDIA_MIRRORS set (or unset), then restore it. */
function withFlag(value: string | undefined, fn: () => void): void {
  const previous = process.env.NOINDEX_WIKIPEDIA_MIRRORS;
  if (value === undefined) delete process.env.NOINDEX_WIKIPEDIA_MIRRORS;
  else process.env.NOINDEX_WIKIPEDIA_MIRRORS = value;
  try {
    fn();
  } finally {
    if (previous === undefined) delete process.env.NOINDEX_WIKIPEDIA_MIRRORS;
    else process.env.NOINDEX_WIKIPEDIA_MIRRORS = previous;
  }
}

test('off unless the env var is explicitly truthy', () => {
  for (const v of [undefined, '', 'false', '0', 'no']) {
    withFlag(v, () => assert.equal(mirrorPagesNoindexed(), false, JSON.stringify(v)));
  }
});

test('1 / true / yes flip it, in any case, with surrounding whitespace', () => {
  for (const v of ['1', 'true', 'TRUE', 'True', 'yes', 'YES', ' true ']) {
    withFlag(v, () => assert.equal(mirrorPagesNoindexed(), true, JSON.stringify(v)));
  }
});

test('isWikipediaSourced matches the wikipedia-* source family only', () => {
  assert.equal(isWikipediaSourced('wikipedia-en-dump'), true);
  assert.equal(isWikipediaSourced('wikipedia'), true);
  assert.equal(isWikipediaSourced('grokipedia'), false);
  assert.equal(isWikipediaSourced(undefined), false);
});

console.log(`\n${run - failures}/${run} passed`);
if (failures) process.exit(1);
