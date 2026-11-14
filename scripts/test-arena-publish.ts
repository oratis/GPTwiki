import assert from 'node:assert/strict';
import type { Firestore } from 'firebase-admin/firestore';
import { publishBattleArticle } from '../src/lib/arena/store';
import type { Wiki } from '../src/types';

type RecordData = Record<string, unknown>;
function database() {
  const records = new Map<string, RecordData>([['arenaVotes/battle_reader', { outcome: 'a' }], ['users/reader', { wikisCount: 0 }]]);
  let sequence = 0;
  let failCommit = false;
  let tail = Promise.resolve();
  const reference = (collection: string, id = `new-${++sequence}`) => ({ id, path: `${collection}/${id}` });
  type Ref = ReturnType<typeof reference>;
  const db = {
    collection: (name: string) => ({ doc: (id?: string) => reference(name, id) }),
    runTransaction: async (callback: (tx: unknown) => Promise<unknown>) => {
      const previous = tail;
      let release!: () => void;
      tail = new Promise<void>((resolve) => { release = resolve; });
      await previous;
      try {
        const pending: Array<{ ref: Ref; data: RecordData; create: boolean }> = [];
        const result = await callback({
          get: async (ref: Ref) => ({ exists: records.has(ref.path), ref, get: (key: string) => records.get(ref.path)?.[key] }),
          create: (ref: Ref, data: RecordData) => pending.push({ ref, data, create: true }),
          update: (ref: Ref, data: RecordData) => pending.push({ ref, data, create: false }),
        });
        if (failCommit) throw new Error('commit unavailable');
        for (const write of pending) {
          if (write.create) assert.equal(records.has(write.ref.path), false);
          const next = { ...records.get(write.ref.path), ...write.data };
          if (write.ref.path.startsWith('users/')) next.wikisCount = Number(records.get(write.ref.path)?.wikisCount ?? 0) + 1;
          records.set(write.ref.path, next);
        }
        return result;
      } finally { release(); }
    },
  } as unknown as Pick<Firestore, 'collection' | 'runTransaction'>;
  return { db, records, fail: (value: boolean) => { failCommit = value; } };
}
const article: Omit<Wiki, 'id' | 'views' | 'createdAt' | 'updatedAt'> = {
  title: 'Why?', question: 'Why?', content: 'A useful answer.', summary: 'A useful answer.', tags: ['science'], aiModel: 'gpt',
  authorId: 'reader', authorName: 'Reader', conversation: [], language: 'en', source: 'arena',
};
async function main() {
  const first = database();
  first.fail(true);
  await assert.rejects(publishBattleArticle('battle', 'reader', article, first.db), /commit unavailable/);
  assert.equal(first.records.get('arenaVotes/battle_reader')?.publishedWikiId, undefined);
  assert.equal([...first.records.keys()].filter((key) => key.startsWith('wikis/')).length, 0);
  first.fail(false);
  const results = await Promise.all(Array.from({ length: 4 }, () => publishBattleArticle('battle', 'reader', article, first.db)));
  assert.equal(new Set(results.map((result) => result.wikiId)).size, 1);
  assert.equal(results.filter((result) => !result.alreadyPublished).length, 1);
  assert.equal(first.records.get('users/reader')?.wikisCount, 1);
  const second = database();
  second.records.set('arenaVotes/battle_reader', { outcome: 'a', publishedWikiId: 'old-dangling-claim' });
  const repaired = await publishBattleArticle('battle', 'reader', article, second.db);
  assert.equal(repaired.wikiId, 'old-dangling-claim');
  assert.ok(second.records.has('wikis/old-dangling-claim'));
  await assert.rejects(publishBattleArticle('battle', 'stranger', article, second.db), /Vote is required/);
  console.log('Arena publish: failed commits, concurrent retries, author count and legacy claim recovery passed');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
