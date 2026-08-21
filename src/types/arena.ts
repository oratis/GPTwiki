import type { AIModel } from './index';

/** How a voter judged a battle. `both_bad` is recorded but excluded from the fit. */
export type ArenaOutcome = 'a' | 'b' | 'tie' | 'both_bad';

/**
 * One anonymous head-to-head. `modelA`/`modelB` are the *slot* assignment, not
 * a canonical ordering — the slot is randomised per battle so the position
 * advantage can be regressed out (see `fitRatings`).
 */
export interface ArenaBattle {
  id: string;
  prompt: string;
  /** Hash of the normalised prompt, used to drop a voter's repeats. */
  promptHash: string;
  locale: string;
  modelA: AIModel;
  modelB: AIModel;
  answerA: string;
  answerB: string;
  /** Set once the voter has voted; identities stay hidden until then. */
  revealedAt?: number;
  createdAt: number;
}

/** Why a vote was excluded from the rating fit. */
export type ArenaVoteFlag =
  | 'anonymous'      // not signed in
  | 'duplicate'      // same voter, same promptHash, within the dedup window
  | 'identity_leak'  // an answer named its own model, breaking anonymity
  | 'anomalous';     // flagged by the voting-pattern filter

export interface ArenaVote {
  id: string;
  battleId: string;
  /**
   * Denormalised from the battle so the per-voter dedup check is a single
   * query instead of a vote query plus a fan-out of battle reads.
   */
  promptHash: string;
  outcome: ArenaOutcome;
  voterId: string;
  /** 1 = counts toward rankings, 0 = recorded only. Never anything else today. */
  weight: number;
  flags: ArenaVoteFlag[];
  createdAt: number;
}

/** One row of the public leaderboard. */
export interface ArenaModelRating {
  model: string;
  /**
   * Display-scale Bradley-Terry rating, Elo-like (median model = 1000).
   * `null` while the model is `provisional` — a number the sample size cannot
   * support is never published.
   */
  score: number | null;
  ciLow: number | null;
  ciHigh: number | null;
  /** Rank as an interval; models with overlapping intervals share it. */
  rankLow: number | null;
  rankHigh: number | null;
  /** Battles counted in the fit that this model appeared in. */
  votes: number;
  wins: number;
  losses: number;
  ties: number;
  /** "Both bad" votes involving this model — counted, but not fitted. */
  bothBad: number;
  /** True while `votes` is below the publication threshold. */
  provisional: boolean;
}

/**
 * One row of a third-party leaderboard, reproduced under its own licence.
 *
 * Deliberately a separate type from `ArenaModelRating` even though the fields
 * line up almost one-to-one — that similarity is the hazard, not a reason to
 * share a type. GPTwiki's board and an external board rank different models by
 * different votes under different methodologies, and a shared type would let
 * one be passed where the other is expected with no compiler complaint. See
 * `docs/arena-reference-boards.md` §4.
 */
export interface ArenaReferenceRow {
  rank: number;
  modelName: string;
  organization: string;
  /** The model's own licence as the source labels it, e.g. "Proprietary". */
  modelLicense: string;
  rating: number;
  ratingLow: number;
  ratingHigh: number;
  votes: number;
  /**
   * True when this row's model is exactly one GPTwiki serves. Exact match only:
   * `gpt-4o` is not `gpt-4o-2024-05-13`, and guessing at version equivalence
   * next to attributed data would put our inference in someone else's numbers.
   */
  served: boolean;
}

/**
 * A third-party board stored at `arenaRatings/reference`.
 *
 * The attribution fields are required, not optional, because CC-BY compliance
 * is a property of every rendering — making them part of the type means a
 * component cannot display these rows without also having what it needs to
 * credit them.
 */
export interface ArenaReferenceBoard {
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  datasetUrl: string;
  license: string;
  licenseUrl: string;
  /** Which board this is, e.g. "text · overall". */
  board: string;
  /** The date the SOURCE published this ranking. Not our fetch time. */
  publishedAt: string;
  /** When we retrieved it. Kept separate from `publishedAt` on purpose. */
  fetchedAt: number;
  rows: ArenaReferenceRow[];
  /**
   * Models GPTwiki serves that this board does not rank at all. Surfaced rather
   * than left blank — `gemini-2.0-flash` is absent from LMArena's board, and an
   * unexplained gap reads as an oversight instead of a fact about the source.
   */
  unrankedServedModels: string[];
}

/**
 * Precomputed snapshot stored at `arenaRatings/{scope}`. Pages read exactly one
 * of these documents — the fit never runs in the request path.
 */
export interface ArenaRatingSnapshot {
  scope: string;
  models: ArenaModelRating[];
  /** Fitted advantage of the left-hand slot, in log-odds. ~0 means unbiased. */
  positionBias: number;
  /** Battles that reached the fit. */
  effectiveBattles: number;
  /** Battles recorded but excluded (zero weight, or "both bad"). */
  excludedBattles: number;
  /** Minimum `votes` required before a score is published. */
  minVotes: number;
  computedAt: number;
  /** Human-readable method tag, surfaced on /arena/rules. */
  method: string;
}
