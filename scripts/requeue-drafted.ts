/**
 * Return `drafted` topics to `pending` so the drafter picks them up again.
 *
 * `auto-author` marks a topic `drafted` the moment it opens a PR, which is what
 * stops it re-drafting the same head of the queue every night. But `drafted` is
 * only ever cleared by `mark-seeded-from-carrier`, which runs on MERGE. So a
 * drafts PR that gets CLOSED instead — because the review rejected it — strands
 * its topics: `pendingTopics()` filters on `pending`, so nothing will ever draft
 * them again and they silently leave the queue.
 *
 * That is exactly what closing PR #138 needed (three topics whose citations did
 * not resolve; see scripts/lib/source-health.ts), and it is not a one-off — it
 * is the normal cost of the review gate actually rejecting something.
 *
 * Pure text edit over content/backlog.ts, no Firestore. Idempotent.
 *
 * Usage:
 *   npx tsx scripts/requeue-drafted.ts                      # dry run, lists what would move
 *   npx tsx scripts/requeue-drafted.ts --apply              # requeue every drafted topic
 *   npx tsx scripts/requeue-drafted.ts --apply --only=a,b   # just these topicKeys
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { backlog, setTopicStatus } from '../content/backlog';

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const onlyArg = args.find((a) => a.startsWith('--only='));
const only = onlyArg
  ? new Set(
      onlyArg
        .slice('--only='.length)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    )
  : null;

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const backlogPath = join(root, 'content', 'backlog.ts');

const targets = backlog
  .filter((t) => t.status === 'drafted')
  .filter((t) => !only || only.has(t.topicKey));

if (!targets.length) {
  console.log('No drafted topics to requeue.');
  process.exit(0);
}

console.log(`▸ ${targets.length} drafted topic(s)${APPLY ? '' : ' (DRY RUN)'}:`);
for (const t of targets) console.log(`    ${t.topicKey}  — ${t.question.slice(0, 72)}`);

if (!APPLY) {
  console.log('\nRe-run with --apply to move them back to pending.');
  process.exit(0);
}

let src = readFileSync(backlogPath, 'utf8');
let moved = 0;
const missed: string[] = [];
for (const t of targets) {
  const next = setTopicStatus(src, t.topicKey, ['drafted'], 'pending');
  if (next === null) {
    missed.push(t.topicKey);
    continue;
  }
  src = next;
  moved++;
}

if (moved) writeFileSync(backlogPath, src);
console.log(`\n✓ requeued ${moved}/${targets.length} topic(s)`);
if (missed.length) {
  console.error(
    `! no line matched for: ${missed.join(', ')} — has content/backlog.ts been reformatted? ` +
      'setTopicStatus expects one single-line entry per topic.'
  );
  process.exit(1);
}
