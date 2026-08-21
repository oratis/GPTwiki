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

/**
 * Platform-wide ceiling on free AI generations per UTC day — the backstop the
 * three meters above cannot be.
 *
 * Each of them bounds one *identity*: a user id, or an address hash. Neither
 * bounds how many identities exist. The anonymous arena meter is the sharp
 * edge: at ARENA_ANON_DAILY_BATTLES=2 a single address gets two battles, but
 * nothing caps the number of addresses, and every anonymous battle spends
 * platform keys by definition. This counter is the one number that does not
 * scale with how many callers show up.
 *
 * Returns null when the variable is unset or empty, meaning *no global cap* —
 * deliberately not the 0-means-off convention its siblings use. 0 there
 * disables a free tier that was already off by default; 0 here would switch
 * off a free tier that is on in production, so an unset variable has to leave
 * behaviour exactly as it is. Arming the cap is an explicit act:
 *
 *   gcloud run services update gptwiki \
 *     --update-env-vars FREE_GLOBAL_DAILY_GENERATIONS=2000
 *
 * Counted in *generations*, not per-meter units, because the meters do not
 * agree on what a unit is: a chat message is one generation, an arena battle
 * is two. A budget has to be denominated in the thing that costs money.
 */
export function globalDailyGenerationLimit(): number | null {
  const raw = process.env.FREE_GLOBAL_DAILY_GENERATIONS?.trim();
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
}

/** An arena battle answers the same question twice — two generations, one unit. */
export const GENERATIONS_PER_BATTLE = 2;

/** Where the platform-wide daily counter lives. One document, one field. */
function globalQuotaRef(): FirebaseFirestore.DocumentReference {
  return db.collection('meta').doc('freeQuota');
}

/**
 * Why a consumption was refused. `meter` is the caller's own daily allowance;
 * `global` is the platform-wide cap, which says nothing about this caller and
 * is the operator's problem, not theirs; `error` is a failed transaction,
 * which fails closed.
 */
export type QuotaDenial = 'meter' | 'global' | 'error';

export interface QuotaResult {
  ok: boolean;
  /** Units left on the *caller's* meter, unchanged by a global refusal. */
  remaining: number;
  reason?: QuotaDenial;
}

// UTC day stamp, e.g. "2026-06-10" — quota resets at midnight UTC.
function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

/** A stored meter: the day it belongs to, and how much of it is spent. */
export interface StoredQuota {
  date?: string;
  used?: number;
}

/**
 * Decide a consumption against both meters — pure, so it can be tested without
 * a Firestore emulator. `consumeDailyQuota` does the reads, applies this, and
 * writes back whatever it returns.
 *
 * A stamp from a previous day counts as zero rather than being cleared: the
 * reset is implicit in the comparison, so no scheduled job has to run at
 * midnight for the quota to roll over.
 */
export function decideConsumption(input: {
  today: string;
  meter: StoredQuota;
  meterLimit: number;
  units: number;
  global: StoredQuota | null;
  globalLimit: number | null;
  generations: number;
}): { ok: true; meterUsed: number; globalUsed: number | null; remaining: number } | {
  ok: false;
  remaining: number;
  reason: QuotaDenial;
} {
  const { today, meter, meterLimit, units, global, globalLimit, generations } = input;

  if (meterLimit <= 0 || units <= 0) return { ok: false, remaining: 0, reason: 'meter' };

  const used = meter.date === today ? meter.used ?? 0 : 0;
  if (used + units > meterLimit) {
    return { ok: false, remaining: Math.max(0, meterLimit - used), reason: 'meter' };
  }

  const remaining = meterLimit - used - units;

  if (globalLimit === null || global === null) {
    return { ok: true, meterUsed: used + units, globalUsed: null, remaining };
  }

  const gUsed = global.date === today ? global.used ?? 0 : 0;
  if (gUsed + generations > globalLimit) {
    // The caller's own meter is untouched — this refusal is about the platform.
    return { ok: false, remaining: Math.max(0, meterLimit - used), reason: 'global' };
  }

  return { ok: true, meterUsed: used + units, globalUsed: gUsed + generations, remaining };
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
  units = 1,
  generations = units
): Promise<QuotaResult> {
  if (limit <= 0 || units <= 0) return { ok: false, remaining: 0, reason: 'meter' };

  const globalLimit = globalDailyGenerationLimit();

  try {
    return await db.runTransaction(async (tx) => {
      // Both reads first: Firestore transactions forbid a read after a write.
      // The global document is not read at all when no cap is configured, so
      // an uncapped deployment pays nothing for this.
      const snap = await tx.get(ref);
      const globalRef = globalLimit === null ? null : globalQuotaRef();
      const globalSnap = globalRef ? await tx.get(globalRef) : null;

      const today = todayStamp();
      const decision = decideConsumption({
        today,
        meter: (snap.get(field) ?? {}) as StoredQuota,
        meterLimit: limit,
        units,
        global: globalSnap ? ((globalSnap.get('global') ?? {}) as StoredQuota) : null,
        globalLimit,
        generations,
      });

      if (!decision.ok) {
        if (decision.reason === 'global') {
          // The operator needs to see this; nothing in the response tells the
          // caller apart from someone who simply used up their own allowance.
          console.warn(
            `[free-quota] Global daily cap of ${globalLimit} generations reached — ` +
              `refusing a ${field} request for ${generations}. Free generations resume after ${today} (UTC).`
          );
        }
        return decision;
      }

      if (globalRef && decision.globalUsed !== null) {
        tx.set(globalRef, { global: { date: today, used: decision.globalUsed } }, { merge: true });
      }
      tx.set(ref, { [field]: { date: today, used: decision.meterUsed } }, { merge: true });
      return { ok: true, remaining: decision.remaining };
    });
  } catch (e) {
    console.error(`Daily quota transaction failed (${field}):`, e);
    return { ok: false, remaining: 0, reason: 'error' };
  }
}

/** Consume one platform-keyed chat generation from the user's free tier. */
export async function consumeFreeQuota(userId: string): Promise<QuotaResult> {
  return consumeDailyQuota(db.collection('users').doc(userId), 'freeQuota', freeDailyLimit());
}

/**
 * Consume one platform-funded Arena battle. Metered per *battle*, not per
 * answer — the user asked one question, and charging them twice for the two
 * sides they did not choose would make the meter unreadable.
 */
export async function consumeArenaBattleQuota(userId: string): Promise<QuotaResult> {
  return consumeDailyQuota(
    db.collection('users').doc(userId),
    'arenaQuota',
    arenaDailyBattleLimit(),
    1,
    GENERATIONS_PER_BATTLE
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
export async function consumeAnonArenaBattleQuota(ipKey: string): Promise<QuotaResult> {
  return consumeDailyQuota(
    db.collection(ANON_QUOTA).doc(ipKey),
    'arenaQuota',
    arenaAnonDailyBattleLimit(),
    1,
    GENERATIONS_PER_BATTLE
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
  const globalLimit = globalDailyGenerationLimit();
  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      // Reads before writes, and only when a cap is configured.
      const globalRef = globalLimit === null ? null : globalQuotaRef();
      const globalSnap = globalRef ? await tx.get(globalRef) : null;

      const today = todayStamp();
      const quota = (snap.get('arenaQuota') ?? {}) as { date?: string; used?: number };
      if (quota.date !== today) return;

      // The global counter is given back too, or a day of failed battles
      // would eat the platform's budget without producing anything.
      if (globalRef && globalSnap) {
        const g = (globalSnap.get('global') ?? {}) as { date?: string; used?: number };
        if (g.date === today) {
          const gUsed = Math.max(0, (g.used ?? 0) - GENERATIONS_PER_BATTLE);
          tx.set(globalRef, { global: { date: today, used: gUsed } }, { merge: true });
        }
      }

      const used = Math.max(0, (quota.used ?? 0) - 1);
      tx.set(ref, { arenaQuota: { date: quota.date, used } }, { merge: true });
    });
  } catch (e) {
    console.error('Arena battle refund failed:', e);
  }
}
