/**
 * Top up content/backlog.ts to a TARGET number of `pending` topics with fresh,
 * non-duplicate, AI-suggested evergreen questions — so the daily auto-author
 * cron never idles for lack of topics. Self-capping: only adds when pending is
 * below target, never repeats an existing topicKey, and adds at most MAX_ADD
 * per run.
 *
 * Needs ANTHROPIC_API_KEY (in .env.local or the workflow env). Pure text edit —
 * no Firestore.
 *
 * Usage:
 *   npx tsx scripts/suggest-topics.ts                 # dry-run
 *   npx tsx scripts/suggest-topics.ts --apply         # append to backlog.ts
 *   npx tsx scripts/suggest-topics.ts --apply --target=12
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config } from 'dotenv';
import { getAIStream } from '../src/lib/ai/provider';
import { backlog } from '../content/backlog';

config({ path: '.env.local', override: true });

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
function flag(n: string): string | undefined {
  const a = args.find((x) => x.startsWith(`--${n}=`));
  return a ? a.slice(n.length + 3) : undefined;
}
const TARGET = Math.min(30, Math.max(1, Number(flag('target') ?? 12) || 12));
const MAX_ADD = 10; // never append more than this in one run

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const backlogPath = join(root, 'content', 'backlog.ts');

const CLUSTERS = [
  'digital-buying', 'personal-finance', 'health-basics', 'digital-security',
  'home-energy', 'careers-work', 'cooking-science', 'everyday-science',
  'learning-productivity', 'dev-practices',
];

interface Suggestion { topicKey: string; question: string; cluster: string }

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
}

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

async function main(): Promise<void> {
  const pending = backlog.filter((t) => t.status === 'pending').length;
  const need = Math.min(MAX_ADD, TARGET - pending);
  console.log(`▸ pending=${pending} target=${TARGET} → need ${Math.max(0, need)}${APPLY ? '' : ' (DRY RUN)'}`);
  if (need <= 0) {
    console.log('backlog already has enough pending topics — nothing to add.');
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY missing — set it in .env.local or the workflow env.');
    process.exit(1);
  }

  const existing = new Set(backlog.map((t) => t.topicKey.toLowerCase()));
  const existingList = backlog.map((t) => `- ${t.topicKey}: ${t.question}`).join('\n');

  const prompt = `You curate topics for GPTwiki, a practical Q&A encyclopedia of evergreen "how-to / which-should-I-choose / is-X-worth-it" questions people actually search for. Suggest ${need} NEW topics across varied domains.

Rules:
- Broadly searched, evergreen, decision- or how-to-shaped. Not news, not niche, not time-sensitive.
- MUST NOT duplicate or closely overlap any existing topic listed below.
- Spread across different clusters; don't cluster them all in one domain.
- topicKey: short kebab-case slug (e.g. "two-factor-authentication").
- question: one clear, specific question a real person would ask.
- cluster: exactly one of: ${CLUSTERS.join(', ')}.

Existing topics (do NOT repeat or paraphrase these):
${existingList}

Return ONLY a JSON array, no prose, no code fences:
[{"topicKey":"...","question":"...","cluster":"..."}]`;

  const raw = await collect(getAIStream('claude', [{ id: 's', role: 'user', content: prompt, timestamp: Date.now() }]));
  const m = raw.match(/\[[\s\S]*\]/);
  if (!m) {
    console.error('no JSON array in model response');
    process.exit(1);
  }
  let suggestions: Suggestion[];
  try {
    suggestions = JSON.parse(m[0]) as Suggestion[];
  } catch (err) {
    console.error('JSON parse failed:', (err as Error).message);
    process.exit(1);
  }

  const seen = new Set(existing);
  const fresh: Suggestion[] = [];
  for (const s of suggestions) {
    if (!s || typeof s.topicKey !== 'string' || typeof s.question !== 'string') continue;
    const key = slug(s.topicKey);
    const q = s.question.trim();
    if (!key || seen.has(key) || !q || q.length > 200) continue;
    const cluster = CLUSTERS.includes(slug(s.cluster || '')) ? slug(s.cluster) : 'everyday-science';
    seen.add(key);
    fresh.push({ topicKey: key, question: q, cluster });
    if (fresh.length >= need) break;
  }

  if (!fresh.length) {
    console.log('model returned no fresh, non-duplicate topics.');
    return;
  }
  for (const f of fresh) console.log(`  + ${f.topicKey} [${f.cluster}] — ${f.question}`);

  if (!APPLY) {
    console.log(`(dry run) would append ${fresh.length} topic(s) to content/backlog.ts`);
    return;
  }

  let src = readFileSync(backlogPath, 'utf8');
  const marker = '  // Seeded to production';
  const idx = src.indexOf(marker);
  if (idx < 0) {
    console.error('could not find the backlog insertion marker');
    process.exit(1);
  }
  const block = fresh
    .map((f) => `  { topicKey: '${f.topicKey}', question: ${JSON.stringify(f.question)}, cluster: '${f.cluster}', locales: ['en', 'zh'], status: 'pending' },\n`)
    .join('');
  src = src.slice(0, idx) + block + src.slice(idx);
  writeFileSync(backlogPath, src);
  console.log(`✓ appended ${fresh.length} pending topic(s) to content/backlog.ts`);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
