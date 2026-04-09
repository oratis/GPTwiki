import type { AIModel, UserApiKeys } from '@/types';
import { getUserApiKeys, getUserEmail } from '@/lib/search';

const FALLBACK_EMAIL = 'wangharp@gmail.com';

/**
 * Resolves the API key for a given model and user.
 * Priority:
 * 1. User's own API key
 * 2. System env var (only for wangharp@gmail.com)
 * 3. null (user must configure their own key)
 */
export async function resolveApiKeyForUser(
  model: AIModel,
  userId: string
): Promise<{ apiKey: string | null; needsConfig: boolean }> {
  // Check user's own keys first
  const userKeys = await getUserApiKeys(userId);
  const userKey = getKeyForModel(model, userKeys);

  if (userKey) {
    return { apiKey: userKey, needsConfig: false };
  }

  // Check if this is the fallback user
  const email = await getUserEmail(userId);
  if (email === FALLBACK_EMAIL) {
    const envKey = getEnvKeyForModel(model);
    if (envKey) {
      return { apiKey: envKey, needsConfig: false };
    }
  }

  // No key available
  return { apiKey: null, needsConfig: true };
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
