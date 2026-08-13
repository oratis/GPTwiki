import type { AIModel } from '@/types';

/** Slot assignment for one battle. `modelA` is shown first. */
export interface ModelPair {
  modelA: AIModel;
  modelB: AIModel;
}

/**
 * Pick two distinct models and randomise which one occupies slot A.
 *
 * The slot randomisation is load-bearing, not cosmetic. If a model is always
 * shown first, its strength and the display-position advantage become perfectly
 * collinear, and the rating fit charges the entire effect to position — measured
 * at δ = 5.876 in `scripts/test-arena-scoring.ts` before the fixtures were
 * fixed. Without randomising here, the leaderboard reads "shown first" as
 * "stronger". Residual imbalance across pairings is then handled by the fit's
 * per-pair weight balancing.
 *
 * `random` is injectable so the choice is testable; production passes nothing.
 */
export function pickModelPair(
  available: AIModel[],
  random: () => number = Math.random
): ModelPair | null {
  const pool = [...new Set(available)];
  if (pool.length < 2) return null;

  const first = Math.min(pool.length - 1, Math.floor(random() * pool.length));
  const [picked] = pool.splice(first, 1);

  const second = Math.min(pool.length - 1, Math.floor(random() * pool.length));
  const opponent = pool[second];

  // Coin flip for the slot, so neither model is systematically shown first.
  return random() < 0.5
    ? { modelA: picked, modelB: opponent }
    : { modelA: opponent, modelB: picked };
}
