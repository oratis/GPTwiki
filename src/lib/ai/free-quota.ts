import { db } from '@/lib/firebase';

// Off by default: the platform bears no AI cost unless the operator
// explicitly enables a free tier (product decision 2026-06: BYOK-only).
const DEFAULT_DAILY_LIMIT = 0;

/**
 * Daily number of platform-keyed AI generations each signed-in user gets for
 * free. Disabled (0) unless FREE_DAILY_MESSAGES is set to a positive number.
 */
export function freeDailyLimit(): number {
  const raw = Number(process.env.FREE_DAILY_MESSAGES);
  return Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : DEFAULT_DAILY_LIMIT;
}

// UTC day stamp, e.g. "2026-06-10" — quota resets at midnight UTC.
function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Atomically consume one unit of the user's free daily quota.
 *
 * Stored on the user doc as `freeQuota: { date, used }` so it is shared
 * across Cloud Run instances (unlike the in-memory rate limiter). Fails
 * closed: if the transaction errors we don't burn the platform key.
 */
export async function consumeFreeQuota(
  userId: string
): Promise<{ ok: boolean; remaining: number }> {
  const limit = freeDailyLimit();
  if (limit <= 0) return { ok: false, remaining: 0 };

  const ref = db.collection('users').doc(userId);
  try {
    return await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const quota = (snap.get('freeQuota') ?? {}) as { date?: string; used?: number };
      const today = todayStamp();
      const used = quota.date === today ? quota.used ?? 0 : 0;
      if (used >= limit) return { ok: false, remaining: 0 };
      tx.set(ref, { freeQuota: { date: today, used: used + 1 } }, { merge: true });
      return { ok: true, remaining: limit - used - 1 };
    });
  } catch (e) {
    console.error('Free quota transaction failed:', e);
    return { ok: false, remaining: 0 };
  }
}
