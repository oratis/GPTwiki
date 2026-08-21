import type { AIModel, UserApiKeys } from '@/types';
import { getUserApiKeys, getUserEmail } from '@/lib/search';
import { consumeFreeQuota, freeDailyLimit } from './free-quota';
import { isPlatformOwner } from './platform-owner';

export interface ResolvedKey {
  apiKey: string | null;
  /** No key available for this model at all — the user must add their own. */
  needsConfig: boolean;
  /** A platform key exists but the user's free daily quota is used up. */
  quotaExhausted: boolean;
}

/**
 * Resolves the API key for a given model and user.
 * Priority:
 * 1. User's own API key (unlimited)
 * 2. Platform env key — unlimited for the owner account when
 *    PLATFORM_OWNER_EMAIL is configured, metered by the free daily quota
 *    (see free-quota.ts) for everyone else
 * 3. None — either needsConfig (no platform key for this model) or
 *    quotaExhausted (free tier used up for today)
 */
export async function resolveApiKeyForUser(
  model: AIModel,
  userId: string
): Promise<ResolvedKey> {
  // Check user's own keys first
  const userKeys = await getUserApiKeys(userId);
  const userKey = getKeyForModel(model, userKeys);
  if (userKey) {
    return { apiKey: userKey, needsConfig: false, quotaExhausted: false };
  }

  const envKey = getEnvKeyForModel(model);
  if (envKey) {
    const email = await getUserEmail(userId);
    if (isPlatformOwner(email)) {
      return { apiKey: envKey, needsConfig: false, quotaExhausted: false };
    }

    // Free tier disabled → behave as BYOK-only: "add your key", not
    // "quota used up" (the user never had a quota to use).
    if (freeDailyLimit() <= 0) {
      return { apiKey: null, needsConfig: true, quotaExhausted: false };
    }

    const quota = await consumeFreeQuota(userId);
    if (quota.ok) {
      return { apiKey: envKey, needsConfig: false, quotaExhausted: false };
    }
    return { apiKey: null, needsConfig: false, quotaExhausted: true };
  }

  // No key available
  return { apiKey: null, needsConfig: true, quotaExhausted: false };
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
