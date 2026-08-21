/**
 * Backfill the `hasHeaderImage` flag on existing wiki docs.
 *
 * New/updated wikis get the field automatically (src/lib/search.ts and the
 * seed/mirror paths), but the pre-existing corpus needs a one-shot pass
 * before getPopularWikis can serve entirely off the
 * `(hasHeaderImage, views desc)` index instead of topping up from a scan.
 *
 * TARGETED, not a full normalize — rewritten 2026-08-21 after sizing the
 * corpus. The collection holds ~19M docs and only ~455K (2.4%) carry an
 * image. The original whole-collection pass would have written an explicit
 * `false` onto ~18.5M docs, which the runtime never reads: the only consumer
 * is `where('hasHeaderImage', '==', true)`, and a missing flag fails that
 * filter exactly like `false` does. So this pass queries just the
 * image-bearing docs (`imageUrl != ''` — Firestore `!=` already excludes
 * missing and null) and writes `hasHeaderImage: true` where it isn't set.
 * ~455K reads + ≤455K writes instead of 19M + 19M.
 *
 * Usage:
 *   npx tsx scripts/backfill-header-image-flag.ts             # dry run (default)
 *   npx tsx scripts/backfill-header-image-flag.ts --dry-run   # same, explicit
 *   npx tsx scripts/backfill-header-image-flag.ts --apply     # actually write
 *
 * Idempotent: docs already flagged `true` are skipped, so a re-run after a
 * partial pass re-reads but never re-writes. Resumable only by re-running
 * from the top (the read side is the cheap half).
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
// Big pages: the pass is RTT-bound when run far from us-central1, and the
// projection keeps each row tiny. Writes go out as parallel 500-op batches.
const PAGE = 2000;
const BATCH_LIMIT = 500;

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
  let alreadyFlagged = 0;
  // `!=` needs the inequality field first in the order; __name__ breaks ties
  // so startAfter(lastDoc) pagination is stable.
  let last: FirebaseFirestore.QueryDocumentSnapshot | undefined;

  for (;;) {
    let query = db
      .collection('wikis')
      .where('imageUrl', '!=', '')
      .orderBy('imageUrl')
      .orderBy('__name__')
      // Only the two fields the decision needs — wiki docs carry whole
      // article bodies and conversation transcripts otherwise.
      .select('imageUrl', 'hasHeaderImage')
      .limit(PAGE);
    if (last) query = query.startAfter(last);
    const snap = await query.get();
    if (snap.empty) break;

    const refs: FirebaseFirestore.DocumentReference[] = [];

    for (const doc of snap.docs) {
      scanned++;
      const data = doc.data();
      if (data.hasHeaderImage === true) {
        alreadyFlagged++;
        continue;
      }
      // Re-check through the shared predicate: `!= ''` admits
      // whitespace-only URLs that the runtime treats as "no image".
      if (!hasHeaderImage(data)) continue;
      if (APPLY) refs.push(doc.ref);
      written++;
    }

    if (APPLY && refs.length > 0) {
      const commits: Promise<unknown>[] = [];
      for (let i = 0; i < refs.length; i += BATCH_LIMIT) {
        const batch = db.batch();
        for (const ref of refs.slice(i, i + BATCH_LIMIT)) {
          batch.update(ref, { hasHeaderImage: true });
        }
        commits.push(batch.commit());
      }
      await Promise.all(commits);
    }
    last = snap.docs[snap.docs.length - 1];
    console.log(
      `▸ scanned=${scanned} alreadyFlagged=${alreadyFlagged} ${APPLY ? 'written' : 'would write'}=${written} checkpoint=${last.id}`
    );
    if (snap.size < PAGE) break;
  }

  console.log(
    `done. scanned=${scanned} alreadyFlagged=${alreadyFlagged} ${APPLY ? 'written' : 'would write'}=${written}`
  );
  if (!APPLY) console.log('dry run — re-run with --apply to write.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
