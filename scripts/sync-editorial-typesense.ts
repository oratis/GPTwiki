/**
 * Targeted Typesense backfill for the editorial quality tier ONLY.
 *
 * The full scripts/sync-typesense.ts walks the entire ~13M-doc `wikis`
 * collection; this one filters to source == 'editorial' (~1k docs), so it
 * cheaply repairs the handful of docs whose write-time Typesense upsert
 * timed out behind the local proxy during seeding. Idempotent (upsert).
 *
 * Usage:
 *   npx tsx scripts/sync-editorial-typesense.ts            # dry-run (count only)
 *   npx tsx scripts/sync-editorial-typesense.ts --apply    # import to Typesense
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

function initFirebase() {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'gptwiki';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (clientEmail && privateKey) {
    const sa: ServiceAccount = { projectId, clientEmail, privateKey };
    return initializeApp({ credential: cert(sa), projectId });
  }
  console.log('▸ no FIREBASE_CLIENT_EMAIL/PRIVATE_KEY — using ADC');
  return initializeApp({ credential: applicationDefault(), projectId });
}

async function main(): Promise<void> {
  // Import after dotenv so TYPESENSE_* env is loaded.
  const { isTypesenseEnabled, ensureWikisCollection, importWikisToTypesense, toTypesenseDoc } =
    await import('../src/lib/typesense');

  if (!isTypesenseEnabled()) {
    console.error('Typesense not configured (TYPESENSE_HOST / TYPESENSE_API_KEY missing).');
    process.exit(1);
  }

  const db = getFirestore(initFirebase());
  const snap = await db.collection('wikis').where('source', '==', 'editorial').get();
  console.log(`▸ editorial docs in Firestore: ${snap.size}${APPLY ? '' : ' (DRY RUN)'}`);

  if (!APPLY) {
    console.log('  (pass --apply to upsert all of them into Typesense)');
    process.exit(0);
  }

  // Best-effort: the collection already exists (seeding upserts into it), and
  // the proxy likes to time out the first TLS handshake. Retry, but don't die.
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      await ensureWikisCollection();
      break;
    } catch (err) {
      console.warn(`  ↻ ensureWikisCollection retry ${attempt + 1}: ${(err as Error).message.slice(0, 80)}`);
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }

  const docs = snap.docs.map((d) => toTypesenseDoc(d.id, d.data()));
  let imported = 0;
  let failures = 0;
  for (let i = 0; i < docs.length; i += 200) {
    const slice = docs.slice(i, i + 200);
    // Retry the proxy's TLS resets a few times.
    let ok = false;
    for (let attempt = 0; attempt < 4 && !ok; attempt++) {
      try {
        failures += await importWikisToTypesense(slice);
        ok = true;
      } catch (err) {
        if (attempt === 3) throw err;
        console.warn(`  ↻ retry batch @${i}: ${(err as Error).message.slice(0, 100)}`);
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      }
    }
    imported += slice.length;
    console.log(`  ✓ ${imported}/${docs.length}`);
  }

  console.log(`\n✓ Done. upserted=${imported} line-failures=${failures}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
