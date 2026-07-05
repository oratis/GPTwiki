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
 * Usage:
 *   npx tsx scripts/auto-author.ts                 # dry-run (no file written)
 *   npx tsx scripts/auto-author.ts --apply         # write content/auto-draft.en.ts
 *   npx tsx scripts/auto-author.ts --apply --limit=2
 */

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config } from 'dotenv';
import { generateWikiContent, getAIStream } from '../src/lib/ai/provider';
import { pendingTopics, type BacklogTopic } from '../content/backlog';
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
const LIMIT = Math.min(HARD_CAP, Math.max(1, Number(flag('limit') ?? 3) || 3));
const MODEL = (flag('model') ?? 'claude') as AIModel;

const OUT_PATH = join(dirname(dirname(fileURLToPath(import.meta.url))), 'content', 'auto-draft.en.ts');

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

/** Reject weak/garbage generations (incl. provider's raw-dump fallback path). */
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
    const convo: Message[] = [{ id: 'q', role: 'user', content: topic.question, timestamp: Date.now() }];
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
      ...(g.sources.length ? { sources: g.sources } : {}),
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
        ...(g.sources.length ? { sources: g.sources } : {}),
      });
      zhCount++;
      console.log(`  ✓ ${topic.topicKey}: "${g.title}" (+zh, ${g.sources.length} sources)`);
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
  console.log('Next: open a PR, review, merge, then seed with');
  console.log('  npx tsx scripts/seed-editorial.ts --batch=auto-draft --apply');
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
