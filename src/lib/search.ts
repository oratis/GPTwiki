import { db } from './firebase';
import { FieldValue, type QueryDocumentSnapshot } from 'firebase-admin/firestore';
import type { Wiki, UserProfile, PublicUserProfile, UserApiKeys } from '@/types';

/** A wiki "has a header image" when imageUrl is a non-empty string. */
function hasHeaderImage(data: FirebaseFirestore.DocumentData): boolean {
  return typeof data.imageUrl === 'string' && data.imageUrl.trim().length > 0;
}

// Common words carry no search signal and — because the old substring match
// did `title.includes(kw)` — caused "the"/"is"/"what" to match nearly every
// article (e.g. a "photic sneeze reflex" query surfaced "The Roche Limit").
const SEARCH_STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'for',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am', 'as', 'by', 'from',
  'with', 'about', 'into', 'than', 'then', 'this', 'that', 'these', 'those',
  'it', 'its', 'i', 'you', 'he', 'she', 'we', 'they', 'do', 'does', 'did',
  'can', 'could', 'would', 'should', 'will', 'what', 'who', 'whom', 'whose',
  'which', 'how', 'why', 'when', 'where', 'there', 'here', 'my', 'your',
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/[^\p{L}\p{N}]+/gu, ''))
    .filter(Boolean);
}

/**
 * Keyword search over wikis, ranked by relevance.
 *
 * NOTE: this is not a full-text index — it gathers candidates from exact tag
 * matches plus a bounded window of recent docs, then scores them in memory.
 * Recall across all ~280k articles still needs a dedicated index
 * (Typesense/Algolia, or a tokenized keyword array on each doc); see #14.
 */
export async function searchWikis(query: string, limit = 10): Promise<Wiki[]> {
  if (!query.trim()) return [];

  const tokens = tokenize(query).filter((w) => w.length > 1);
  // Drop stopwords for signal; if the query is *only* stopwords, fall back to
  // the raw tokens so we still return something rather than nothing.
  let keywords = tokens.filter((w) => !SEARCH_STOPWORDS.has(w));
  if (keywords.length === 0) keywords = tokens;
  if (keywords.length === 0) return [];
  const phrase = keywords.join(' ');

  // Candidate set: exact tag matches (high precision) + a recent-doc pool for
  // title/question substring hits. De-duplicated by id.
  const candidates = new Map<string, FirebaseFirestore.DocumentData>();

  const tagSnap = await db
    .collection('wikis')
    .where('tags', 'array-contains-any', keywords.slice(0, 10))
    .limit(50)
    .get();
  tagSnap.docs.forEach((doc) => candidates.set(doc.id, doc.data()));

  const recentSnap = await db
    .collection('wikis')
    .orderBy('createdAt', 'desc')
    .limit(150)
    .get();
  recentSnap.docs.forEach((doc) => {
    if (!candidates.has(doc.id)) candidates.set(doc.id, doc.data());
  });

  // Score each candidate: title hits weigh most, then exact tag, then partial
  // tag / question. Counting distinct keyword hits ranks focused matches above
  // ones that only share an incidental word.
  const scored: { id: string; data: FirebaseFirestore.DocumentData; score: number }[] = [];
  for (const [id, data] of candidates) {
    const title = (data.title || '').toLowerCase();
    const question = (data.question || '').toLowerCase();
    const tags: string[] = (data.tags || []).map((t: string) => t.toLowerCase());

    let score = 0;
    for (const kw of keywords) {
      if (title.includes(kw)) score += 3;
      if (tags.includes(kw)) score += 2;
      else if (tags.some((t) => t.includes(kw))) score += 1;
      if (question.includes(kw)) score += 1;
    }
    // Whole-phrase title match is the strongest signal.
    if (keywords.length > 1 && title.includes(phrase)) score += 4;

    if (score > 0) scored.push({ id, data, score });
  }

  scored.sort(
    (a, b) => b.score - a.score || (b.data.views || 0) - (a.data.views || 0)
  );

  return scored.slice(0, limit).map(({ id, data }) => ({ id, ...data } as Wiki));
}

/**
 * Top wikis by view count, restricted to entries that have a header image.
 *
 * Firestore can't combine `where('imageUrl', '!=', null)` with
 * `orderBy('views')` without a composite index — and docs with no image
 * omit the field entirely rather than storing null. So we page through
 * `views desc` and filter in memory until `limit` image-bearing wikis are
 * collected, capped by `maxScan` to bound the work.
 *
 * When `language` is supplied we narrow the scan to that locale via a
 * composite index on `(language ASC, views DESC)` — without it, the
 * one-in-15 hit rate would push the in-memory filter well past `maxScan`
 * and return too few results. If the index hasn't been created yet (e.g.
 * fresh project), Firestore throws FAILED_PRECONDITION; we log it and
 * fall back to the unfiltered query so the page still renders.
 */
export async function getPopularWikis(limit = 12, language?: string): Promise<Wiki[]> {
  try {
    return await collectPopularWikis(limit, language);
  } catch (err) {
    if (language && isMissingIndexError(err)) {
      console.warn(
        `[getPopularWikis] Composite index (language, views desc) missing — falling back to unfiltered. Create it at the URL in the error log to enable per-locale popular wikis.`
      );
      return collectPopularWikis(limit);
    }
    throw err;
  }
}

async function collectPopularWikis(limit: number, language?: string): Promise<Wiki[]> {
  const results: Wiki[] = [];
  // Wide pages keep this to one Firestore round-trip in the common case.
  const pageSize = Math.max(limit * 16, 200);
  const maxScan = Math.max(limit * 50, 2400);
  let scanned = 0;
  let cursor: QueryDocumentSnapshot | undefined;

  while (results.length < limit && scanned < maxScan) {
    let query = language
      ? db.collection('wikis').where('language', '==', language).orderBy('views', 'desc')
      : db.collection('wikis').orderBy('views', 'desc');
    query = query.limit(pageSize);
    if (cursor) query = query.startAfter(cursor);

    const snapshot = await query.get();
    if (snapshot.empty) break;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (hasHeaderImage(data)) {
        results.push({ id: doc.id, ...data } as Wiki);
        if (results.length >= limit) break;
      }
    }

    scanned += snapshot.size;
    cursor = snapshot.docs[snapshot.docs.length - 1];
    if (snapshot.size < pageSize) break;
  }

  return results.slice(0, limit);
}

export async function getRecentWikis(limit = 12, language?: string): Promise<Wiki[]> {
  try {
    const query = language
      ? db.collection('wikis').where('language', '==', language).orderBy('createdAt', 'desc')
      : db.collection('wikis').orderBy('createdAt', 'desc');
    const snapshot = await query.limit(limit).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Wiki));
  } catch (err) {
    if (language && isMissingIndexError(err)) {
      console.warn(
        `[getRecentWikis] Composite index (language, createdAt desc) missing — falling back to unfiltered.`
      );
      return getRecentWikis(limit);
    }
    throw err;
  }
}

/**
 * Firestore Admin throws code 9 (FAILED_PRECONDITION) when a query needs
 * a composite index that doesn't exist yet; the error message includes a
 * URL to auto-create it.
 */
function isMissingIndexError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const e = err as { code?: number; message?: string };
  return e.code === 9 || (typeof e.message === 'string' && e.message.includes('FAILED_PRECONDITION'));
}

// Pure read — never mutates. View counting is done explicitly via
// incrementWikiViews() so reads from metadata/API/notification paths don't
// inflate the count (it previously wrote on every read, and the wiki page
// read twice, double-counting every view).
export async function getWikiById(id: string): Promise<Wiki | null> {
  const doc = await db.collection('wikis').doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Wiki;
}

// Atomic, fire-and-forget view increment. Swallows errors so a failed write
// never breaks page rendering.
export async function incrementWikiViews(id: string): Promise<void> {
  try {
    await db.collection('wikis').doc(id).update({ views: FieldValue.increment(1) });
  } catch (e) {
    console.error('Failed to increment wiki views:', e);
  }
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

// Project a full UserProfile down to fields safe for unauthenticated clients.
// Allowlist (not denylist) so new private fields don't leak by default.
export function toPublicUserProfile(p: UserProfile): PublicUserProfile {
  return {
    id: p.id,
    name: p.name,
    image: p.image,
    provider: p.provider,
    wikisCount: p.wikisCount,
    createdAt: p.createdAt,
    followersCount: p.followersCount,
    followingCount: p.followingCount,
  };
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
  limit = 12,
  language?: string
): Promise<{ wikis: Wiki[]; nextCursor: number | null }> {
  try {
    let query = language
      ? db.collection('wikis').where('language', '==', language).orderBy('createdAt', 'desc')
      : db.collection('wikis').orderBy('createdAt', 'desc');
    if (cursor) query = query.startAfter(cursor);

    const snapshot = await query.limit(limit).get();
    const wikis = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Wiki));
    const nextCursor = wikis.length === limit ? wikis[wikis.length - 1].createdAt : null;
    return { wikis, nextCursor };
  } catch (err) {
    if (language && isMissingIndexError(err)) {
      console.warn(
        `[getRecentWikisPaginated] Composite index (language, createdAt desc) missing — falling back to unfiltered.`
      );
      return getRecentWikisPaginated(cursor, limit);
    }
    throw err;
  }
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

export async function getAllTags(
  language?: string
): Promise<{ name: string; count: number }[]> {
  try {
    const base = db.collection('wikis');
    const query = (
      language
        ? base.where('language', '==', language).orderBy('createdAt', 'desc')
        : base.orderBy('createdAt', 'desc')
    ).limit(500);

    const snapshot = await query.get();

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
  } catch (err) {
    if (language && isMissingIndexError(err)) {
      console.warn(
        `[getAllTags] Composite index (language, createdAt desc) missing — falling back to unfiltered.`
      );
      return getAllTags();
    }
    throw err;
  }
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

// ─── Thread Replies ───

export async function createThreadReply(
  wikiId: string,
  data: {
    question: string;
    answer: string;
    aiModel: string;
    authorId: string;
    authorName: string;
    authorImage?: string;
    conversation: Array<{ id: string; role: string; content: string; timestamp: number }>;
  }
): Promise<string> {
  const { FieldValue } = await import('firebase-admin/firestore');
  const docRef = await db.collection('wikis').doc(wikiId).collection('threads').add({
    ...data,
    createdAt: Date.now(),
  });
  // Atomically increment threadCount on parent wiki
  await db.collection('wikis').doc(wikiId).update({
    threadCount: FieldValue.increment(1),
  });
  return docRef.id;
}

export async function getThreadReplies(
  wikiId: string,
  cursor?: number,
  limit = 10
): Promise<{ threads: Array<Record<string, unknown> & { id: string; createdAt: number }>; nextCursor: number | null }> {
  let query = db
    .collection('wikis')
    .doc(wikiId)
    .collection('threads')
    .orderBy('createdAt', 'asc')
    .limit(limit + 1);

  if (cursor) {
    query = query.where('createdAt', '>', cursor);
  }

  const snapshot = await query.get();
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Record<string, unknown> & { id: string; createdAt: number }));

  const hasMore = docs.length > limit;
  const threads = hasMore ? docs.slice(0, limit) : docs;
  const nextCursor = hasMore ? (threads[threads.length - 1].createdAt as number) : null;

  return { threads, nextCursor };
}
