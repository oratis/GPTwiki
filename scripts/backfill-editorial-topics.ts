/** Link existing translations only where the checked-in edition identifies the topic. */
import { readdirSync } from 'node:fs';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { DraftArticle } from '../content/types';

async function main() {
  const apply = process.argv.includes('--apply');
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error('Set FIREBASE_PROJECT_ID to the target project.');
  const db = getFirestore(initializeApp({ credential: applicationDefault(), projectId }));
  const contentDir = new URL('../content/', import.meta.url);
  const byEdition = new Map<string, Set<string>>();
  for (const file of readdirSync(contentDir).filter(f => /\.[a-z]{2}\.ts$/.test(f))) {
    const cluster = await import(new URL(file, contentDir).href);
    for (const batch of Object.values(cluster)) {
      if (!Array.isArray(batch)) continue;
      for (const d of batch as DraftArticle[]) {
        if (!d.topicKey) continue;
        const key = JSON.stringify([d.language, d.title]);
        const topics = byEdition.get(key) ?? new Set<string>();
        topics.add(d.topicKey);
        byEdition.set(key, topics);
      }
    }
  }
  const snap = await db.collection('wikis').where('source', '==', 'editorial')
    .select('authorId', 'language', 'title', 'topicKey').get();
  const writer = apply ? db.bulkWriter() : null;
  const writes: Promise<unknown>[] = [];
  let matched = 0;
  let updated = 0;
  for (const doc of snap.docs) {
    if (doc.get('authorId') !== 'gptwiki-editorial' || doc.get('topicKey')) continue;
    const topics = byEdition.get(JSON.stringify([doc.get('language'), doc.get('title')]));
    if (topics?.size !== 1) continue;
    matched++;
    if (writer) {
      const [topicKey] = topics;
      writes.push(writer.update(doc.ref, { topicKey }, { lastUpdateTime: doc.updateTime }).then(() => { updated++; }));
    }
  }
  const completed = Promise.allSettled(writes);
  await writer?.close();
  if ((await completed).some(result => result.status === 'rejected')) {
    throw new Error(`Updated ${updated}/${matched}; rerun to resume after a conflicting edit or write failure.`);
  }
  console.log(`${projectId}: inspected ${snap.size}, matched ${matched}, updated ${updated}${apply ? '' : ' (dry run)'}`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
