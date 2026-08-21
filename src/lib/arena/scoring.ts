import type { ArenaModelRating, ArenaOutcome } from '@/types/arena';

/**
 * Bradley-Terry rating fit for GPTwiki Arena.
 *
 * Pure functions, no I/O, and — deliberately — no LLM anywhere in the call
 * graph. Every number on the public leaderboard is produced here from stored
 * votes by deterministic code; the models only ever write the two answers.
 * That split is the one design rule both reference products converged on (see
 * `docs/arena-research.md` §3.4: "use scripts, not agents").
 *
 * The statistical choices mirror arena.ai's published methodology, each for a
 * reason recorded in `docs/arena-research.md` §2.5:
 *   - Bradley-Terry MLE rather than online Elo, so extra effects (here, slot
 *     position) can be regressed out as covariates instead of suppressed in UI.
 *   - Closed-form covariance rather than bootstrap, so recomputation is cheap
 *     enough to run on every snapshot.
 *   - Ranks reported as intervals, so ordering is never claimed beyond what the
 *     sample supports.
 */

/** Log-odds → display points. Matches Elo's scale so the numbers read familiarly. */
const DISPLAY_SCALE = 400 / Math.LN10;
/** Display rating of a model with average strength. */
const DISPLAY_ANCHOR = 1000;

/** Battles below this vote count publish no score at all. */
export const DEFAULT_MIN_VOTES = 100;

export interface ArenaBattleOutcome {
  modelA: string;
  modelB: string;
  outcome: ArenaOutcome;
  /**
   * Vote weight. 0 keeps the battle on record but out of the fit — that is how
   * anonymous, deduplicated, identity-leaking and anomalous votes are handled.
   */
  weight: number;
}

export interface FitRatingsOptions {
  /** Publication threshold; below it a row stays `provisional`. */
  minVotes?: number;
  /**
   * Ridge penalty on the strength parameters. Serves two purposes: it pins the
   * otherwise-unidentifiable overall level (Bradley-Terry only determines
   * differences), and it keeps an undefeated model's strength finite instead of
   * diverging. Not applied to the position term, which the data identifies.
   */
  ridge?: number;
  /**
   * Normalise each unordered model pair to equal total weight. Prevents one
   * heavily-played pairing from dominating the fit — arena.ai's
   * inverse-proportional reweighting (2025-07-23) solves the same problem.
   */
  balancePairs?: boolean;
  /** Normal quantile for the interval. Default 1.96 ≈ 95%. */
  z?: number;
}

export interface FitRatingsResult {
  models: ArenaModelRating[];
  /**
   * Fitted advantage of the left-hand ("A") slot in log-odds. Positive means
   * voters favoured whichever answer was shown first, independent of model.
   */
  positionBias: number;
  /**
   * Standard error of `positionBias`, on the same log-odds scale. `null` when
   * the covariance is not estimable — see `stdErrs` in `fitRatings`.
   */
  positionBiasStdErr: number | null;
  /** Battles that reached the fit. */
  effectiveBattles: number;
  /** Battles recorded but excluded: zero weight, or "both bad". */
  excludedBattles: number;
  minVotes: number;
  method: string;
}

interface Tally {
  votes: number;
  wins: number;
  losses: number;
  ties: number;
  bothBad: number;
}

function emptyTally(): Tally {
  return { votes: 0, wins: 0, losses: 0, ties: 0, bothBad: 0 };
}

/**
 * Fit ratings over a set of battle outcomes.
 *
 * Ties count as half a win for each side. "Both bad" is excluded from the fit
 * entirely — it says something about the prompt, not about which model is
 * stronger — but is tallied per model so the leaderboard can show it.
 */
export function fitRatings(
  battles: ArenaBattleOutcome[],
  options: FitRatingsOptions = {}
): FitRatingsResult {
  const minVotes = options.minVotes ?? DEFAULT_MIN_VOTES;
  const ridge = options.ridge ?? 0.01;
  const balancePairs = options.balancePairs ?? true;
  const z = options.z ?? 1.96;

  // Every model that appears anywhere gets a row, even if all of its battles
  // were excluded — silently dropping a model would read as "never played".
  const models = [...new Set(battles.flatMap((b) => [b.modelA, b.modelB]))].sort();
  const index = new Map(models.map((m, i) => [m, i]));
  const tallies = new Map(models.map((m) => [m, emptyTally()]));

  const fitted: ArenaBattleOutcome[] = [];
  let excludedBattles = 0;

  for (const b of battles) {
    if (b.weight <= 0) {
      excludedBattles++;
      continue;
    }
    const ta = tallies.get(b.modelA)!;
    const tb = tallies.get(b.modelB)!;
    if (b.outcome === 'both_bad') {
      ta.bothBad++;
      tb.bothBad++;
      excludedBattles++;
      continue;
    }
    ta.votes++;
    tb.votes++;
    if (b.outcome === 'a') {
      ta.wins++;
      tb.losses++;
    } else if (b.outcome === 'b') {
      tb.wins++;
      ta.losses++;
    } else {
      ta.ties++;
      tb.ties++;
    }
    fitted.push(b);
  }

  const weighted = balancePairs ? balancePairWeights(fitted) : fitted;

  const nParams = models.length + 1; // strengths, then the position term
  const positionIdx = models.length;
  const beta = new Array<number>(nParams).fill(0);
  let covariance: number[][] | null = null;

  if (weighted.length > 0 && models.length > 0) {
    fitNewton(weighted, index, beta, positionIdx, ridge);
    covariance = sandwichCovariance(weighted, index, beta, positionIdx, ridge);
  }

  // The ridge pins Σθ = 0 at the optimum (the data term cancels along the
  // all-ones direction). Re-centre so that holds exactly after truncated
  // iterations, rather than to within float error.
  const level = models.length
    ? models.reduce((sum, _m, i) => sum + beta[i], 0) / models.length
    : 0;
  for (let i = 0; i < models.length; i++) beta[i] -= level;

  /**
   * Standard errors, or `null` where the covariance is not estimable — a
   * singular bread matrix (e.g. one model pair only ever shown in one slot
   * order, making strength and position perfectly collinear), or a
   * non-positive variance from float error. A null here forces the row
   * provisional rather than publishing a zero-width interval, which would
   * claim perfect certainty and is the worst thing this function could emit.
   */
  const stdErrs: Array<number | null> = Array.from({ length: nParams }, (_unused, i) => {
    if (!covariance) return null;
    const variance = covariance[i][i];
    return Number.isFinite(variance) && variance > 0 ? Math.sqrt(variance) : null;
  });

  const rows: ArenaModelRating[] = models.map((model, i) => {
    const t = tallies.get(model)!;
    const stdErr = stdErrs[i];
    if (t.votes < minVotes || stdErr === null) {
      return {
        model,
        score: null,
        ciLow: null,
        ciHigh: null,
        rankLow: null,
        rankHigh: null,
        ...t,
        provisional: true,
      };
    }
    const score = DISPLAY_ANCHOR + DISPLAY_SCALE * beta[i];
    const margin = z * stdErr * DISPLAY_SCALE;
    return {
      model,
      score,
      ciLow: score - margin,
      ciHigh: score + margin,
      rankLow: null, // filled in below, once the ranked set is known
      rankHigh: null,
      ...t,
      provisional: false,
    };
  });

  assignRankIntervals(rows);
  // Strongest first; provisional rows sink to the bottom ordered by evidence.
  rows.sort((a, b) => {
    if (a.provisional !== b.provisional) return a.provisional ? 1 : -1;
    if (a.provisional) return b.votes - a.votes;
    return (b.score ?? 0) - (a.score ?? 0);
  });

  return {
    models: rows,
    positionBias: beta[positionIdx],
    positionBiasStdErr: stdErrs[positionIdx],
    effectiveBattles: fitted.length,
    excludedBattles,
    minVotes,
    method:
      'Bradley-Terry MLE (ties = half credit) with a slot-position term, ' +
      'per-pair weight balancing, ridge-pinned level, and closed-form ' +
      'sandwich confidence intervals',
  };
}

/**
 * Scale weights so every unordered pair carries the same total, preserving the
 * grand total. A pair nobody plays cannot be balanced into existence, so pairs
 * absent from the data simply stay absent.
 */
function balancePairWeights(battles: ArenaBattleOutcome[]): ArenaBattleOutcome[] {
  const pairKey = (b: ArenaBattleOutcome) =>
    b.modelA < b.modelB ? `${b.modelA} ${b.modelB}` : `${b.modelB} ${b.modelA}`;

  const pairTotals = new Map<string, number>();
  let grandTotal = 0;
  for (const b of battles) {
    const k = pairKey(b);
    pairTotals.set(k, (pairTotals.get(k) ?? 0) + b.weight);
    grandTotal += b.weight;
  }
  if (pairTotals.size === 0 || grandTotal === 0) return battles;

  const targetPerPair = grandTotal / pairTotals.size;
  return battles.map((b) => {
    const total = pairTotals.get(pairKey(b))!;
    return total > 0 ? { ...b, weight: (b.weight * targetPerPair) / total } : b;
  });
}

/** Outcome as a win fraction for the model in slot A. */
function outcomeToY(outcome: ArenaOutcome): number {
  return outcome === 'a' ? 1 : outcome === 'b' ? 0 : 0.5;
}

/**
 * Newton-Raphson on the penalised log-likelihood.
 *
 * The design row for a battle is +1 at slot A's model, -1 at slot B's, and +1
 * on the position column, so `eta = θ_a - θ_b + δ` and `p = σ(eta)`. Gradient
 * and Hessian are accumulated directly from that sparsity rather than
 * materialising the design matrix.
 */
function fitNewton(
  battles: ArenaBattleOutcome[],
  index: Map<string, number>,
  beta: number[],
  positionIdx: number,
  ridge: number
): void {
  const n = beta.length;

  for (let iter = 0; iter < 200; iter++) {
    const gradient = new Array<number>(n).fill(0);
    const hessian = zeros(n);

    for (const b of battles) {
      const ia = index.get(b.modelA)!;
      const ib = index.get(b.modelB)!;
      const p = sigmoid(beta[ia] - beta[ib] + beta[positionIdx]);
      const residual = b.weight * (outcomeToY(b.outcome) - p);

      gradient[ia] += residual;
      gradient[ib] -= residual;
      gradient[positionIdx] += residual;

      accumulateOuter(hessian, ia, ib, positionIdx, b.weight * p * (1 - p));
    }

    // Ridge on the strengths only; the position term is identified by the data.
    for (let i = 0; i < positionIdx; i++) {
      gradient[i] -= ridge * beta[i];
      hessian[i][i] += ridge;
    }

    const inverse = invert(hessian);
    if (!inverse) return; // singular — keep the last usable estimate
    const step = matVec(inverse, gradient);

    let maxStep = 0;
    for (let i = 0; i < n; i++) {
      beta[i] += step[i];
      maxStep = Math.max(maxStep, Math.abs(step[i]));
    }
    if (maxStep < 1e-12) return;
  }
}

/**
 * Sandwich (Huber/White) covariance: `H⁻¹ M H⁻¹`.
 *
 * Not the plain inverse-Fisher, and that matters here: scoring a tie as half a
 * win is a deliberate misspecification of the Bernoulli variance, so
 * inverse-Fisher would report intervals tighter than the data earns. The
 * sandwich is also what "M-estimator" refers to in arena.ai's 2025-07-23 switch
 * away from bootstrapping.
 */
function sandwichCovariance(
  battles: ArenaBattleOutcome[],
  index: Map<string, number>,
  beta: number[],
  positionIdx: number,
  ridge: number
): number[][] | null {
  const n = beta.length;
  const bread = zeros(n);
  const meat = zeros(n);

  for (const b of battles) {
    const ia = index.get(b.modelA)!;
    const ib = index.get(b.modelB)!;
    const p = sigmoid(beta[ia] - beta[ib] + beta[positionIdx]);
    const residual = outcomeToY(b.outcome) - p;
    accumulateOuter(bread, ia, ib, positionIdx, b.weight * p * (1 - p));
    accumulateOuter(meat, ia, ib, positionIdx, b.weight * b.weight * residual * residual);
  }
  for (let i = 0; i < positionIdx; i++) bread[i][i] += ridge;

  const inverse = invert(bread);
  if (!inverse) return null;
  return matMul(matMul(inverse, meat), inverse);
}

/**
 * Add `v · xxᵀ` for the sparse design row x (+1 at `ia`, -1 at `ib`, +1 at
 * `pos`) into `m`. Written out rather than looped because the row has three
 * non-zeros and this is the innermost accumulation.
 */
function accumulateOuter(m: number[][], ia: number, ib: number, pos: number, v: number): void {
  if (v === 0) return;
  m[ia][ia] += v;
  m[ib][ib] += v;
  m[pos][pos] += v;
  m[ia][ib] -= v;
  m[ib][ia] -= v;
  m[ia][pos] += v;
  m[pos][ia] += v;
  m[ib][pos] -= v;
  m[pos][ib] -= v;
}

/**
 * Rank as an interval. Two models are only ordered when their intervals do not
 * overlap; otherwise they share the same span. Provisional rows are unranked —
 * they have no score to compare.
 */
function assignRankIntervals(rows: ArenaModelRating[]): void {
  const ranked = rows.filter((r) => !r.provisional);
  const beats = (x: ArenaModelRating, y: ArenaModelRating) =>
    (x.ciLow ?? 0) > (y.ciHigh ?? 0);

  for (const row of ranked) {
    const better = ranked.filter((other) => other !== row && beats(other, row)).length;
    const worse = ranked.filter((other) => other !== row && beats(row, other)).length;
    row.rankLow = better + 1;
    row.rankHigh = ranked.length - worse;
  }
}

// ─── Small dense linear algebra (parameter count is model count + 1) ────────

function sigmoid(x: number): number {
  // Split by sign so neither branch overflows exp() for large |x|.
  if (x >= 0) return 1 / (1 + Math.exp(-x));
  const e = Math.exp(x);
  return e / (1 + e);
}

function zeros(n: number): number[][] {
  return Array.from({ length: n }, () => new Array<number>(n).fill(0));
}

function matVec(m: number[][], v: number[]): number[] {
  return m.map((row) => row.reduce((sum, x, j) => sum + x * v[j], 0));
}

function matMul(a: number[][], b: number[][]): number[][] {
  const n = a.length;
  const out = zeros(n);
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      const aik = a[i][k];
      if (aik === 0) continue;
      for (let j = 0; j < n; j++) out[i][j] += aik * b[k][j];
    }
  }
  return out;
}

/** Gauss-Jordan inverse with partial pivoting. Returns null if singular. */
function invert(m: number[][]): number[][] | null {
  const n = m.length;
  const a = m.map((row, i) => {
    const aug = new Array<number>(2 * n).fill(0);
    for (let j = 0; j < n; j++) aug[j] = row[j];
    aug[n + i] = 1;
    return aug;
  });

  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(a[r][col]) > Math.abs(a[pivot][col])) pivot = r;
    }
    if (Math.abs(a[pivot][col]) < 1e-12) return null;
    [a[col], a[pivot]] = [a[pivot], a[col]];

    const d = a[col][col];
    for (let c = 0; c < 2 * n; c++) a[col][c] /= d;

    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = a[r][col];
      if (f === 0) continue;
      for (let c = 0; c < 2 * n; c++) a[r][c] -= f * a[col][c];
    }
  }

  return a.map((row) => row.slice(n));
}
