/**
 * Flip every topic present in the current auto-draft carrier from `pending` or
 * `drafted` to `seeded` in content/backlog.ts. Run right after seeding so the
 * daily cron advances to fresh topics instead of re-drafting what's already live.
 * Pure text edit — no Firestore. Idempotent (already-seeded lines don't match).
 *
 * Usage: npx tsx scripts/mark-seeded-from-carrier.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { autoDraftEn } from '../content/auto-draft.en';
import { setTopicStatus, type BacklogStatus } from '../content/backlog';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const backlogPath = join(root, 'content', 'backlog.ts');

const carrierKeys = [...new Set(autoDraftEn.flatMap(d => d.topicKey ? [d.topicKey] : []))];
if (process.argv.includes('--print-keys')) {
  console.log(JSON.stringify(carrierKeys));
  process.exit(0);
}

const keysFile = process.env.BATCH_TOPIC_KEYS_FILE;
const keys: string[] = keysFile ? JSON.parse(readFileSync(keysFile, 'utf8')) : carrierKeys;
const status = process.argv.includes('--drafted') ? 'drafted' : 'seeded';
const from: BacklogStatus[] = status === 'drafted' ? ['pending'] : ['pending', 'drafted'];
let src = readFileSync(backlogPath, 'utf8');
let marked = 0;
for (const key of keys) {
  const next = setTopicStatus(src, key, from, status);
  if (next !== null) {
    src = next;
    marked++;
  }
}
writeFileSync(backlogPath, src);
console.log(`marked ${marked}/${keys.length} topic(s) ${status}: ${keys.join(', ')}`);
