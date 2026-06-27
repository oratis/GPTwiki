import { db } from '@/lib/firebase';
import type { AIModel } from '@/types';

// Off by default: the platform bears no AI cost unless the operator
// explicitly enables a free tier (product decision 2026-06: BYOK-only).
const DEFAULT_DAILY_LIMIT = 0;

// The cheapest model the platform serves free-tier traffic on. Pinning every
// free generation to one inexpensive model is what makes the global daily cap
// below a meaningful cost ceiling.
const DEFAULT_FREE_TIER_MODEL: AIModel = 'gemini';
const VALID_MODELS: readonly AIModel[] = ['claude', 'gpt', 'gemini'];

/**
 * Daily number of platform-keyed AI generations each signed-in user gets for
 * free. Disabled (0) unless FREE_DAILY_MESSAGES is set to a positive number.
 */
export function freeDailyLimit(): number {
  const raw = Number(process.env.FREE_DAILY_MESSAGES);
  return Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : DEFAULT_DAILY_LIMIT;
}

/**
 * Platform-wide ceiling on free generations per UTC day, across all users.
 * The cost backstop for a traffic spike (e.g. an HN front-page flood): once
 * the platform has served this many free messages today, the free tier shuts
 * off and everyone falls back to BYOK until midnight UTC. 0 = no global cap.
 */
export function globalDailyLimit(): number {
  const raw = Number(process.env.FREE_GLOBAL_DAILY_MESSAGES);
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
}

/** The model all free-tier generations are routed to (cheapest by default). */
export function freeTierModel(): AIModel {
  const raw = process.env.FREE_TIER_MODEL as AIModel | undefined;
  return raw && VALID_MODELS.includes(raw) ? raw : DEFAULT_FREE_TIER_MODEL;
}

// UTC day stamp, e.g. "2026-06-10" — quota resets at midnight UTC.
function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Which limit caused a denial — the caller maps these to different UX. */
export type QuotaDenial = 'user' | 'global';

export interface QuotaResult {
  ok: boolean;
  remaining: number;
  /** Set when ok is false: which limit was hit. */
  reason?: QuotaDenial;
}

/**
 * Atomically consume one unit of free quota, enforcing BOTH the per-user daily
 * limit and the platform-wide daily cap in a single transaction.
 *
 * Per-user usage lives on the user doc (`freeQuota: { date, used }`); the
 * global tally lives on a shared counter doc (`meta/freeQuota`). Both are read
 * and written in the same transaction so the two limits stay consistent across
 * Cloud Run instances. Fails closed: any error means we don't burn the key.
 */
export async function consumeFreeQuota(userId: string): Promise<QuotaResult> {
  const limit = freeDailyLimit();
  if (limit <= 0) return { ok: false, remaining: 0, reason: 'user' };

  const globalLimit = globalDailyLimit();
  const userRef = db.collection('users').doc(userId);
  const globalRef = db.collection('meta').doc('freeQuota');
  const today = todayStamp();

  try {
    return await db.runTransaction(async (tx) => {
      // Firestore requires all reads before any writes.
      const userSnap = await tx.get(userRef);
      const globalSnap = globalLimit > 0 ? await tx.get(globalRef) : null;

      const userQuota = (userSnap.get('freeQuota') ?? {}) as { date?: string; used?: number };
      const userUsed = userQuota.date === today ? userQuota.used ?? 0 : 0;
      if (userUsed >= limit) return { ok: false, remaining: 0, reason: 'user' };

      if (globalSnap) {
        const g = (globalSnap.get('counter') ?? {}) as { date?: string; used?: number };
        const globalUsed = g.date === today ? g.used ?? 0 : 0;
        // Global cap hit: deny without touching the user's quota, so nobody
        // burns a personal message they couldn't actually use.
        if (globalUsed >= globalLimit) return { ok: false, remaining: 0, reason: 'global' };
        tx.set(globalRef, { counter: { date: today, used: globalUsed + 1 } }, { merge: true });
      }

      tx.set(userRef, { freeQuota: { date: today, used: userUsed + 1 } }, { merge: true });
      return { ok: true, remaining: limit - userUsed - 1 };
    });
  } catch (e) {
    console.error('Free quota transaction failed:', e);
    return { ok: false, remaining: 0, reason: 'user' };
  }
}
