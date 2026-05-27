/**
 * One-shot migration: heal the split between NextAuth's adapter user
 * collection (`authjs_users`) and GPTwiki's product user collection
 * (`users`).
 *
 * Background: before the jwt-callback fix, first-time OAuth signups went
 * through src/lib/auth.ts's signIn callback while `user.id` was still a
 * throwaway random UUID (next-auth had not yet handed off to the
 * FirestoreAdapter). The mirror landed at `users/{random-uuid}` while the
 * rest of the app referenced `users/{authjs-adapter-auto-id}`. Profile
 * pages 404, follower counts go nowhere, etc. Pre-Phase 4 users have a
 * different symptom: their `users/{provider-id}` doc still exists but no
 * `users/{authjs-id}` mirror was ever written.
 *
 * This script:
 *   1. Walks `authjs_users` (source of truth post-Phase 4).
 *   2. For each, ensures `users/{authjs_id}` exists with name/email/image.
 *   3. Recomputes `wikisCount` from the `wikis` collection — counting
 *      both the canonical authjs id and any orphan ids that share the
 *      same email (so pre-Phase 4 wikis are credited).
 *   4. Finds orphan `users/{id}` docs (id not in `authjs_users`) and
 *      either merges their useful fields (apiKeys, etc.) into the
 *      canonical doc, or just reports them.
 *   5. Optionally rewrites `wikis.authorId` from an old/orphan id to the
 *      canonical authjs id so profile links on existing wikis resolve.
 *
 * Usage:
 *   npx tsx scripts/backfill-users.ts                  # dry run (default)
 *   npx tsx scripts/backfill-users.ts --apply          # actually write
 *   npx tsx scripts/backfill-users.ts --apply \
 *          --rewrite-wikis                             # also rewrite wiki.authorId
 *   npx tsx scripts/backfill-users.ts --apply \
 *          --delete-orphans                            # also delete merged orphans
 *
 * Idempotent: re-running with the same data is a no-op for already-
 * healed users.
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

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const REWRITE_WIKIS = args.includes('--rewrite-wikis');
const DELETE_ORPHANS = args.includes('--delete-orphans');
const DRY = !APPLY;

// Prefer explicit service-account env vars (Phase 4 pattern used by the
// other backfill scripts). Fall back to Application Default Credentials —
// useful when running locally with `gcloud auth application-default login`
// already done, so an operator doesn't need to dig up the service-account
// JSON for a one-off migration.
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

const app = initFirebase();
const db = getFirestore(app);

interface AuthjsUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified?: number | null;
}

interface UserDoc {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  provider?: string;
  wikisCount?: number;
  createdAt?: number;
  // anything else (apiKeys, etc.) is preserved
  [key: string]: unknown;
}

function tag(): string {
  return DRY ? '[dry-run]' : '[apply]';
}

async function loadAuthjsUsers(): Promise<AuthjsUser[]> {
  const out: AuthjsUser[] = [];
  let lastId: string | undefined;
  while (true) {
    let q = db.collection('authjs_users').orderBy('__name__').limit(500);
    if (lastId) q = q.startAfter(lastId);
    const snap = await q.get();
    if (snap.empty) break;
    for (const doc of snap.docs) {
      const data = doc.data();
      if (!data.email) continue;
      out.push({
        id: doc.id,
        email: String(data.email).toLowerCase(),
        name: data.name,
        image: data.image,
        emailVerified: data.emailVerified ?? null,
      });
    }
    lastId = snap.docs[snap.docs.length - 1].id;
    if (snap.size < 500) break;
  }
  return out;
}

async function loadUsers(): Promise<UserDoc[]> {
  const out: UserDoc[] = [];
  let lastId: string | undefined;
  while (true) {
    let q = db.collection('users').orderBy('__name__').limit(500);
    if (lastId) q = q.startAfter(lastId);
    const snap = await q.get();
    if (snap.empty) break;
    for (const doc of snap.docs) {
      out.push({ id: doc.id, ...(doc.data() as Record<string, unknown>) });
    }
    lastId = snap.docs[snap.docs.length - 1].id;
    if (snap.size < 500) break;
  }
  return out;
}

async function countWikisByAuthor(): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  let lastId: string | undefined;
  while (true) {
    let q = db.collection('wikis').orderBy('__name__').limit(1000).select('authorId');
    if (lastId) q = q.startAfter(lastId);
    const snap = await q.get();
    if (snap.empty) break;
    for (const doc of snap.docs) {
      const authorId = (doc.data() as { authorId?: string }).authorId;
      if (!authorId || authorId === 'system') continue;
      counts.set(authorId, (counts.get(authorId) ?? 0) + 1);
    }
    lastId = snap.docs[snap.docs.length - 1].id;
    if (snap.size < 1000) break;
  }
  return counts;
}

function mergeApiKeys(
  canonical: Record<string, unknown> | undefined,
  orphan: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  // Prefer existing canonical keys; only fill in slots the canonical
  // doesn't have. Never overwrite a key the user has already rotated.
  if (!orphan) return canonical;
  if (!canonical) return orphan;
  const out: Record<string, unknown> = { ...orphan, ...canonical };
  return out;
}

async function main(): Promise<void> {
  console.log(`${tag()} loading authjs_users, users, wikis…`);
  const [authjsUsers, userDocs, wikiCounts] = await Promise.all([
    loadAuthjsUsers(),
    loadUsers(),
    countWikisByAuthor(),
  ]);

  console.log(
    `${tag()} authjs_users=${authjsUsers.length} users=${userDocs.length} ` +
      `distinct wiki authors=${wikiCounts.size}`,
  );

  // email (lowercased) → canonical authjs user id
  const emailToAuthjsId = new Map<string, string>();
  for (const u of authjsUsers) emailToAuthjsId.set(u.email, u.id);

  // authjs id set for quick "is canonical?" lookup
  const authjsIdSet = new Set(authjsUsers.map((u) => u.id));

  // Existing users docs keyed by id, for merge lookups
  const userById = new Map<string, UserDoc>();
  for (const u of userDocs) userById.set(u.id, u);

  // Group orphan user docs by canonical id (matched via email).
  // Orphan = users doc whose id is NOT in authjs_users.
  const orphansByCanonical = new Map<string, UserDoc[]>();
  const unmatchedOrphans: UserDoc[] = [];
  for (const u of userDocs) {
    if (authjsIdSet.has(u.id)) continue;
    const email = u.email ? String(u.email).toLowerCase() : undefined;
    const canonical = email ? emailToAuthjsId.get(email) : undefined;
    if (canonical) {
      const list = orphansByCanonical.get(canonical) ?? [];
      list.push(u);
      orphansByCanonical.set(canonical, list);
    } else {
      unmatchedOrphans.push(u);
    }
  }

  console.log(
    `${tag()} orphan user docs: ${userDocs.length - authjsIdSet.size} ` +
      `(matched=${[...orphansByCanonical.values()].reduce((n, l) => n + l.length, 0)} ` +
      `unmatched=${unmatchedOrphans.length})`,
  );

  // ─── Pass 1: heal canonical users docs ───
  let created = 0;
  let updated = 0;
  let skipped = 0;
  let mergedKeys = 0;
  for (const u of authjsUsers) {
    const orphans = orphansByCanonical.get(u.id) ?? [];

    // Aggregate wiki count: canonical id + every orphan id with same email.
    const ids = [u.id, ...orphans.map((o) => o.id)];
    const aggregateCount = ids.reduce((n, id) => n + (wikiCounts.get(id) ?? 0), 0);

    const existing = userById.get(u.id);
    let orphanApiKeys: Record<string, unknown> | undefined;
    for (const o of orphans) {
      const k = o.apiKeys as Record<string, unknown> | undefined;
      orphanApiKeys = mergeApiKeys(orphanApiKeys, k);
    }
    const existingApiKeys = existing?.apiKeys as Record<string, unknown> | undefined;
    const finalApiKeys = mergeApiKeys(existingApiKeys, orphanApiKeys);

    // Earliest createdAt across canonical + orphans (preserve original signup).
    const orphanCreatedAt = orphans
      .map((o) => o.createdAt)
      .filter((v): v is number => typeof v === 'number');
    const allCreatedAt = [
      ...(typeof existing?.createdAt === 'number' ? [existing.createdAt] : []),
      ...orphanCreatedAt,
    ];
    const earliestCreatedAt = allCreatedAt.length ? Math.min(...allCreatedAt) : Date.now();

    if (!existing) {
      const newDoc: Record<string, unknown> = {
        name: u.name || u.email.split('@')[0] || '',
        email: u.email,
        image: u.image || '',
        wikisCount: aggregateCount,
        createdAt: earliestCreatedAt,
      };
      if (finalApiKeys && Object.keys(finalApiKeys).length > 0) {
        newDoc.apiKeys = finalApiKeys;
      }
      console.log(`  + create users/${u.id}  email=${u.email}  wikis=${aggregateCount}`);
      if (!DRY) await db.collection('users').doc(u.id).set(newDoc);
      created++;
      if (finalApiKeys) mergedKeys++;
    } else {
      const patch: Record<string, unknown> = {};
      // Update wikisCount if drifted from real count.
      if ((existing.wikisCount ?? 0) !== aggregateCount) {
        patch.wikisCount = aggregateCount;
      }
      // Fill in missing identity fields without overwriting existing.
      if (!existing.email && u.email) patch.email = u.email;
      if (!existing.name && u.name) patch.name = u.name;
      if (!existing.image && u.image) patch.image = u.image;
      // Merge apiKeys from orphans if canonical doesn't have them.
      if (orphanApiKeys && Object.keys(orphanApiKeys).length > 0) {
        const merged = mergeApiKeys(existingApiKeys, orphanApiKeys);
        const existingKeyCount = existingApiKeys ? Object.keys(existingApiKeys).length : 0;
        const mergedKeyCount = merged ? Object.keys(merged).length : 0;
        if (mergedKeyCount > existingKeyCount) {
          patch.apiKeys = merged;
          mergedKeys++;
        }
      }
      // Bring createdAt back to earliest if drift exists.
      if (earliestCreatedAt < (existing.createdAt ?? Infinity)) {
        patch.createdAt = earliestCreatedAt;
      }
      if (Object.keys(patch).length === 0) {
        skipped++;
        continue;
      }
      console.log(
        `  ~ update users/${u.id}  email=${u.email}  patch=${JSON.stringify(
          Object.keys(patch),
        )}  wikis=${aggregateCount}`,
      );
      if (!DRY) await db.collection('users').doc(u.id).update(patch);
      updated++;
    }
  }
  console.log(
    `${tag()} canonical users: created=${created} updated=${updated} ` +
      `skipped=${skipped} apiKeys-merged=${mergedKeys}`,
  );

  // ─── Pass 2: rewrite wiki.authorId ───
  if (REWRITE_WIKIS) {
    // Build orphan-id → canonical-id index for fast wiki rewrite.
    const orphanToCanonical = new Map<string, string>();
    for (const [canonical, orphans] of orphansByCanonical) {
      for (const o of orphans) orphanToCanonical.set(o.id, canonical);
    }
    let rewritten = 0;
    let lastId: string | undefined;
    while (true) {
      let q = db
        .collection('wikis')
        .orderBy('__name__')
        .limit(500)
        .select('authorId');
      if (lastId) q = q.startAfter(lastId);
      const snap = await q.get();
      if (snap.empty) break;
      const batch = db.batch();
      let batched = 0;
      for (const doc of snap.docs) {
        const authorId = (doc.data() as { authorId?: string }).authorId;
        if (!authorId || authorId === 'system') continue;
        if (authjsIdSet.has(authorId)) continue;
        const canonical = orphanToCanonical.get(authorId);
        if (!canonical) continue;
        console.log(`  ↻ wiki ${doc.id}: authorId ${authorId} → ${canonical}`);
        if (!DRY) {
          batch.update(doc.ref, { authorId: canonical });
          batched++;
        }
        rewritten++;
      }
      if (!DRY && batched > 0) await batch.commit();
      lastId = snap.docs[snap.docs.length - 1].id;
      if (snap.size < 500) break;
    }
    console.log(`${tag()} wikis rewritten: ${rewritten}`);
  } else {
    console.log(`${tag()} skipping wiki rewrite (pass --rewrite-wikis to enable)`);
  }

  // ─── Pass 3: delete merged orphans ───
  if (DELETE_ORPHANS) {
    let deleted = 0;
    for (const orphans of orphansByCanonical.values()) {
      for (const o of orphans) {
        console.log(`  - delete users/${o.id}  email=${o.email ?? '(none)'}`);
        if (!DRY) await db.collection('users').doc(o.id).delete();
        deleted++;
      }
    }
    console.log(`${tag()} orphans deleted: ${deleted}`);
  } else {
    console.log(`${tag()} skipping orphan delete (pass --delete-orphans to enable)`);
  }

  // ─── Report on unmatched orphans (manual decision required) ───
  if (unmatchedOrphans.length > 0) {
    console.log(`\n${tag()} unmatched orphans (no email match in authjs_users):`);
    for (const o of unmatchedOrphans) {
      console.log(`    users/${o.id}  email=${o.email ?? '(none)'}  name=${o.name ?? ''}`);
    }
    console.log(
      `${tag()} these were left alone — investigate manually before deleting.`,
    );
  }

  console.log(`\n${tag()} done.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
