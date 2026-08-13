import type { AIModel } from '@/types';

/**
 * The model id each provider is actually called with, and its display name.
 *
 * Kept together deliberately. The display names had drifted once already (`gpt`
 * read "GPT-4" long after the call moved to `gpt-4o`), and the arena makes that
 * kind of drift costly rather than cosmetic: the leaderboard's whole claim is
 * that it ranks *these* models, and a rating attached to an unidentified version
 * is neither reproducible nor citable. Anyone changing a model must change the
 * label in the same edit.
 *
 * Keep in sync with the `model:` argument in `src/lib/ai/{claude,openai,gemini}.ts`.
 */
export const SERVED_MODELS: Record<AIModel, { id: string; displayName: string }> = {
  claude: { id: 'claude-sonnet-4-6', displayName: 'Claude Sonnet 4.6' },
  gpt: { id: 'gpt-4o', displayName: 'GPT-4o' },
  gemini: { id: 'gemini-2.0-flash', displayName: 'Gemini 2.0 Flash' },
};

export function getModelDisplayName(model: AIModel): string {
  return SERVED_MODELS[model]?.displayName ?? model;
}

/** The provider model id behind an `AIModel`, for surfaces that cite versions. */
export function getServedModelId(model: AIModel): string {
  return SERVED_MODELS[model]?.id ?? model;
}
