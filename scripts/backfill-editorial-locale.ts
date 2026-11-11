import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { locales } from '../src/lib/i18n/locales';

async function main() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error('Set FIREBASE_PROJECT_ID to the target project.');
  const apply = process.argv.includes('--apply');
  const db = getFirestore(initializeApp({ projectId, credential: applicationDefault() }));
  const docs = await db.collection('wikis').where('source', '==', 'editorial')
    .select('language', 'editorialLocale').get();
  const writer = apply ? db.bulkWriter() : null;
  const writes: Promise<unknown>[] = [];
  let pending = 0;
  for (const doc of docs.docs) {
    const language = doc.get('language');
    if (!Object.hasOwn(locales, language) || doc.get('editorialLocale') === language) continue;
    pending++;
    if (writer) writes.push(writer.update(doc.ref, { editorialLocale: language }, { lastUpdateTime: doc.updateTime }));
  }
  const completed = Promise.allSettled(writes);
  await writer?.close();
  const failed = (await completed).filter(result => result.status === 'rejected').length;
  if (failed) throw new Error(`${failed}/${pending} updates failed; rerun to resume.`);
  console.log(`${projectId}: inspected ${docs.size}, ${apply ? 'updated' : 'would update'} ${pending}`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
