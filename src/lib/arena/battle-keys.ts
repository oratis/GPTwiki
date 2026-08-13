import type { AIModel, UserApiKeys } from '@/types';
import { getUserApiKeys, getUserEmail } from '@/lib/search';
import {
  arenaDailyBattleLimit,
  consumeArenaBattleQuota,
  refundArenaBattleQuota,
} from '@/lib/ai/free-quota';
import type { ModelPair } from './pairing';

/**
 * Key resolution for battles.
 *
 * Deliberately not `resolveApiKeyForUser`: that function *consumes* a quota unit
 * as a side effect of answering "is a key available?", which is wrong twice over
 * here. A battle needs to know what is possible before it picks a pair, and it
 * needs both sides resolved together — resolving them one at a time can burn a
 * unit on the first model and then fail on the second, leaving the user charged
 * for a battle that never happened.
 *
 * Default posture is BYOK, matching the 2026-06 product decision recorded in
 * `free-quota.ts`: with `ARENA_FREE_DAILY_BATTLES` unset, a battle requires the
 * user to hold keys for both providers and the platform pays nothing.
 */

const OWNER_EMAIL = process.env.PLATFORM_OWNER_EMAIL || 'wangharp@gmail.com';

const ALL_MODELS: AIModel[] = ['claude', 'gpt', 'gemini'];

function userKeyFor(model: AIModel, keys?: UserApiKeys | null): string | undefined {
  if (!keys) return undefined;
  switch (model) {
    case 'claude': return keys.anthropic;
    case 'gpt': return keys.openai;
    case 'gemini': return keys.google;
  }
}

function envKeyFor(model: AIModel): string | undefined {
  switch (model) {
    case 'claude': return process.env.ANTHROPIC_API_KEY;
    case 'gpt': return process.env.OPENAI_API_KEY;
    case 'gemini': return process.env.GOOGLE_AI_API_KEY;
  }
}

export interface BattleAvailability {
  /** Models the battle may draw from. */
  models: AIModel[];
  /** Models covered by the user's own keys — these never touch platform quota. */
  ownKeyModels: AIModel[];
  /** True when the platform would fund at least one side of a battle. */
  usesPlatformKey: boolean;
  /**
   * The user document's contents, carried so `resolveBattleKeys` does not have
   * to read `users/{userId}` all over again.
   */
  userKeys: UserApiKeys | null;
  email: string | null;
}

/**
 * Which models this user can battle with, without consuming anything.
 *
 * Platform keys are only offered when the operator has enabled the arena free
 * tier, or to the owner account (which is unmetered elsewhere too).
 */
export async function getBattleAvailability(userId: string): Promise<BattleAvailability> {
  const [userKeys, email] = await Promise.all([getUserApiKeys(userId), getUserEmail(userId)]);

  const ownKeyModels = ALL_MODELS.filter((m) => Boolean(userKeyFor(m, userKeys)));
  const platformAllowed = email === OWNER_EMAIL || arenaDailyBattleLimit() > 0;
  const platformModels = platformAllowed
    ? ALL_MODELS.filter((m) => !ownKeyModels.includes(m) && Boolean(envKeyFor(m)))
    : [];

  return {
    models: [...ownKeyModels, ...platformModels],
    ownKeyModels,
    usesPlatformKey: platformModels.length > 0,
    userKeys,
    email,
  };
}

export type BattleKeyFailure =
  | 'NOT_ENOUGH_MODELS'  // fewer than two providers reachable
  | 'QUOTA_EXHAUSTED';   // arena free tier enabled but used up today

export type BattleKeyResult =
  | {
      ok: true;
      keyA: string;
      keyB: string;
      platformFunded: boolean;
      /** True when a quota unit was actually charged, so it can be refunded. */
      metered: boolean;
    }
  | { ok: false; reason: BattleKeyFailure };

/**
 * Resolve both sides of a battle at once, charging arena quota only if the
 * platform is actually paying for a side.
 */
export async function resolveBattleKeys(
  userId: string,
  pair: ModelPair,
  availability: BattleAvailability
): Promise<BattleKeyResult> {
  // `availability` is passed in rather than re-fetched. Both `getUserApiKeys`
  // and `getUserEmail` read the same `users/{userId}` document, so recomputing
  // it here cost six reads of one doc per battle (and three AES-GCM decrypt
  // passes over the stored keys) on the feature's most latency-sensitive path.
  const usable = new Set(availability.models);
  if (!usable.has(pair.modelA) || !usable.has(pair.modelB)) {
    return { ok: false, reason: 'NOT_ENOUGH_MODELS' };
  }

  const { userKeys, email } = availability;
  const resolve = (model: AIModel) => userKeyFor(model, userKeys) ?? envKeyFor(model);

  const keyA = resolve(pair.modelA);
  const keyB = resolve(pair.modelB);
  if (!keyA || !keyB) return { ok: false, reason: 'NOT_ENOUGH_MODELS' };

  const own = new Set(availability.ownKeyModels);
  const platformFunded = !own.has(pair.modelA) || !own.has(pair.modelB);

  // Charge once per battle, and only when the platform is footing a side. The
  // owner account is exempt, matching resolveApiKeyForUser.
  const metered = platformFunded && arenaDailyBattleLimit() > 0 && email !== OWNER_EMAIL;
  if (metered) {
    const quota = await consumeArenaBattleQuota(userId);
    if (!quota.ok) return { ok: false, reason: 'QUOTA_EXHAUSTED' };
  }

  return { ok: true, keyA, keyB, platformFunded, metered };
}

/**
 * Give back a battle charged by `resolveBattleKeys` that produced nothing.
 *
 * The meter is debited before generation starts, because that is the only point
 * at which refusing is still cheap. When the battle then fails or the reader
 * walks away, no document is written and the user has nothing to show for the
 * unit — so it goes back. Safe to call when `metered` was false; it is a no-op.
 */
export async function refundBattle(userId: string, metered: boolean): Promise<void> {
  if (!metered) return;
  await refundArenaBattleQuota(userId);
}
