import { db } from '@/lib/firebase';

// Off by default: the platform bears no AI cost unless the operator
// explicitly enables a free tier (product decision 2026-06: BYOK-only).
const DEFAULT_DAILY_LIMIT = 0;

function readLimit(envVar: string): number {
  const raw = Number(process.env[envVar]);
  return Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : DEFAULT_DAILY_LIMIT;
}

/**
 * Daily number of platform-keyed AI generations each signed-in user gets for
 * free. Disabled (0) unless FREE_DAILY_MESSAGES is set to a positive number.
 */
export function freeDailyLimit(): number {
  return readLimit('FREE_DAILY_MESSAGES');
}

/**
 * Daily number of platform-funded Arena battles per user. Separate meter from
 * chat, and off by default for the same reason: a battle costs two generations,
 * so letting it draw on platform keys is a decision the operator makes
 * explicitly rather than one this feature makes for them.
 */
export function arenaDailyBattleLimit(): number {
  return readLimit('ARENA_FREE_DAILY_BATTLES');
}

/**
 * Daily platform-funded Arena battles per client address, for visitors who are
 * not signed in.
 *
 * A third meter rather than a reuse of the one above, because the two carry
 * different risk. A signed-in user is one person who went through OAuth; an
 * address is a weaker claim about identity, and it is the only handle an
 * anonymous visitor cannot change by clearing a cookie. Keeping the limits
 * separate lets the operator open anonymous battles at a lower ceiling — or
 * close them alone — without touching what signed-in users get.
 *
 * Off by default, like its two siblings: opening a path that spends provider
 * keys with no sign-in in front of it is a decision the operator makes
 * explicitly.
 */
export function arenaAnonDailyBattleLimit(): number {
  return readLimit('ARENA_ANON_DAILY_BATTLES');
}

// UTC day stamp, e.g. "2026-06-10" — quota resets at midnight UTC.
function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Atomically consume `units` from one daily meter.
 *
 * Takes the document rather than a user id because the same meter shape now
 * lives in two places: on `users/{id}` for signed-in quotas, and on
 * `arenaAnonQuota/{ipHash}` for visitors who have no user document at all.
 *
 * Stored under `field: { date, used }` so it is shared across Cloud Run
 * instances (unlike the in-memory rate limiter). Fails closed: if the
 * transaction errors we don't burn the platform key.
 */
async function consumeDailyQuota(
  ref: FirebaseFirestore.DocumentReference,
  field: string,
  limit: number,
  units = 1
): Promise<{ ok: boolean; remaining: number }> {
  if (limit <= 0 || units <= 0) return { ok: false, remaining: 0 };

  try {
    return await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const quota = (snap.get(field) ?? {}) as { date?: string; used?: number };
      const today = todayStamp();
      const used = quota.date === today ? quota.used ?? 0 : 0;
      if (used + units > limit) return { ok: false, remaining: Math.max(0, limit - used) };
      tx.set(ref, { [field]: { date: today, used: used + units } }, { merge: true });
      return { ok: true, remaining: limit - used - units };
    });
  } catch (e) {
    console.error(`Daily quota transaction failed (${field}):`, e);
    return { ok: false, remaining: 0 };
  }
}

/** Consume one platform-keyed chat generation from the user's free tier. */
export async function consumeFreeQuota(
  userId: string
): Promise<{ ok: boolean; remaining: number }> {
  return consumeDailyQuota(db.collection('users').doc(userId), 'freeQuota', freeDailyLimit());
}

/**
 * Consume one platform-funded Arena battle. Metered per *battle*, not per
 * answer — the user asked one question, and charging them twice for the two
 * sides they did not choose would make the meter unreadable.
 */
export async function consumeArenaBattleQuota(
  userId: string
): Promise<{ ok: boolean; remaining: number }> {
  return consumeDailyQuota(
    db.collection('users').doc(userId),
    'arenaQuota',
    arenaDailyBattleLimit()
  );
}

/**
 * Where an anonymous visitor's daily battle count lives.
 *
 * A collection of its own rather than a field on some user document, because
 * there is no user. One document per distinct client-address hash, reused every
 * day — so the collection grows with the number of addresses ever seen, not
 * with traffic. If that ever becomes a real number, put a Firestore TTL policy
 * on a stored expiry field; nothing here needs the history.
 */
const ANON_QUOTA = 'arenaAnonQuota';

/**
 * Consume one platform-funded battle for an unauthenticated visitor.
 *
 * `ipKey` is the salted hash from `arena/anon.ts`, never a raw address.
 */
export async function consumeAnonArenaBattleQuota(
  ipKey: string
): Promise<{ ok: boolean; remaining: number }> {
  return consumeDailyQuota(
    db.collection(ANON_QUOTA).doc(ipKey),
    'arenaQuota',
    arenaAnonDailyBattleLimit()
  );
}

/**
 * Give back one Arena battle that was charged but produced nothing.
 *
 * The debit has to happen before generation starts — that is the only moment
 * where declining is still free — so a battle that then fails, or whose reader
 * disconnects mid-stream, would otherwise cost the user a unit for an article
 * and a vote they never got.
 *
 * Only refunds within the same UTC day the charge was made: if the day already
 * rolled over the counter has reset and decrementing it would hand back a unit
 * that was never spent from today's allowance. Clamped at zero for the same
 * reason. Failures are logged, not thrown — losing a refund is a far smaller
 * problem than failing the request that is trying to report an earlier failure.
 */
export async function refundArenaBattleQuota(userId: string): Promise<void> {
  return refundBattleAt(db.collection('users').doc(userId));
}

/** The anonymous counterpart, against the address-keyed meter. */
export async function refundAnonArenaBattleQuota(ipKey: string): Promise<void> {
  return refundBattleAt(db.collection(ANON_QUOTA).doc(ipKey));
}

async function refundBattleAt(ref: FirebaseFirestore.DocumentReference): Promise<void> {
  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const quota = (snap.get('arenaQuota') ?? {}) as { date?: string; used?: number };
      if (quota.date !== todayStamp()) return;
      const used = Math.max(0, (quota.used ?? 0) - 1);
      tx.set(ref, { arenaQuota: { date: quota.date, used } }, { merge: true });
    });
  } catch (e) {
    console.error('Arena battle refund failed:', e);
  }
}
