import { SERVED_MODELS } from '@/lib/models';
import type { AIModel } from '@/types';
import type { ArenaReferenceBoard, ArenaReferenceRow } from '@/types/arena';

/**
 * Third-party leaderboards, reproduced under licence.
 *
 * Why this exists: GPTwiki's own board is empty and will stay empty until real
 * battles happen (`docs/gptwiki-arena-plan.md` §9), and an empty leaderboard is
 * a dead page. So we show someone else's board — but as *theirs*, clearly
 * attributed, never merged into ours. The full reasoning, including the sources
 * that were rejected, is in `docs/arena-reference-boards.md`.
 *
 * Pure functions, no I/O. The batch job fetches; this module only validates and
 * maps. That split is what makes the mapping testable without a network.
 */

/**
 * LMArena publishes its own leaderboard as a CC-BY-4.0 dataset, updated daily.
 * We read it through Hugging Face's datasets-server, which serves JSON rows
 * without authentication — so no new dependency and no API key, matching the
 * keyless posture of every other batch job here.
 */
export const LMARENA_SOURCE = {
  sourceId: 'lmarena',
  sourceName: 'LMArena',
  sourceUrl: 'https://lmarena.ai/',
  datasetUrl: 'https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  board: 'text · overall',
} as const;

/** The dataset config and split we read. */
export const LMARENA_CONFIG = 'text';
export const LMARENA_SPLIT = 'latest';

/**
 * The category we reproduce.
 *
 * Only `overall`. LMArena also publishes `coding`, `math` and others, but their
 * category names are not our `ArenaCategory` names, and mapping one onto the
 * other would be a guess — a guess presented inside attributed data, which is
 * the worst place to put one.
 */
export const LMARENA_CATEGORY = 'overall';

/** Rows to keep. Past ~100 the tail carries no information for a reader. */
export const MAX_ROWS = 100;

/** datasets-server caps a single page at 100 rows. */
export const PAGE_SIZE = 100;

/** Build the datasets-server URL for one page of rows. */
export function rowsUrl(offset: number, length: number = PAGE_SIZE): string {
  const params = new URLSearchParams({
    dataset: 'lmarena-ai/leaderboard-dataset',
    config: LMARENA_CONFIG,
    split: LMARENA_SPLIT,
    offset: String(offset),
    length: String(length),
  });
  return `https://datasets-server.huggingface.co/rows?${params}`;
}

/** A row as datasets-server returns it. Every field is unvalidated input. */
export interface RawArenaRow {
  model_name?: unknown;
  organization?: unknown;
  license?: unknown;
  rating?: unknown;
  rating_lower?: unknown;
  rating_upper?: unknown;
  vote_count?: unknown;
  rank?: unknown;
  category?: unknown;
  leaderboard_publish_date?: unknown;
}

function str(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

/**
 * Strict numeric coercion.
 *
 * Deliberately not `Number(value)`: that maps `null`, `''` and `false` to 0 and
 * `true` to 1, so a row whose rating the source omitted would be published as a
 * rating of 0 — a number we invented, attributed to someone else. Only a real
 * finite number, or a non-empty string holding one, is accepted.
 */
function num(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value.trim()) {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

/**
 * The exact provider model ids GPTwiki serves, for the `served` flag.
 *
 * Read from `SERVED_MODELS` rather than restated, so changing which model a
 * provider slot points at cannot silently desynchronise this from the board.
 */
export function servedModelIds(): string[] {
  return (Object.keys(SERVED_MODELS) as AIModel[]).map((m) => SERVED_MODELS[m].id);
}

/**
 * Map one raw row, or `null` if it is unusable.
 *
 * Rejects rather than repairs. A row with a missing rating could be rendered
 * with a dash, but this board's entire value is that it is a faithful
 * reproduction of someone else's published numbers — a partially-invented row
 * attributed to LMArena is worse than a missing one.
 */
export function toReferenceRow(raw: RawArenaRow, served: ReadonlySet<string>): ArenaReferenceRow | null {
  const modelName = str(raw.model_name);
  const rank = num(raw.rank);
  const rating = num(raw.rating);
  const ratingLow = num(raw.rating_lower);
  const ratingHigh = num(raw.rating_upper);
  const votes = num(raw.vote_count);
  if (!modelName || rank === null || rating === null) return null;
  if (ratingLow === null || ratingHigh === null || votes === null) return null;
  // An inverted interval means we misread the schema, not that the model is
  // unusual. Better to drop the row than to render a negative-width interval.
  if (ratingHigh < ratingLow) return null;
  if (rank < 1) return null;

  return {
    rank: Math.round(rank),
    modelName,
    // The source leaves `organization` empty for some rows; that is its data,
    // so it is reproduced as empty rather than filled in with a guess.
    organization: str(raw.organization) ?? '',
    modelLicense: str(raw.license) ?? '',
    rating,
    ratingLow,
    ratingHigh,
    votes: Math.max(0, Math.round(votes)),
    served: served.has(modelName),
  };
}

export interface BuildBoardOptions {
  /** Reference time for `fetchedAt`, injected so results are reproducible. */
  now: number;
  maxRows?: number;
  /** Overridden in tests; defaults to what `models.ts` says we serve. */
  servedIds?: readonly string[];
}

/**
 * Build the stored board from raw rows.
 *
 * Filters to the one category we reproduce, drops unusable rows, sorts by rank,
 * and records which served models the source does not rank at all.
 */
export function buildReferenceBoard(
  rawRows: readonly RawArenaRow[],
  options: BuildBoardOptions
): ArenaReferenceBoard | null {
  const servedIds = options.servedIds ?? servedModelIds();
  const served = new Set(servedIds);
  const limit = options.maxRows ?? MAX_ROWS;

  const inCategory = rawRows.filter((r) => str(r.category) === LMARENA_CATEGORY);
  if (inCategory.length === 0) return null;

  const rows = inCategory
    .map((r) => toReferenceRow(r, served))
    .filter((r): r is ArenaReferenceRow => r !== null)
    // Rank ties break on model name so two runs over the same data cannot
    // reorder the table with nothing having changed.
    .sort((a, b) => a.rank - b.rank || (a.modelName < b.modelName ? -1 : 1));
  if (rows.length === 0) return null;

  // Absence is measured against the WHOLE category, not the truncated table:
  // a model ranked 150th is ranked, it simply is not shown.
  const rankedNames = new Set(
    inCategory.map((r) => str(r.model_name)).filter((n): n is string => n !== null)
  );
  const unrankedServedModels = servedIds.filter((id) => !rankedNames.has(id));

  // The publish date is the source's, and every row in a `latest` split shares
  // it. Taking the first non-empty one avoids inventing a date if one row is
  // malformed.
  const publishedAt =
    inCategory.map((r) => str(r.leaderboard_publish_date)).find((d) => d !== null) ?? '';

  return {
    ...LMARENA_SOURCE,
    publishedAt,
    fetchedAt: options.now,
    rows: rows.slice(0, limit),
    unrankedServedModels,
  };
}
