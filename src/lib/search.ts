import { db } from './firebase';
import type { Wiki, UserProfile, UserApiKeys } from '@/types';

export async function searchWikis(query: string, limit = 10): Promise<Wiki[]> {
  if (!query.trim()) return [];

  const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1);

  if (keywords.length === 0) return [];

  // Search by tags first
  const tagResults = await db
    .collection('wikis')
    .where('tags', 'array-contains-any', keywords.slice(0, 10))
    .limit(limit)
    .get();

  const wikis: Wiki[] = [];
  const seenIds = new Set<string>();

  tagResults.docs.forEach((doc) => {
    if (!seenIds.has(doc.id)) {
      seenIds.add(doc.id);
      wikis.push({ id: doc.id, ...doc.data() } as Wiki);
    }
  });

  // If not enough results, do a title-based search
  if (wikis.length < limit) {
    const allWikis = await db
      .collection('wikis')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get();

    allWikis.docs.forEach((doc) => {
      if (seenIds.has(doc.id)) return;
      const data = doc.data();
      const titleLower = (data.title || '').toLowerCase();
      const questionLower = (data.question || '').toLowerCase();
      const matches = keywords.some(
        (kw) => titleLower.includes(kw) || questionLower.includes(kw)
      );
      if (matches && wikis.length < limit) {
        seenIds.add(doc.id);
        wikis.push({ id: doc.id, ...data } as Wiki);
      }
    });
  }

  return wikis;
}

export async function getPopularWikis(limit = 12): Promise<Wiki[]> {
  const snapshot = await db
    .collection('wikis')
    .orderBy('views', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Wiki));
}

export async function getRecentWikis(limit = 12): Promise<Wiki[]> {
  const snapshot = await db
    .collection('wikis')
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Wiki));
}

export async function getWikiById(id: string): Promise<Wiki | null> {
  const doc = await db.collection('wikis').doc(id).get();
  if (!doc.exists) return null;

  // Increment views
  await doc.ref.update({
    views: (doc.data()!.views || 0) + 1,
  });

  return { id: doc.id, ...doc.data() } as Wiki;
}

export async function createWiki(
  data: Omit<Wiki, 'id' | 'views' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const ref = await db.collection('wikis').add({
    ...data,
    views: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  // Increment user wiki count
  const userRef = db.collection('users').doc(data.authorId);
  const userDoc = await userRef.get();
  if (userDoc.exists) {
    await userRef.update({
      wikisCount: (userDoc.data()!.wikisCount || 0) + 1,
    });
  }

  return ref.id;
}

export async function getUserWikis(userId: string): Promise<Wiki[]> {
  const snapshot = await db
    .collection('wikis')
    .where('authorId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Wiki));
}

// ─── Profile ───

export async function getUserProfile(id: string): Promise<UserProfile | null> {
  const doc = await db.collection('users').doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as UserProfile;
}

// ─── API Keys ───

export async function getUserApiKeys(userId: string): Promise<UserApiKeys | null> {
  const doc = await db.collection('users').doc(userId).get();
  if (!doc.exists) return null;
  return (doc.data()?.apiKeys as UserApiKeys) || null;
}

export async function getUserEmail(userId: string): Promise<string | null> {
  const doc = await db.collection('users').doc(userId).get();
  if (!doc.exists) return null;
  return doc.data()?.email || null;
}

export async function updateUserApiKeys(userId: string, apiKeys: UserApiKeys): Promise<void> {
  await db.collection('users').doc(userId).update({ apiKeys });
}

// ─── Paginated Recent Wikis ───

export async function getRecentWikisPaginated(
  cursor?: number,
  limit = 12
): Promise<{ wikis: Wiki[]; nextCursor: number | null }> {
  let query = db.collection('wikis').orderBy('createdAt', 'desc');

  if (cursor) {
    query = query.startAfter(cursor);
  }

  const snapshot = await query.limit(limit).get();
  const wikis = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Wiki));
  const nextCursor = wikis.length === limit ? wikis[wikis.length - 1].createdAt : null;

  return { wikis, nextCursor };
}

// ─── Leaderboard ───

export async function getTopContributors(limit = 20): Promise<UserProfile[]> {
  const snapshot = await db
    .collection('users')
    .orderBy('wikisCount', 'desc')
    .where('wikisCount', '>', 0)
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as UserProfile));
}

// ─── Tags / Categories ───

export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const snapshot = await db
    .collection('wikis')
    .orderBy('createdAt', 'desc')
    .limit(500)
    .get();

  const tagCounts: Record<string, number> = {};
  snapshot.docs.forEach((doc) => {
    const tags = doc.data().tags as string[] | undefined;
    tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getWikisByTag(tag: string, limit = 20): Promise<Wiki[]> {
  const snapshot = await db
    .collection('wikis')
    .where('tags', 'array-contains', tag)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Wiki));
}

// ─── Update Wiki ───

export async function updateWiki(
  id: string,
  data: Partial<Pick<Wiki, 'title' | 'content' | 'summary' | 'tags' | 'conversation'>>
): Promise<void> {
  await db.collection('wikis').doc(id).update({
    ...data,
    updatedAt: Date.now(),
  });
}
