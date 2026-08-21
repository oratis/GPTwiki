/**
 * Translate the auto-authored editorial EN wikis into Simplified Chinese and
 * seed the zh variants. Targets ONLY the specific docs listed in
 * AUTO_EN_DOCS (this session's auto-author output) — never the 100+
 * hand-authored cluster articles.
 *
 * For each EN doc: fetch it, ask Claude to translate title/question/summary/
 * content/tags into zh, and write a new `wikis` doc (language:'zh', same
 * topicKey so a future hero image is shared). Idempotent: skips a topicKey
 * whose zh doc already exists. Also patches the EN doc with `topicKey` if
 * missing, so scripts/backfill-editorial-images.ts can pair en+zh.
 *
 * Reads Firestore via ADC (or FIREBASE_* in .env.local); needs ANTHROPIC_API_KEY
 * in .env.local for the translation calls.
 *
 * Usage:
 *   npx tsx scripts/translate-live.ts                 # dry-run
 *   npx tsx scripts/translate-live.ts --apply         # write zh docs
 *   npx tsx scripts/translate-live.ts --only=vpn-when-needed
 */

import {
  initializeApp,
  cert,
  applicationDefault,
  type ServiceAccount,
} from 'firebase-admin/app';
import { getFirestore, FieldValue, type Firestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import { getAIStream } from '../src/lib/ai/provider';
import { hasHeaderImage } from '../src/lib/header-image';
import { buildSearchKeywords } from '../src/lib/search-keywords';
import { isTypesenseEnabled, toTypesenseDoc, upsertWikiToTypesense } from '../src/lib/typesense';
import type { Message } from '../src/types';

config({ path: '.env.local', override: true });

// ─── The auto-authored EN docs to localize (id → stable topicKey) ──────────
const AUTO_EN_DOCS: { id: string; topicKey: string }[] = [
  { id: 'tGYAW2TouOBT3oe9fAbD', topicKey: 'usb-c-vs-thunderbolt' },
  { id: 'mTO9Nnph8pRW0vBkwVqS', topicKey: 'wifi-6-worth-it' },
  { id: 'R7BS2vrbgeOAFOYniKS7', topicKey: 'index-funds-vs-etfs' },
  { id: 'LdeUxkNxW911hiZQ7hK4', topicKey: 'vpn-when-needed' },
  { id: 'UlohkuEDuqybIFnzEyd3', topicKey: 'passkeys-explained' },
  { id: 'yjrPABsIjXkTk0Gy8LWK', topicKey: 'protein-how-much' },
  { id: 'WA7op4jxNiU2Y7egmYF3', topicKey: 'emergency-fund-size' },
  { id: 'JPdRrnJs5qeJwE2dvPns', topicKey: 'salary-negotiation' },
  { id: 'BmxGm0dJg0JwmtuyHfo0', topicKey: 'heat-pump-worth-it' },
  { id: '3g2TLIiD4YdAQhxkjTCg', topicKey: 'standing-desk-worth-it' },
  { id: 'y0xPGxPcyBXdoc6Wj8cx', topicKey: 'spaced-repetition' },
  { id: 'OdW4ESWtD9gSf8kYC8ap', topicKey: 'git-rebase-vs-merge' },
  { id: 'L5cNNTQCAvPXdZbABQ7v', topicKey: 'microwave-nutrients' },
  { id: 'lTMJWrp8klh7fAWjho6S', topicKey: 'cast-iron-seasoning' },
];

const EDITORIAL_ID = 'gptwiki-editorial';
const EDITORIAL_NAME = 'GPTwiki Editorial';

// ─── CLI ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const onlyArg = args.find((a) => a.startsWith('--only='));
const ONLY = new Set((onlyArg?.slice('--only='.length) ?? '').split(',').filter(Boolean));

// ─── Init ────────────────────────────────────────────────────────────────
function initFirebase() {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'gptwiki';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (clientEmail && privateKey) {
    const sa: ServiceAccount = { projectId, clientEmail, privateKey };
    return initializeApp({ credential: cert(sa), projectId });
  }
  console.log('▸ no FIREBASE_CLIENT_EMAIL/PRIVATE_KEY in env — using ADC');
  return initializeApp({ credential: applicationDefault(), projectId });
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

interface Zh {
  title: string;
  question: string;
  summary: string;
  content: string;
  tags: string[];
}

async function translate(en: {
  title: string;
  question: string;
  summary: string;
  content: string;
  tags: string[];
}): Promise<Zh> {
  // Marker-delimited (NOT JSON): the article body is long Markdown with tables,
  // quotes and newlines that routinely break JSON string escaping.
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
  const messages: Message[] = [
    { id: 't', role: 'user', content: `${system}\n\n---\n${payload}`, timestamp: Date.now() },
  ];
  const raw = await collect(getAIStream('claude', messages));
  const pick = (a: string, b: string): string => {
    const i = raw.indexOf(a);
    if (i < 0) return '';
    const start = i + a.length;
    const end = b ? raw.indexOf(b, start) : -1;
    return raw.slice(start, end < 0 ? raw.length : end).trim();
  };
  const title = pick('<<<TITLE>>>', '<<<QUESTION>>>');
  const question = pick('<<<QUESTION>>>', '<<<SUMMARY>>>');
  const summary = pick('<<<SUMMARY>>>', '<<<TAGS>>>');
  const tags = pick('<<<TAGS>>>', '<<<CONTENT>>>').split(',').map((t) => t.trim()).filter(Boolean).slice(0, 8);
  const content = pick('<<<CONTENT>>>', '');
  if (!title || !content || !summary) throw new Error('translation missing markers');
  if (!content.startsWith('# ')) throw new Error('translated content lost its H1');
  return {
    title,
    question: question || en.question,
    summary: summary.slice(0, 320),
    content,
    tags: tags.length ? tags : en.tags,
  };
}

async function zhSlotTaken(db: Firestore, title: string): Promise<boolean> {
  const snap = await db.collection('wikis').where('title', '==', title).limit(3).get();
  return snap.docs.some((d) => (d.data().language as string) === 'zh');
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  let docs = AUTO_EN_DOCS;
  if (ONLY.size) docs = docs.filter((d) => ONLY.has(d.topicKey));
  console.log(`▸ localize→zh: ${docs.length} docs${APPLY ? '' : ' (DRY RUN)'}`);
  if (APPLY && !process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY missing — add it to .env.local');
    process.exit(1);
  }

  const db = getFirestore(initFirebase());
  const stats = { created: 0, skipped: 0, failed: 0 };

  for (const { id, topicKey } of docs) {
    const ref = db.collection('wikis').doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      console.log(`  ✗ ${topicKey}: EN doc ${id} not found`);
      stats.failed++;
      continue;
    }
    const en = snap.data() as {
      title: string; question: string; summary: string; content: string;
      tags: string[]; imageUrl?: string; imageWidth?: number; imageHeight?: number;
    };

    // Keep en/zh paired for the image step.
    if (APPLY && !snap.data()?.topicKey) {
      await ref.update({ topicKey }).catch(() => {});
    }

    if (await zhSlotTaken(db, en.title)) {
      // title still EN here — real check is post-translation; cheap early-out
    }

    let zh: Zh;
    try {
      zh = await translate(en);
    } catch (err) {
      console.log(`  ✗ ${topicKey}: translation failed — ${(err as Error).message}`);
      stats.failed++;
      continue;
    }

    if (await zhSlotTaken(db, zh.title)) {
      console.log(`  ⏭  ${topicKey}: zh "${zh.title}" already exists`);
      stats.skipped++;
      continue;
    }

    if (!APPLY) {
      console.log(`  ○ would create zh "${zh.title}" (${zh.content.length}c)`);
      stats.created++;
      continue;
    }

    const now = Date.now();
    const doc: Record<string, unknown> = {
      title: zh.title,
      question: zh.question,
      content: zh.content,
      summary: zh.summary,
      tags: zh.tags,
      language: 'zh',
      topicKey,
      authorId: EDITORIAL_ID,
      authorName: EDITORIAL_NAME,
      authorImage: '',
      aiModel: 'claude',
      conversation: [
        { id: 'q1', role: 'user', content: zh.question, timestamp: now },
        { id: 'a1', role: 'assistant', content: zh.summary, timestamp: now },
      ],
      views: 0,
      createdAt: now,
      updatedAt: now,
      source: 'editorial',
      keywords: buildSearchKeywords([zh.title, zh.question, zh.tags.join(' '), zh.summary]),
    };
    if (en.imageUrl) {
      doc.imageUrl = en.imageUrl;
      doc.imageWidth = en.imageWidth;
      doc.imageHeight = en.imageHeight;
    }
    // Written either way so every wiki carries a value for the
    // popular-wikis index (see src/lib/header-image.ts).
    doc.hasHeaderImage = hasHeaderImage(doc);

    const zhRef = db.collection('wikis').doc();
    await zhRef.set(doc);
    stats.created++;
    console.log(`  ✓ created zh "${zh.title}" → /wiki/${zhRef.id}`);

    if (isTypesenseEnabled()) {
      try {
        await upsertWikiToTypesense(toTypesenseDoc(zhRef.id, doc as Parameters<typeof toTypesenseDoc>[1]));
      } catch (err) {
        console.warn(`    ⚠ typesense: ${(err as Error).message}`);
      }
    }
  }

  if (APPLY && stats.created > 0) {
    await db.collection('users').doc(EDITORIAL_ID).update({ wikisCount: FieldValue.increment(stats.created) }).catch(() => {});
  }
  console.log(`\n✓ Done. ${APPLY ? 'created' : 'would create'}=${stats.created} skipped=${stats.skipped} failed=${stats.failed}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
