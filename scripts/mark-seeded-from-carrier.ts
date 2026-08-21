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
import { setTopicStatus } from '../content/backlog';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const backlogPath = join(root, 'content', 'backlog.ts');

const keys = [...new Set(autoDraftEn.map((d) => d.topicKey).filter((k): k is string => !!k))];
let src = readFileSync(backlogPath, 'utf8');
let marked = 0;
for (const k of keys) {
  // `drafted` is the normal state here (auto-author sets it when it opens the
  // PR); `pending` still matches topics seeded outside that flow.
  const next = setTopicStatus(src, k, ['pending', 'drafted'], 'seeded');
  if (next !== null) {
    src = next;
    marked++;
  }
}
writeFileSync(backlogPath, src);
console.log(`marked ${marked}/${keys.length} topic(s) seeded: ${keys.join(', ')}`);
