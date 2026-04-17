import { db } from './firebase';
import { FieldValue } from 'firebase-admin/firestore';
import type { UserProfile } from '@/types';

/**
 * Follow relationships live in their own top-level collection so the
 * writes never touch (and never risk corrupting) the user profile
 * document. Doc IDs are deterministic: `${followerId}_${followeeId}`.
 * That makes "am I following X?" a single keyed read instead of a query.
 *
 * Alongside, we keep denormalised `followersCount` / `followingCount`
 * on the user profile, updated atomically inside a transaction.
 */

function followId(followerId: string, followeeId: string) {
  return `${followerId}_${followeeId}`;
}

export async function follow(followerId: string, followeeId: string): Promise<void> {
  if (followerId === followeeId) throw new Error('Cannot follow yourself');

  const followRef = db.collection('follows').doc(followId(followerId, followeeId));
  const followerRef = db.collection('users').doc(followerId);
  const followeeRef = db.collection('users').doc(followeeId);

  await db.runTransaction(async (tx) => {
    const existing = await tx.get(followRef);
    if (existing.exists) return; // idempotent

    tx.set(followRef, {
      followerId,
      followeeId,
      createdAt: Date.now(),
    });
    tx.update(followerRef, { followingCount: FieldValue.increment(1) });
    tx.update(followeeRef, { followersCount: FieldValue.increment(1) });
  });
}

export async function unfollow(followerId: string, followeeId: string): Promise<void> {
  const followRef = db.collection('follows').doc(followId(followerId, followeeId));
  const followerRef = db.collection('users').doc(followerId);
  const followeeRef = db.collection('users').doc(followeeId);

  await db.runTransaction(async (tx) => {
    const existing = await tx.get(followRef);
    if (!existing.exists) return; // idempotent

    tx.delete(followRef);
    tx.update(followerRef, { followingCount: FieldValue.increment(-1) });
    tx.update(followeeRef, { followersCount: FieldValue.increment(-1) });
  });
}

export async function isFollowing(followerId: string, followeeId: string): Promise<boolean> {
  const doc = await db.collection('follows').doc(followId(followerId, followeeId)).get();
  return doc.exists;
}

/** Fetch follower UserProfile records of a given user, up to `limit`. */
export async function getFollowers(userId: string, limit = 100): Promise<UserProfile[]> {
  const snap = await db
    .collection('follows')
    .where('followeeId', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();
  const ids = snap.docs.map((d) => d.data().followerId as string);
  if (ids.length === 0) return [];
  return fetchUsers(ids);
}

/** Fetch UserProfile records followed by a given user. */
export async function getFollowing(userId: string, limit = 100): Promise<UserProfile[]> {
  const snap = await db
    .collection('follows')
    .where('followerId', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();
  const ids = snap.docs.map((d) => d.data().followeeId as string);
  if (ids.length === 0) return [];
  return fetchUsers(ids);
}

async function fetchUsers(ids: string[]): Promise<UserProfile[]> {
  // Firestore caps getAll at 500 refs per call — plenty for our limits.
  const refs = ids.map((id) => db.collection('users').doc(id));
  const snaps = await db.getAll(...refs);
  return snaps
    .filter((s) => s.exists)
    .map((s) => ({ id: s.id, ...(s.data() as Omit<UserProfile, 'id'>) }));
}
