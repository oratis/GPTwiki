/**
 * Auto-author (Phase 1): backlog question → AI draft → `content/auto-draft.en.ts`.
 *
 * This is the DRAFTING half of the auto-content pipeline (see
 * docs/auto-content-cron-plan.md). It deliberately does NOT touch Firestore:
 * it only writes a reviewable `content/*.ts` file for a human to merge, after
 * which the existing seeder publishes it. The human merge is the quality gate.
 *
 * It reuses generateWikiContent() but ADAPTS its output, because that helper is
 * shaped for user-driven chat-publish, not the editorial DraftArticle schema:
 *   - it returns no `question`   → filled from the backlog topic
 *   - it returns no `topicKey`   → filled from the backlog topic
 *   - it returns no `language`   → forced to 'en' (English-first by design)
 *   - `content` may lack a `# `  → an H1 is prepended when missing
 *   - `summary` can be 1000 chars → trimmed to ≤320 (validateDraft's cap)
 *   - `tags` can be 10           → trimmed to ≤8
 * Its JSON-parse fallback (provider.ts) dumps the raw model response, so every
 * draft passes a quality gate and weak generations are SKIPPED, never written.
 *
 * Each topic is emitted as BOTH an English and a Simplified-Chinese DraftArticle
 * (shared topicKey) plus an editorial image prompt, so a single
 * `seed-editorial --batch=auto-draft --apply` run publishes en+zh and generates
 * one shared hero image per topic. zh is best-effort: if translation fails, the
 * English draft still ships.
 *
 * With --apply it writes TWO files: the carrier (reviewed via PR) and
 * content/backlog.ts, flipping the topics it drafted `pending` → `drafted` so
 * the next run advances instead of re-drafting the same head of the queue. See
 * markDrafted() — the backlog mark must reach main immediately, not via the PR.
 *
 * Usage:
 *   npx tsx scripts/auto-author.ts                 # dry-run (writes nothing)
 *   npx tsx scripts/auto-author.ts --apply         # write carrier + advance backlog
 *   npx tsx scripts/auto-author.ts --apply --limit=2
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config } from 'dotenv';
import { generateWikiContent, getAIStream } from '../src/lib/ai/provider';
import { pendingTopics, setTopicStatus, type BacklogTopic } from '../content/backlog';
import { verifySources } from './lib/source-health';
import { EDITORIAL_STYLE as STYLE } from '../content/editorial-style';
import type { DraftArticle } from '../content/types';
import type { AIModel, Message } from '../src/types';

config({ path: '.env.local', override: true });

// ─── CLI ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
function flag(name: string): string | undefined {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a ? a.slice(name.length + 3) : undefined;
}

// Hard cost cap: a leaked trigger or a bad --limit must not fan out. Each draft
// is one model call; keep runs small and reviewable.
const HARD_CAP = 5;
// Minimum citations that must survive the dead-link check for a draft to ship.
// GPTwiki's premise is "AI answers, with citations"; an article whose sources
// all 404 is worse than no article, because it reads as sourced.
const MIN_LIVE_SOURCES = 2;
const LIMIT = Math.min(HARD_CAP, Math.max(1, Number(flag('limit') ?? 3) || 3));
const MODEL = (flag('model') ?? 'claude') as AIModel;

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT_PATH = join(ROOT, 'content', 'auto-draft.en.ts');
const BACKLOG_PATH = join(ROOT, 'content', 'backlog.ts');

// ─── Adapters (close the generateWikiContent → DraftArticle gap) ───────────
/** Trim to ≤320 chars on a word boundary (validateDraft rejects longer). */
function clampSummary(s: string): string {
  const t = s.trim();
  if (t.length <= 320) return t;
  const cut = t.slice(0, 300);
  const at = cut.lastIndexOf(' ');
  return `${(at > 200 ? cut.slice(0, at) : cut).trim()}…`;
}

/** DraftArticle.content must start with "# " — prepend an H1 if the model didn't. */
function ensureH1(content: string, title: string): string {
  const t = content.trim();
  return /^#\s/.test(t) ? t : `# ${title}\n\n${t}`;
}

/**
 * Editorial directives appended to the topic question before generation.
 *
 * The model's knowledge has a cutoff, but the article does not say so, and the
 * generator was writing time-sensitive numbers as though they were current: the
 * published roth-vs-traditional-ira article gives 2024 IRA contribution limits
 * with no year on them, and led-vs-incandescent-math quoted a DOE forecast that
 * had already been superseded.
 *
 * The fix is NOT to tell the model today's date and hope for fresher numbers —
 * it does not have them, and inviting it to produce current-year figures it
 * never saw is asking for fabrication. It is to make the vintage explicit, so a
 * reader (and the reviewer) can see how old a figure is and judge it. A
 * labelled 2024 limit is useful; an unlabelled one silently rots.
 */
function editorialDirectives(today: string): string {
  return [
    `Editorial requirements for this article (today's date is ${today}):`,
    '',
    '1. Any figure that changes over time — prices, tax limits, rates, statistics,',
    '   forecasts, product availability — MUST carry the year it applies to, in the',
    '   sentence or the table header. Write "the 2024 limit was $7,000", never',
    '   "the limit is $7,000".',
    '2. Do NOT invent current-year figures. If your most recent reliable data is',
    '   older than today, give that figure WITH its year and say it may have',
    '   changed. A clearly-dated older number is correct; an undated guess is not.',
    '3. Do not describe a product, standard or programme as current if you are not',
    '   confident it still exists. Prefer naming the category over a brand that may',
    '   have been discontinued.',
    '4. Keep every number internally consistent. If you state a rate and then build',
    '   a table from it, compute the table at that exact rate and say so.',
    '5. Cite only URLs you are confident resolve today. A citation that 404s is',
    '   worse than no citation. Prefer stable landing pages over deep links.',
  ].join('\n');
}

/** Reject weak/garbage generations (incl. provider's raw-dump fallback path).
 *  Structural only — citation health is checked separately in main(), because
 *  it needs the network. */
function isWeak(g: { title: string; content: string; summary: string }, topic: BacklogTopic): string | null {
  if (!/(^|\n)#{1,3}\s/.test(g.content)) return 'no markdown headings';
  if (g.content.trim().length < 400) return 'content too short';
  if (g.summary.trim().length < 20) return 'summary too short';
  // provider's fallback sets title = question.slice(0,100).
  if (topic.question.startsWith(g.title.slice(0, 40))) return 'title looks like the raw question';
  return null;
}

interface Zh { title: string; question: string; summary: string; content: string; tags: string[] }

async function collect(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  return out;
}

function imagePrompt(title: string): string {
  return `A clean, conceptual editorial illustration for an encyclopedia article titled "${title}". ${STYLE}`;
}

/** Translate an English draft to Simplified Chinese. Marker-delimited (not JSON)
 *  because long Markdown bodies break JSON string escaping. */
async function translateToZh(en: Zh): Promise<Zh> {
  const system = `You are a professional encyclopedia translator. Translate the article below from English into Simplified Chinese (zh). Preserve all Markdown structure exactly (headings, tables, lists, inline code, links). Keep technical terms accurate; keep well-known acronyms (USB-C, VPN, ETF) as-is where natural. Do NOT translate URLs. Keep the summary under 300 Chinese characters.

Return your translation in EXACTLY this format, nothing else — no preamble, no code fences:
<<<TITLE>>>
(translated title, one line)
<<<QUESTION>>>
(translated question, one line)
<<<SUMMARY>>>
(translated summary)
<<<TAGS>>>
(comma-separated translated tags)
<<<CONTENT>>>
(the full translated Markdown article, starting with "# ")`;
  const payload = `Title: ${en.title}\nQuestion: ${en.question}\nSummary: ${en.summary}\nTags: ${en.tags.join(', ')}\n\nArticle:\n${en.content}`;
  const raw = await collect(getAIStream('claude', [{ id: 'z', role: 'user', content: `${system}\n\n---\n${payload}`, timestamp: Date.now() }]));
  const pick = (a: string, b: string): string => {
    const i = raw.indexOf(a);
    if (i < 0) return '';
    const start = i + a.length;
    const end = b ? raw.indexOf(b, start) : -1;
    return raw.slice(start, end < 0 ? raw.length : end).trim();
  };
  const title = pick('<<<TITLE>>>', '<<<QUESTION>>>');
  const summary = pick('<<<SUMMARY>>>', '<<<TAGS>>>');
  const content = pick('<<<CONTENT>>>', '');
  if (!title || !content || !summary) throw new Error('missing markers');
  if (!content.startsWith('# ')) throw new Error('lost H1');
  return {
    title,
    question: pick('<<<QUESTION>>>', '<<<SUMMARY>>>') || en.question,
    summary: summary.slice(0, 320),
    content,
    tags: pick('<<<TAGS>>>', '<<<CONTENT>>>').split(',').map((t) => t.trim()).filter(Boolean).slice(0, 8),
  };
}

async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i === attempts - 1) break;
      console.warn(`    ↻ retry ${i + 1}/${attempts - 1} ${label}: ${(err as Error).message?.slice(0, 120)}`);
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw lastErr;
}

function serialize(drafts: DraftArticle[], iso: string): string {
  return (
    `import type { DraftArticle } from './types';\n\n` +
    `// AUTO-GENERATED by scripts/auto-author.ts on ${iso}. REVIEW facts + sources\n` +
    `// before seeding. Each run OVERWRITES this file (a transient carrier). Seed:\n` +
    `//   npx tsx scripts/seed-editorial.ts --batch=auto-draft --apply\n\n` +
    `export const autoDraftEn: DraftArticle[] = ${JSON.stringify(drafts, null, 2)};\n`
  );
}

/**
 * Advance the queue: flip the topics this run actually drafted from `pending`
 * to `drafted` in content/backlog.ts, so the next run picks the NEXT topics.
 *
 * Without this the drafter re-drafts the same head-of-queue topics every day —
 * pendingTopics() is `filter(status==='pending').slice(0, LIMIT)`, so nothing
 * moves until something writes the status back. (That regression ran from
 * 2026-07-11 to 2026-08-21: 42 identical daily PRs, all three same topics.)
 *
 * Only topics that PASSED the quality gate are marked; a topic whose generation
 * failed or was skipped as weak stays `pending` and is retried tomorrow.
 *
 * The caller must push this to main straight away, NOT via the drafts PR — the
 * next cron run checks out main, so a mark that waits for review advances
 * nothing. `content/backlog.ts` is in no workflow's trigger paths, so that push
 * starts no loop.
 */
function markDrafted(keys: string[]): number {
  let src = readFileSync(BACKLOG_PATH, 'utf8');
  let marked = 0;
  for (const k of keys) {
    const next = setTopicStatus(src, k, ['pending'], 'drafted');
    if (next !== null) {
      src = next;
      marked++;
    }
  }
  if (marked) writeFileSync(BACKLOG_PATH, src);
  return marked;
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const topics = pendingTopics(LIMIT);
  console.log(`▸ model=${MODEL} limit=${LIMIT} pending=${topics.length}${APPLY ? '' : ' (DRY RUN)'}`);
  if (!topics.length) {
    console.log('Nothing pending in content/backlog.ts — done.');
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY && MODEL === 'claude') {
    console.error('ANTHROPIC_API_KEY missing — set it in .env.local or the workflow env.');
    process.exit(1);
  }

  const drafts: DraftArticle[] = [];
  let zhCount = 0;
  for (const topic of topics) {
    const today = new Date().toISOString().slice(0, 10);
    const convo: Message[] = [
      { id: 'q', role: 'user', content: topic.question, timestamp: Date.now() },
      // Appended as a second turn rather than folded into generateWikiContent's
      // system prompt: that helper is shared with the user-facing chat-publish
      // path, and this is editorial policy for the auto-content pipeline only.
      // sanitizeGenerated()'s fallbacks read conversation[0], which is untouched.
      { id: 'editorial', role: 'user', content: editorialDirectives(today), timestamp: Date.now() },
    ];
    let g;
    try {
      g = await withRetry(`generate ${topic.topicKey}`, () => generateWikiContent(MODEL, convo));
    } catch (err) {
      console.log(`  ✗ ${topic.topicKey}: generation failed — ${(err as Error).message?.slice(0, 120)}`);
      continue;
    }

    const weak = isWeak(g, topic);
    if (weak) {
      console.log(`  ⏭  ${topic.topicKey}: skipped (${weak})`);
      continue;
    }

    // Citations are checked against the live web before the draft can ship.
    // The model invents plausible-looking URLs: PR #138 shipped 7 dead links
    // out of 14, including one article whose every source 404'd. Only servers
    // that positively disclaim the resource (404/410) count against it —
    // paywalls and bot-blocks are real pages and are kept.
    let sources = g.sources;
    if (sources.length) {
      const { kept, dropped } = await verifySources(sources);
      if (dropped.length) {
        console.log(`  ⚠ ${topic.topicKey}: dropped ${dropped.length} dead source(s):`);
        for (const d of dropped) console.log(`      ✗ ${d.url}`);
      }
      sources = kept;
    }
    if (sources.length < MIN_LIVE_SOURCES) {
      console.log(
        `  ⏭  ${topic.topicKey}: skipped (only ${sources.length} live source(s), need ${MIN_LIVE_SOURCES})`
      );
      continue;
    }

    const prompt = imagePrompt(g.title);
    const en: DraftArticle = {
      topicKey: topic.topicKey,
      title: g.title,
      question: topic.question,
      summary: clampSummary(g.summary),
      tags: g.tags.slice(0, 8),
      language: 'en',
      content: ensureH1(g.content, g.title),
      image: { prompt, alt: g.title },
      ...(sources.length ? { sources } : {}),
    };
    drafts.push(en);

    // zh is best-effort — the English draft still ships if translation fails.
    try {
      const zh = await withRetry(`translate ${topic.topicKey}`, () =>
        translateToZh({ title: en.title, question: en.question, summary: en.summary, content: en.content, tags: en.tags })
      );
      drafts.push({
        topicKey: topic.topicKey,
        title: zh.title,
        question: zh.question,
        summary: zh.summary,
        tags: zh.tags,
        language: 'zh',
        content: zh.content,
        image: { prompt, alt: zh.title },
        ...(sources.length ? { sources } : {}),
      });
      zhCount++;
      console.log(`  ✓ ${topic.topicKey}: "${g.title}" (+zh, ${sources.length} live sources)`);
    } catch (err) {
      console.log(`  ✓ ${topic.topicKey}: "${g.title}" (en only — zh failed: ${(err as Error).message?.slice(0, 60)})`);
    }
  }

  console.log(`\n▸ drafted ${drafts.length} docs from ${topics.length} topics (${zhCount} with zh)`);
  if (!drafts.length) {
    console.log('No drafts passed the quality gate — nothing written.');
    return;
  }

  if (!APPLY) {
    console.log(`(dry run) would write ${OUT_PATH}. Re-run with --apply to write it.`);
    return;
  }

  writeFileSync(OUT_PATH, serialize(drafts, new Date().toISOString()));
  console.log(`✓ wrote ${OUT_PATH}`);

  // Advance the queue so tomorrow's run drafts the NEXT topics, not these again.
  const drafted = [...new Set(drafts.map((d) => d.topicKey).filter((k): k is string => !!k))];
  const marked = markDrafted(drafted);
  console.log(`✓ marked ${marked}/${drafted.length} topic(s) drafted in ${BACKLOG_PATH}`);
  if (marked < drafted.length) {
    console.warn('  ! some topics did not match a `status: \'pending\'` line — check content/backlog.ts formatting');
  }

  console.log('Next: open a PR, review, merge, then seed with');
  console.log('  npx tsx scripts/seed-editorial.ts --batch=auto-draft --apply');
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
