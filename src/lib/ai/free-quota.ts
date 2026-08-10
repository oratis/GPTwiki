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

// UTC day stamp, e.g. "2026-06-10" — quota resets at midnight UTC.
function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Atomically consume `units` from one of the user's daily meters.
 *
 * Stored on the user doc under `field: { date, used }` so it is shared across
 * Cloud Run instances (unlike the in-memory rate limiter). Fails closed: if the
 * transaction errors we don't burn the platform key.
 */
async function consumeDailyQuota(
  userId: string,
  field: string,
  limit: number,
  units = 1
): Promise<{ ok: boolean; remaining: number }> {
  if (limit <= 0 || units <= 0) return { ok: false, remaining: 0 };

  const ref = db.collection('users').doc(userId);
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
  return consumeDailyQuota(userId, 'freeQuota', freeDailyLimit());
}

/**
 * Consume one platform-funded Arena battle. Metered per *battle*, not per
 * answer — the user asked one question, and charging them twice for the two
 * sides they did not choose would make the meter unreadable.
 */
export async function consumeArenaBattleQuota(
  userId: string
): Promise<{ ok: boolean; remaining: number }> {
  return consumeDailyQuota(userId, 'arenaQuota', arenaDailyBattleLimit());
}
