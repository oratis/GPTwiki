/**
 * Full sync of the Firestore `wikis` collection into Typesense.
 *
 * New/updated wikis are indexed automatically at write time
 * (src/lib/search.ts); this is the one-shot bootstrap for the existing
 * corpus, and can be re-run anytime (upserts are idempotent).
 *
 * Usage:
 *   npx tsx scripts/sync-typesense.ts            # dry run: counts only
 *   npx tsx scripts/sync-typesense.ts --apply    # actually import
 *   START_AFTER=<docId> ... --apply              # resume from checkpoint
 *
 * Requires TYPESENSE_HOST/TYPESENSE_API_KEY (and Firebase creds) in .env.local.
 */

import {
  initializeApp,
  cert,
  applicationDefault,
  type ServiceAccount,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';

config({ path: '.env.local', override: true });

const APPLY = process.argv.includes('--apply');
const START_AFTER = process.env.START_AFTER || '';
const PAGE = 400;

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

async function main() {
  // Import after dotenv so TYPESENSE_* env is loaded.
  const { isTypesenseEnabled, ensureWikisCollection, importWikisToTypesense, toTypesenseDoc } =
    await import('../src/lib/typesense');

  if (!isTypesenseEnabled()) {
    console.error('TYPESENSE_HOST / TYPESENSE_API_KEY not set — nothing to do.');
    process.exit(1);
  }

  initFirebase();
  const db = getFirestore();

  if (APPLY) await ensureWikisCollection();

  let scanned = 0;
  let imported = 0;
  let failed = 0;
  let cursor = START_AFTER;

  for (;;) {
    let query = db.collection('wikis').orderBy('__name__').limit(PAGE);
    if (cursor) query = query.startAfter(cursor);
    const snap = await query.get();
    if (snap.empty) break;

    scanned += snap.size;
    if (APPLY) {
      const docs = snap.docs.map((d) => toTypesenseDoc(d.id, d.data()));
      try {
        failed += await importWikisToTypesense(docs);
        imported += docs.length;
      } catch (e) {
        console.error(`import batch failed at checkpoint ${cursor}:`, e);
        failed += docs.length;
      }
    }

    cursor = snap.docs[snap.docs.length - 1].id;
    console.log(
      `▸ scanned=${scanned} ${APPLY ? `imported=${imported} failed=${failed}` : '(dry run)'} checkpoint=${cursor}`
    );
    if (snap.size < PAGE) break;
  }

  console.log(`done. scanned=${scanned} imported=${imported} failed=${failed}`);
  if (!APPLY) console.log('dry run — re-run with --apply to import.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
