/**
 * Tests for the auto-content queue pointer — `setTopicStatus` in content/backlog.ts.
 *
 * These exist because of a regression that ran unnoticed for six weeks. The
 * drafter picks work with `pendingTopics(n)`, i.e.
 * `filter(status === 'pending').slice(0, n)`, but nothing ever wrote a status
 * back. So from 2026-07-11 to 2026-08-21 the daily cron re-drafted the SAME
 * three head-of-queue topics every night: 42 open PRs, byte-for-byte the same
 * three `topicKey`s, roughly 250 wasted Claude generations, and not one new
 * article published.
 *
 * Nothing failed. Every workflow run was green, because "green" only meant the
 * model returned prose and a PR got opened — never that the queue had moved.
 * That is the specific hole these tests plug: they assert the pointer MOVES,
 * and that a caller can tell when it did not.
 *
 * The other half is format coupling. `setTopicStatus` is a regex over this
 * repo's own source text, so it is only correct while backlog.ts keeps its
 * one-entry-per-line shape. The last case pins that against the real file: if
 * someone reformats the array (a stray Prettier run would do it), the matcher
 * starts returning `null` for everything and the queue silently stalls again.
 * Better to fail here than in a cron nobody reads.
 *
 * Run with `npm test`.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { backlog, pendingTopics, setTopicStatus } from '../content/backlog';

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

/** A backlog file in the shape the real one uses. */
const FIXTURE = [
  "export const backlog: BacklogTopic[] = [",
  "  { topicKey: 'roth-vs-traditional-ira', question: \"Roth or traditional?\", cluster: 'personal-finance', locales: ['en', 'zh'], status: 'pending' },",
  "  { topicKey: 'docker-vs-vm', question: \"Docker or a VM?\", cluster: 'dev-practices', locales: ['en', 'zh'], status: 'pending' },",
  "  { topicKey: 'ssd-vs-hdd', question: 'SSD vs HDD?', cluster: 'digital-buying', locales: ['en', 'zh'], status: 'seeded' },",
  "];",
].join('\n');

console.log('\nbacklog queue pointer');

test('pending → drafted moves exactly the topic named, and nothing else', () => {
  const out = setTopicStatus(FIXTURE, 'docker-vs-vm', ['pending'], 'drafted');
  assert.notEqual(out, null, 'expected the topic line to match');

  assert.match(out!, /topicKey: 'docker-vs-vm',[^\n]*status: 'drafted'/);
  // The neighbours must be untouched — a greedy `[^\n]` would have eaten them.
  assert.match(out!, /topicKey: 'roth-vs-traditional-ira',[^\n]*status: 'pending'/);
  assert.match(out!, /topicKey: 'ssd-vs-hdd',[^\n]*status: 'seeded'/);
  assert.equal(out!.split('\n').length, FIXTURE.split('\n').length);
});

test('the drafted topic stops being handed out — the actual regression', () => {
  // The bug in one assertion: after drafting, the next run must pick something
  // else. `pendingTopics` reads the parsed array, so re-derive it from the text.
  const out = setTopicStatus(FIXTURE, 'roth-vs-traditional-ira', ['pending'], 'drafted')!;
  const stillPending = [...out.matchAll(/topicKey: '([^']+)',[^\n]*status: 'pending'/g)].map((m) => m[1]);

  assert.deepEqual(stillPending, ['docker-vs-vm']);
  assert.ok(!stillPending.includes('roth-vs-traditional-ira'));
});

test('a status not in `from` does not match — no accidental un-seeding', () => {
  // mark-seeded passes ['pending','drafted']; a already-`seeded` topic must be
  // left alone so re-running the seeder is idempotent.
  assert.equal(setTopicStatus(FIXTURE, 'ssd-vs-hdd', ['pending', 'drafted'], 'seeded'), null);
});

test('drafted → seeded works, so the post-merge step can finish the lifecycle', () => {
  const drafted = setTopicStatus(FIXTURE, 'docker-vs-vm', ['pending'], 'drafted')!;
  const seeded = setTopicStatus(drafted, 'docker-vs-vm', ['pending', 'drafted'], 'seeded');

  assert.notEqual(seeded, null);
  assert.match(seeded!, /topicKey: 'docker-vs-vm',[^\n]*status: 'seeded'/);
});

test('an unknown topicKey returns null rather than corrupting the file', () => {
  assert.equal(setTopicStatus(FIXTURE, 'no-such-topic', ['pending'], 'drafted'), null);
});

test('a regex-special topicKey is escaped, not interpreted', () => {
  // Slugs are `[a-z0-9-]` today, but an unescaped `.` would match any character
  // and could move the WRONG topic. Cheap to guarantee, expensive to debug.
  const odd = "  { topicKey: 'a.b', question: 'q', cluster: 'c', locales: ['en'], status: 'pending' },\n" +
    "  { topicKey: 'axb', question: 'q', cluster: 'c', locales: ['en'], status: 'pending' },";
  const out = setTopicStatus(odd, 'a.b', ['pending'], 'drafted')!;

  assert.match(out, /topicKey: 'a\.b',[^\n]*status: 'drafted'/);
  assert.match(out, /topicKey: 'axb',[^\n]*status: 'pending'/);
});

test('the matcher still fits the REAL content/backlog.ts', () => {
  // Format coupling: `setTopicStatus` is a regex over source text. If the array
  // is ever reformatted, every call returns null and the queue stalls silently.
  const root = dirname(dirname(fileURLToPath(import.meta.url)));
  const src = readFileSync(join(root, 'content', 'backlog.ts'), 'utf8');

  const movable = backlog.filter((t) => t.status !== 'seeded');
  assert.ok(movable.length > 0, 'fixture-free check needs at least one non-seeded topic');

  for (const t of movable) {
    const out = setTopicStatus(src, t.topicKey, [t.status], 'seeded');
    assert.notEqual(
      out,
      null,
      `no line matched for '${t.topicKey}' (status '${t.status}') — has content/backlog.ts been reformatted? ` +
        'setTopicStatus expects one single-line entry per topic.'
    );
  }
});

test('pendingTopics respects the cap and never returns drafted work', () => {
  const picked = pendingTopics(3);
  assert.ok(picked.length <= 3);
  for (const t of picked) assert.equal(t.status, 'pending');
});

console.log(`\n${run - failures}/${run} passed`);
process.exit(failures > 0 ? 1 : 0);
