import { z } from 'zod';
import type { AIModel } from '@/types';

/**
 * Per-model token prices, for the Pareto view (rating against cost).
 *
 * Operator-supplied via `ARENA_MODEL_PRICING`, deliberately not a table in this
 * file. Two reasons, and the second is the important one:
 *
 *  1. Provider prices change on their own schedule, so a committed table is
 *     stale the first time any vendor reprices, and nothing in CI would notice.
 *  2. GPTwiki serves three vendors. Writing numbers for all three means
 *     committing figures for vendors whose current pricing this repo has no
 *     authoritative source for — and a silently wrong x-axis makes the Pareto
 *     view worse than absent, because a wrong chart still looks like a chart.
 *
 * So: unset means the view says "not configured" rather than guessing. A
 * partially-filled table is treated the same as unset for any model it omits —
 * a model with no price simply has no position on the cost axis.
 *
 * Format (USD per million tokens):
 *   ARENA_MODEL_PRICING='{"claude":{"in":3,"out":15},"gpt":{"in":2.5,"out":10}}'
 */

const priceSchema = z.object({
  /** USD per million input tokens. */
  in: z.number().nonnegative(),
  /** USD per million output tokens. */
  out: z.number().nonnegative(),
});

/**
 * Every model optional, unknown keys rejected. Not `z.record` over a model
 * enum: that requires *every* key to be present, so pricing one model would
 * reject the whole table — and a partial table is the normal case while an
 * operator is still filling prices in.
 */
const pricingSchema = z.strictObject({
  claude: priceSchema.optional(),
  gpt: priceSchema.optional(),
  gemini: priceSchema.optional(),
});

export type ModelPrice = z.infer<typeof priceSchema>;
export type ModelPricing = Partial<Record<AIModel, ModelPrice>>;

/**
 * Parse a pricing table. Returns `{}` for absent or malformed input — a bad
 * value must not take a page down, and the Pareto view already renders an
 * unconfigured state.
 */
export function parseModelPricing(raw: string | undefined): ModelPricing {
  if (!raw?.trim()) return {};
  try {
    const parsed = pricingSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      console.warn('[arena] ARENA_MODEL_PRICING failed validation — ignoring:', parsed.error.issues);
      return {};
    }
    return parsed.data;
  } catch (err) {
    console.warn('[arena] ARENA_MODEL_PRICING is not valid JSON — ignoring:', (err as Error).message);
    return {};
  }
}

export function getModelPricing(): ModelPricing {
  return parseModelPricing(process.env.ARENA_MODEL_PRICING);
}

/**
 * Blended cost per million tokens, used as the Pareto cost axis.
 *
 * Weighted 1:3 input:output because an arena answer is a short question and a
 * long reply — pricing a battle by input tokens alone would rank the models by
 * the cheapest thing they do rather than by what a battle actually costs.
 */
export function blendedCost(price: ModelPrice): number {
  return (price.in + 3 * price.out) / 4;
}

export interface ParetoPoint {
  model: string;
  score: number;
  cost: number;
  /** True when no other point is both cheaper and better. */
  onFrontier: boolean;
}

/**
 * Build the Pareto set: for each priced, non-provisional model, whether any
 * other model dominates it on both axes (higher score AND lower cost).
 *
 * Models without a published score or without a configured price are omitted —
 * they have no coordinate on one of the axes, and placing them at zero would
 * invent a data point.
 */
export function buildParetoPoints(
  rows: ReadonlyArray<{ model: string; score: number | null }>,
  pricing: ModelPricing
): ParetoPoint[] {
  const points = rows.flatMap((row) => {
    const price = pricing[row.model as AIModel];
    if (row.score === null || !price) return [];
    return [{ model: row.model, score: row.score, cost: blendedCost(price) }];
  });

  return points.map((point) => ({
    ...point,
    onFrontier: !points.some(
      (other) =>
        other !== point &&
        other.score >= point.score &&
        other.cost <= point.cost &&
        (other.score > point.score || other.cost < point.cost)
    ),
  }));
}
