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
