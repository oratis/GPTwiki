/**
 * Backfill the `hasHeaderImage` flag on existing wiki docs.
 *
 * New/updated wikis get the field automatically (src/lib/search.ts and the
 * seed/mirror paths), but the pre-existing corpus needs a one-shot pass
 * before getPopularWikis can serve entirely off the
 * `(hasHeaderImage, views desc)` index instead of topping up from a scan.
 *
 * Usage:
 *   npx tsx scripts/backfill-header-image-flag.ts             # dry run (default)
 *   npx tsx scripts/backfill-header-image-flag.ts --dry-run   # same, explicit
 *   npx tsx scripts/backfill-header-image-flag.ts --apply     # actually write
 *   START_AFTER=<docId> npx tsx scripts/backfill-header-image-flag.ts --apply
 *   FORCE=1 ...                                               # rewrite even if present
 *
 * Idempotent: docs whose flag already matches `imageUrl` are skipped
 * (unless FORCE=1), so a re-run after a partial pass is cheap. Resumable
 * via START_AFTER or the printed checkpoint.
 *
 * Reads the whole collection once (`__name__` order, projected down to
 * `imageUrl` + `hasHeaderImage`) — deliberately a single cold pass, not
 * something to wire into a request path.
 */

import {
  initializeApp,
  cert,
  applicationDefault,
  type ServiceAccount,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import { hasHeaderImage } from '../src/lib/header-image';

config({ path: '.env.local', override: true });

// Writing takes an explicit --apply, and --dry-run overrides it, so a
// half-edited command line can never write to production.
const APPLY =
  process.argv.includes('--apply') && !process.argv.includes('--dry-run');
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
  let withImage = 0;
  let cursor = START_AFTER;

  for (;;) {
    let query = db
      .collection('wikis')
      .orderBy('__name__')
      // Only the two fields the decision needs — wiki docs carry whole
      // article bodies and conversation transcripts otherwise.
      .select('imageUrl', 'hasHeaderImage')
      .limit(PAGE);
    if (cursor) query = query.startAfter(cursor);
    const snap = await query.get();
    if (snap.empty) break;

    const batch = db.batch();
    let batchCount = 0;

    for (const doc of snap.docs) {
      scanned++;
      const data = doc.data();
      const flag = hasHeaderImage(data);
      if (flag) withImage++;
      if (!FORCE && data.hasHeaderImage === flag) continue;
      if (APPLY) {
        batch.update(doc.ref, { hasHeaderImage: flag });
        batchCount++;
      }
      written++;
    }

    if (APPLY && batchCount > 0) await batch.commit();
    cursor = snap.docs[snap.docs.length - 1].id;
    console.log(
      `▸ scanned=${scanned} withImage=${withImage} ${APPLY ? 'written' : 'would write'}=${written} checkpoint=${cursor}`
    );
    if (snap.size < PAGE) break;
  }

  console.log(
    `done. scanned=${scanned} withImage=${withImage} ${APPLY ? 'written' : 'would write'}=${written}`
  );
  if (!APPLY) console.log('dry run — re-run with --apply to write.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
