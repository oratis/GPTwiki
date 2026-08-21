import { db } from './firebase';
import { FieldValue, type QueryDocumentSnapshot } from 'firebase-admin/firestore';
import type {
  Wiki,
  UserProfile,
  PublicUserProfile,
  UserApiKeys,
  ThreadReply,
  WikiContributor,
  WikiRevision,
} from '@/types';
import { encryptSecret, decryptSecret } from './crypto';
import { hasHeaderImage } from './header-image';
import {
  SEARCH_STOPWORDS,
  tokenize,
  scriptAwareTokens,
  buildSearchKeywords,
} from './search-keywords';
import { cachedForTTL } from './ttl-cache';
import {
  isTypesenseEnabled,
  searchWikiIdsTypesense,
  upsertWikiToTypesense,
  toTypesenseDoc,
} from './typesense';

/**
 * Which backend is answering searches, logged once per process.
 *
 * The unconfigured case was the silent one. `typesense.ts` returns `null` from
 * `config()` when TYPESENSE_HOST/TYPESENSE_API_KEY are missing and `searchWikis`
 * simply skips the whole block, so a deployment running entirely on the
 * Firestore keyword fallback looked identical in the logs to one running on
 * Typesense. Production is in exactly that state today, which is fine as a
 * design — it is documented as an optional backend — but "fine" and "invisible"
 * are different things, and it should be answerable from Cloud Logging rather
 * than by reading the service's env vars.
 *
 * Deliberately once per process, not per query: this is a startup fact, and
 * `searchWikis` is a hot path.
 */
let searchBackendLogged = false;
function logSearchBackendOnce(): void {
  if (searchBackendLogged) return;
  searchBackendLogged = true;
  console.log(
    JSON.stringify({
      msg: 'search_backend',
      backend: isTypesenseEnabled() ? 'typesense' : 'firestore',
    })
  );
}

/**
 * Structured record of a Typesense query that did not serve the result.
 *
 * `reason` is the part that matters. "Typesense returned nothing" and
 * "Typesense is broken" both ended up on the Firestore path, so from the
 * outside a degraded backend was indistinguishable from a genuinely empty
 * result set — which also makes any "queries with zero results" content-gap
 * metric unreliable, since it silently mixes the two.
 *
 * The query text itself is not logged, only its length: search terms are user
 * content and do not belong in operational logs.
 */
function logSearchFallback(
  reason: 'zero_hits' | 'ids_not_hydrated' | 'error',
  queryLength: number,
  startedAt: number,
  error?: unknown
): void {
  console.log(
    JSON.stringify({
      msg: 'search_fallback',
      from: 'typesense',
      to: 'firestore',
      reason,
      queryLength,
      durationMs: Date.now() - startedAt,
      ...(error !== undefined
        ? {
            error: error instanceof Error ? error.message : String(error),
            errorName: error instanceof Error ? error.name : undefined,
          }
        : {}),
    })
  );
}

/**
 * How long whole-site query results (popular wikis, the tag cloud) stay
 * memoized. Both are identical for every visitor and only drift as views
 * accumulate, so five minutes of staleness is invisible — while turning a
 * per-request Firestore scan into at most one query per instance per window.
 * Both feed request-scoped, rate-limited routes, so the caching has to sit
 * here rather than on the routes; see ttl-cache.ts.
 */
const SITEWIDE_TTL_MS = 5 * 60_000;

/**
 * Keyword search over wikis, ranked by relevance.
 *
 * Candidates come from the per-doc `keywords` index (whole-collection recall;
 * see search-keywords.ts and scripts/backfill-keywords.ts), exact tag matches,
 * and a recent-doc window, then get scored in memory.
 */
export async function searchWikis(query: string, limit = 10): Promise<Wiki[]> {
  if (!query.trim()) return [];
  logSearchBackendOnce();

  // Primary path: Typesense (typo tolerance, whole-collection ranking).
  // Any error or zero-hit result falls through to the Firestore flow, so a
  // down/unsynced search server degrades quality, never availability. Each way
  // of falling through is now logged with its reason — the fallthrough itself
  // is unchanged, only its visibility.
  if (isTypesenseEnabled()) {
    const startedAt = Date.now();
    try {
      const ids = await searchWikiIdsTypesense(query.trim(), limit);
      if (ids.length > 0) {
        const refs = ids.map((id) => db.collection('wikis').doc(id));
        const snaps = await db.getAll(...refs);
        const byId = new Map(
          snaps.filter((s) => s.exists).map((s) => [s.id, { id: s.id, ...s.data() } as Wiki])
        );
        const hits = ids.map((id) => byId.get(id)).filter((w): w is Wiki => !!w);
        if (hits.length > 0) return hits;
        // Typesense matched ids that no longer resolve to documents — the
        // index is stale relative to Firestore, which is worth distinguishing
        // from an honestly empty result.
        logSearchFallback('ids_not_hydrated', query.trim().length, startedAt);
      } else {
        logSearchFallback('zero_hits', query.trim().length, startedAt);
      }
    } catch (e) {
      console.error('Typesense search failed, falling back to Firestore:', e);
      logSearchFallback('error', query.trim().length, startedAt, e);
    }
  }

  const tokens = tokenize(query).filter((w) => w.length > 1);
  // Drop stopwords for signal; if the query is *only* stopwords, fall back to
  // the raw tokens so we still return something rather than nothing.
  let keywords = tokens.filter((w) => !SEARCH_STOPWORDS.has(w));
  if (keywords.length === 0) keywords = tokens;
  // Script-aware tokens (CJK/Thai bigrams + latin words) drive the indexed
  // keyword lookup; the whitespace tokens above drive in-memory scoring.
  const indexTokens = scriptAwareTokens(query);
  if (keywords.length === 0 && indexTokens.length === 0) return [];
  if (keywords.length === 0) keywords = indexTokens;
  const phrase = keywords.join(' ');

  // Candidate set, de-duplicated by id:
  // 1. keywords-index matches — whole-collection recall for any doc whose
  //    indexed tokens overlap the query (docs written before the backfill
  //    simply lack the field and fall through to the other two pools)
  // 2. exact tag matches (high precision)
  // 3. a recent-doc pool for title/question substring hits
  const candidates = new Map<string, FirebaseFirestore.DocumentData>();

  if (indexTokens.length > 0) {
    const kwSnap = await db
      .collection('wikis')
      .where('keywords', 'array-contains-any', indexTokens.slice(0, 10))
      .limit(100)
      .get();
    kwSnap.docs.forEach((doc) => candidates.set(doc.id, doc.data()));
  }

  const tagSnap = await db
    .collection('wikis')
    .where('tags', 'array-contains-any', keywords.slice(0, 10))
    .limit(50)
    .get();
  tagSnap.docs.forEach((doc) => {
    if (!candidates.has(doc.id)) candidates.set(doc.id, doc.data());
  });

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
 * Served off the `(hasHeaderImage ASC, views DESC)` index, so the query
 * reads exactly `limit` documents regardless of how sparse header images
 * are. It used to page `views desc` and filter `imageUrl` in memory —
 * Firestore can't combine `where('imageUrl', '!=', null)` with
 * `orderBy('views')`, and image-less docs omit the field entirely rather
 * than storing null — which made the read count a function of the corpus's
 * image density rather than of `limit`: up to 2,400 reads per call, on
 * paths that run per request. `hasHeaderImage` is the same predicate
 * denormalised onto the doc so an index can answer it (header-image.ts).
 *
 * When `language` is supplied we narrow to that locale via
 * `(language ASC, hasHeaderImage ASC, views DESC)`. If that index hasn't
 * been created yet (e.g. fresh project), Firestore throws
 * FAILED_PRECONDITION; we log it and fall back to the unfiltered query so
 * the page still renders.
 */
export async function getPopularWikis(limit = 12, language?: string): Promise<Wiki[]> {
  return cachedForTTL(`popular:${limit}:${language ?? '*'}`, SITEWIDE_TTL_MS, async () => {
    try {
      return await collectPopularWikis(limit, language);
    } catch (err) {
      if (language && isMissingIndexError(err)) {
        console.warn(
          `[getPopularWikis] Composite index (language, hasHeaderImage, views desc) missing — falling back to unfiltered. Create it at the URL in the error log to enable per-locale popular wikis.`
        );
        return collectPopularWikis(limit);
      }
      throw err;
    }
  });
}

async function collectPopularWikis(limit: number, language?: string): Promise<Wiki[]> {
  const docs = await topImageWikis(limit, language);
  return docs.map((doc) => ({ id: doc.id, ...doc.data() } as Wiki));
}

/**
 * IDs of the wikis `getPopularWikis(limit)` would return. For callers that
 * only need ids (generateStaticParams), the query is projected down to
 * `imageUrl` and `views` — full docs carry whole conversation payloads,
 * which made the unprojected window scan take ~70s.
 */
export async function getPopularWikiIds(limit = 50): Promise<string[]> {
  const docs = await topImageWikis(limit, undefined, ['imageUrl', 'views']);
  return docs.map((doc) => doc.id);
}

async function topImageWikis(
  limit: number,
  language?: string,
  fields?: string[]
): Promise<QueryDocumentSnapshot[]> {
  try {
    let query: FirebaseFirestore.Query = db
      .collection('wikis')
      .where('hasHeaderImage', '==', true);
    if (language) query = query.where('language', '==', language);
    query = query.orderBy('views', 'desc');
    if (fields) query = query.select(...fields);
    return (await query.limit(limit).get()).docs;
  } catch (err) {
    // A language-scoped miss is worth reporting upward: getPopularWikis
    // retries unfiltered, which is still index-backed. An unfiltered miss
    // has nowhere left to go (the transition-period scan is gone now that
    // the corpus is backfilled), so render without the section rather than
    // 500 the home page of a fresh project.
    if (!isMissingIndexError(err) || language) throw err;
    console.error(
      `[getPopularWikis] Composite index (hasHeaderImage, views desc) missing — returning empty. Deploy firestore.indexes.json.`
    );
    return [];
  }
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
  data: Omit<Wiki, 'id' | 'views' | 'createdAt' | 'updatedAt'>,
  /**
   * Write at a caller-chosen id instead of letting Firestore pick one.
   *
   * Used where the id has to exist before the document does — the arena's
   * publish flow reserves an id, records it as the battle's published article
   * in a transaction, and only then writes here, so a concurrent second
   * publish finds the claim already taken rather than minting a duplicate.
   */
  id?: string
): Promise<string> {
  const createdAt = Date.now();
  const payload = {
    ...data,
    keywords: buildSearchKeywords([data.title, data.question, data.tags?.join(' '), data.summary]),
    // Derived after the spread so a caller can't hand us a flag that
    // disagrees with imageUrl and poison the popular-wikis index.
    hasHeaderImage: hasHeaderImage(data),
    views: 0,
    createdAt,
    updatedAt: createdAt,
  };
  const ref = id ? db.collection('wikis').doc(id) : db.collection('wikis').doc();
  await ref.set(payload);

  // Best-effort search indexing — never blocks or fails the write.
  if (isTypesenseEnabled()) {
    upsertWikiToTypesense(
      toTypesenseDoc(ref.id, { ...data, views: 0, createdAt })
    ).catch((e) => console.error('Typesense index (create) failed:', e));
  }

  // Increment user wiki count. Atomic: the read-then-write it replaces both
  // cost an extra document read per publish and lost updates when the same
  // author published twice concurrently. update() still rejects on a missing
  // user doc, which is the old `if (userDoc.exists)` guard without the read.
  await db
    .collection('users')
    .doc(data.authorId)
    .update({ wikisCount: FieldValue.increment(1) })
    .catch((e) => console.error('Failed to increment wikisCount:', e));

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
  const stored = doc.data()?.apiKeys as UserApiKeys | undefined;
  if (!stored) return null;
  // Decrypt at the storage boundary so callers always see plaintext.
  const out: UserApiKeys = {};
  for (const k of ['anthropic', 'openai', 'google'] as const) {
    const v = stored[k];
    if (v) out[k] = decryptSecret(v);
  }
  return out;
}

export async function getUserEmail(userId: string): Promise<string | null> {
  const doc = await db.collection('users').doc(userId).get();
  if (!doc.exists) return null;
  return doc.data()?.email || null;
}

export async function updateUserApiKeys(userId: string, apiKeys: UserApiKeys): Promise<void> {
  // Encrypt each provider key before persisting.
  const encrypted: UserApiKeys = {};
  for (const k of ['anthropic', 'openai', 'google'] as const) {
    const v = apiKeys[k];
    if (v) encrypted[k] = encryptSecret(v);
  }
  await db.collection('users').doc(userId).update({ apiKeys: encrypted });
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

/**
 * Tag cloud, counted over the 500 most recent wikis.
 *
 * There is no aggregate query for this shape, so the count is unavoidably a
 * 500-document read — which is why it's memoized rather than run per
 * request: /api/tags and the browse page are both whole-site, request-time
 * callers, and the answer is the same for everyone.
 */
export async function getAllTags(
  language?: string
): Promise<{ name: string; count: number }[]> {
  return cachedForTTL(`tags:${language ?? '*'}`, SITEWIDE_TTL_MS, async () => {
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
  });
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

// The updatable field list deliberately excludes `imageUrl`: nothing here
// can invalidate `hasHeaderImage`. Widening it means recomputing the flag
// alongside (see header-image.ts).
export async function updateWiki(
  id: string,
  data: Partial<Pick<Wiki, 'title' | 'content' | 'summary' | 'tags' | 'sources' | 'conversation'>>
): Promise<void> {
  const update: Record<string, unknown> = { ...data, updatedAt: Date.now() };

  // Keep the keywords index in sync when searchable fields change. One extra
  // read per update — updates are rare relative to searches.
  if (data.title !== undefined || data.summary !== undefined || data.tags !== undefined) {
    const doc = await db.collection('wikis').doc(id).get();
    const existing = doc.data() ?? {};
    update.keywords = buildSearchKeywords([
      data.title ?? existing.title,
      existing.question,
      (data.tags ?? existing.tags)?.join(' '),
      data.summary ?? existing.summary,
    ]);
  }

  await db.collection('wikis').doc(id).update(update);

  // Best-effort search re-indexing with the merged doc state.
  if (isTypesenseEnabled()) {
    db.collection('wikis')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) return upsertWikiToTypesense(toTypesenseDoc(id, doc.data()!));
      })
      .catch((e) => console.error('Typesense index (update) failed:', e));
  }
}

// ─── Revisions ───

/** How many past versions to keep per wiki. */
const REVISION_CAP = 20;

/**
 * Snapshot the wiki's current content into the `revisions` subcollection.
 * Called before each merge/update so the previous version is never lost.
 * Keeps only the last REVISION_CAP snapshots.
 */
export async function pushWikiRevision(
  wikiId: string,
  editorId: string,
  editorName: string
): Promise<void> {
  const wikiRef = db.collection('wikis').doc(wikiId);
  const doc = await wikiRef.get();
  if (!doc.exists) return;
  const data = doc.data()!;

  await wikiRef.collection('revisions').add({
    title: data.title ?? '',
    content: data.content ?? '',
    summary: data.summary ?? '',
    updatedAt: data.updatedAt ?? data.createdAt ?? Date.now(),
    editorId,
    editorName,
  });

  // updatedAt is strictly increasing per edit, so it doubles as the
  // revision order. Drop everything past the cap.
  const overflow = await wikiRef
    .collection('revisions')
    .orderBy('updatedAt', 'desc')
    .offset(REVISION_CAP)
    .get();
  if (!overflow.empty) {
    const batch = db.batch();
    overflow.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
}

/**
 * Revision metadata for the "edit history" list — content is excluded via a
 * field mask since the list only shows who edited and when.
 */
export async function getWikiRevisions(
  wikiId: string,
  limit = REVISION_CAP
): Promise<Array<Omit<WikiRevision, 'content'>>> {
  const snapshot = await db
    .collection('wikis')
    .doc(wikiId)
    .collection('revisions')
    .orderBy('updatedAt', 'desc')
    .select('title', 'summary', 'updatedAt', 'editorId', 'editorName')
    .limit(limit)
    .get();

  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Omit<WikiRevision, 'content'>)
  );
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

export async function getThreadReply(
  wikiId: string,
  threadId: string
): Promise<ThreadReply | null> {
  const doc = await db
    .collection('wikis')
    .doc(wikiId)
    .collection('threads')
    .doc(threadId)
    .get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as ThreadReply;
}

/**
 * Record a successful thread→article merge: stamp the thread so it can't be
 * merged twice, and credit the thread author on the wiki doc (unless they're
 * the wiki author or already credited).
 */
export async function recordThreadMerge(
  wikiId: string,
  threadId: string,
  mergedBy: string,
  contributor: WikiContributor | null
): Promise<void> {
  const wikiRef = db.collection('wikis').doc(wikiId);

  await wikiRef.collection('threads').doc(threadId).update({
    mergedAt: Date.now(),
    mergedBy,
  });

  if (contributor) {
    // arrayUnion dedupes the id list; the object list is guarded by the
    // caller checking contributorIds first (merges are author-only and
    // serial, so a read-then-write race is not a practical concern).
    await wikiRef.update({
      contributorIds: FieldValue.arrayUnion(contributor.id),
      contributors: FieldValue.arrayUnion(
        contributor.image
          ? { id: contributor.id, name: contributor.name, image: contributor.image }
          : { id: contributor.id, name: contributor.name }
      ),
    });
  }
}
