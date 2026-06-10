/**
 * Backfill the `keywords` search-index field on existing wiki docs.
 *
 * New/updated wikis get the field automatically (src/lib/search.ts), but
 * the pre-existing corpus needs a one-shot pass so search recall covers
 * the whole collection instead of tags + the most recent window.
 *
 * Usage:
 *   npx tsx scripts/backfill-keywords.ts                # dry run (default)
 *   npx tsx scripts/backfill-keywords.ts --apply        # actually write
 *   START_AFTER=<docId> npx tsx scripts/backfill-keywords.ts --apply
 *   FORCE=1 ...                                         # recompute even if present
 *
 * Idempotent: docs that already have a `keywords` field are skipped
 * (unless FORCE=1). Resumable via START_AFTER or the printed checkpoint.
 */

import {
  initializeApp,
  cert,
  applicationDefault,
  type ServiceAccount,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import { buildSearchKeywords } from '../src/lib/search-keywords';

config({ path: '.env.local', override: true });

const APPLY = process.argv.includes('--apply');
const FORCE = process.env.FORCE === '1';
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
  initFirebase();
  const db = getFirestore();

  let scanned = 0;
  let written = 0;
  let cursor = START_AFTER;

  for (;;) {
    let query = db.collection('wikis').orderBy('__name__').limit(PAGE);
    if (cursor) query = query.startAfter(cursor);
    const snap = await query.get();
    if (snap.empty) break;

    const batch = db.batch();
    let batchCount = 0;

    for (const doc of snap.docs) {
      scanned++;
      const data = doc.data();
      if (!FORCE && Array.isArray(data.keywords) && data.keywords.length > 0) continue;
      const keywords = buildSearchKeywords([
        data.title,
        data.question,
        Array.isArray(data.tags) ? data.tags.join(' ') : undefined,
        data.summary,
      ]);
      if (keywords.length === 0) continue;
      if (APPLY) {
        batch.update(doc.ref, { keywords });
        batchCount++;
      }
      written++;
    }

    if (APPLY && batchCount > 0) await batch.commit();
    cursor = snap.docs[snap.docs.length - 1].id;
    console.log(
      `▸ scanned=${scanned} ${APPLY ? 'written' : 'would write'}=${written} checkpoint=${cursor}`
    );
    if (snap.size < PAGE) break;
  }

  console.log(`done. scanned=${scanned} ${APPLY ? 'written' : 'would write'}=${written}`);
  if (!APPLY) console.log('dry run — re-run with --apply to write.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
