import type { AIModel, UserApiKeys } from '@/types';
import { getUserApiKeys, getUserEmail } from '@/lib/search';
import { consumeFreeQuota, freeDailyLimit, freeTierModel } from './free-quota';

const OWNER_EMAIL = process.env.PLATFORM_OWNER_EMAIL || 'wangharp@gmail.com';

export interface ResolvedKey {
  apiKey: string | null;
  /**
   * The model the caller should actually generate with. Usually the requested
   * model, but free-tier traffic is routed to the cheapest model (see
   * free-quota.ts), so callers MUST stream with this — not the request model —
   * or they'll hand a key to the wrong provider.
   */
  model: AIModel;
  /** No key available for this model at all — the user must add their own. */
  needsConfig: boolean;
  /** A platform key exists but the user's free daily quota is used up. */
  quotaExhausted: boolean;
}

/**
 * Resolves the API key (and effective model) for a given model and user.
 * Priority:
 * 1. User's own API key — unlimited, honors their model choice.
 * 2. Platform env key:
 *    - Owner account → unlimited on the requested model.
 *    - Everyone else → metered free tier, routed to the cheapest model and
 *      bounded by both a per-user and a global daily cap (see free-quota.ts).
 * 3. None — needsConfig (no platform key / free tier off / global cap hit) or
 *    quotaExhausted (this user's personal free tier is used up for today).
 */
export async function resolveApiKeyForUser(
  model: AIModel,
  userId: string
): Promise<ResolvedKey> {
  // 1. User's own key for the requested model wins — unlimited.
  const userKeys = await getUserApiKeys(userId);
  const userKey = getKeyForModel(model, userKeys);
  if (userKey) {
    return { apiKey: userKey, model, needsConfig: false, quotaExhausted: false };
  }

  // 2. Owner → unlimited on the platform key for the requested model.
  const email = await getUserEmail(userId);
  if (email === OWNER_EMAIL) {
    const envKey = getEnvKeyForModel(model);
    if (envKey) {
      return { apiKey: envKey, model, needsConfig: false, quotaExhausted: false };
    }
    return { apiKey: null, model, needsConfig: true, quotaExhausted: false };
  }

  // 3. Free tier disabled → behave as BYOK-only: "add your key", not "quota
  //    used up" (the user never had a quota to use).
  if (freeDailyLimit() <= 0) {
    return { apiKey: null, model, needsConfig: true, quotaExhausted: false };
  }

  // 4. Free tier: serve on the cheapest model the platform can key, regardless
  //    of which model the user picked, to keep cost bounded.
  const cheap = freeTierModel();
  let effModel = cheap;
  let effKey = getEnvKeyForModel(cheap);
  if (!effKey) {
    // Platform has no key for the cheap model — fall back to the requested one.
    effModel = model;
    effKey = getEnvKeyForModel(model);
  }
  if (!effKey) {
    // No platform key at all → BYOK.
    return { apiKey: null, model, needsConfig: true, quotaExhausted: false };
  }

  const quota = await consumeFreeQuota(userId);
  if (quota.ok) {
    return { apiKey: effKey, model: effModel, needsConfig: false, quotaExhausted: false };
  }
  // Global cap hit → silently downgrade to BYOK (platform cost backstop).
  // Per-user cap hit → tell the user their daily free quota is used up.
  if (quota.reason === 'global') {
    return { apiKey: null, model, needsConfig: true, quotaExhausted: false };
  }
  return { apiKey: null, model, needsConfig: false, quotaExhausted: true };
}

function getKeyForModel(model: AIModel, keys?: UserApiKeys | null): string | undefined {
  if (!keys) return undefined;
  switch (model) {
    case 'claude': return keys.anthropic;
    case 'gpt': return keys.openai;
    case 'gemini': return keys.google;
  }
}

function getEnvKeyForModel(model: AIModel): string | undefined {
  switch (model) {
    case 'claude': return process.env.ANTHROPIC_API_KEY;
    case 'gpt': return process.env.OPENAI_API_KEY;
    case 'gemini': return process.env.GOOGLE_AI_API_KEY;
  }
}
