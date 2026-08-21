import type { AIModel, UserApiKeys } from '@/types';
import { getUserApiKeys, getUserEmail } from '@/lib/search';
import {
  arenaAnonDailyBattleLimit,
  arenaDailyBattleLimit,
  consumeAnonArenaBattleQuota,
  consumeArenaBattleQuota,
  refundAnonArenaBattleQuota,
  refundArenaBattleQuota,
} from '@/lib/ai/free-quota';
import { isPlatformOwner } from '@/lib/ai/platform-owner';
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
  const platformAllowed = isPlatformOwner(email) || arenaDailyBattleLimit() > 0;
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

/**
 * What an unauthenticated visitor may battle with.
 *
 * Platform keys only — an anonymous visitor has no stored keys of their own, by
 * definition. So unlike the signed-in path, this is entirely gated on the
 * operator having opted in: with `ARENA_ANON_DAILY_BATTLES` unset the model
 * list is empty and no battle can start, which is the same posture the other
 * two meters take.
 */
export function getAnonBattleAvailability(): BattleAvailability {
  const enabled = arenaAnonDailyBattleLimit() > 0;
  return {
    models: enabled ? ALL_MODELS.filter((m) => Boolean(envKeyFor(m))) : [],
    // Nothing here is covered by the visitor's own key, so every battle they
    // run is platform-funded and therefore always metered.
    ownKeyModels: [],
    usesPlatformKey: enabled,
    userKeys: null,
    email: null,
  };
}

/**
 * Resolve both sides of an anonymous battle, charging the address-keyed meter.
 *
 * Separate from `resolveBattleKeys` rather than a flag on it, because the two
 * differ in the one place that matters: what gets charged. The signed-in path
 * skips metering when the user's own keys pay and exempts the owner account;
 * neither can apply here, so an anonymous battle is *always* metered and there
 * is no branch that could accidentally let one through free.
 */
export async function resolveAnonBattleKeys(
  ipKey: string,
  pair: ModelPair
): Promise<BattleKeyResult> {
  if (arenaAnonDailyBattleLimit() <= 0) return { ok: false, reason: 'ANON_DISABLED' };

  const keyA = envKeyFor(pair.modelA);
  const keyB = envKeyFor(pair.modelB);
  if (!keyA || !keyB) return { ok: false, reason: 'NOT_ENOUGH_MODELS' };

  const quota = await consumeAnonArenaBattleQuota(ipKey);
  if (!quota.ok) return { ok: false, reason: 'QUOTA_EXHAUSTED' };

  return { ok: true, keyA, keyB, platformFunded: true, metered: true };
}

/** Give back an anonymous battle that produced nothing. */
export async function refundAnonBattle(ipKey: string, metered: boolean): Promise<void> {
  if (!metered) return;
  await refundAnonArenaBattleQuota(ipKey);
}

export type BattleKeyFailure =
  | 'NOT_ENOUGH_MODELS'  // fewer than two providers reachable
  | 'QUOTA_EXHAUSTED'    // arena free tier enabled but used up today
  | 'ANON_DISABLED';     // operator has not opened battles to signed-out visitors

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
  //
  // `!isPlatformOwner(email)` rather than `email !== OWNER_EMAIL`: the bare
  // comparison skipped metering whenever both sides were nullish, so on a
  // deployment with no owner configured, a user with no email on file got
  // platform-funded battles that were never charged to any meter.
  const metered = platformFunded && arenaDailyBattleLimit() > 0 && !isPlatformOwner(email);
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
