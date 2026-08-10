/**
 * Composite scoring for the article hot list.
 *
 * This is where AI HOT's architecture transfers, and it is the only thing worth
 * taking from it (see `docs/arena-research.md` §3.4 and §4). Their pipeline's
 * value is 168 curated sources and a formula backtested over 100+ parameter
 * combinations — an operational asset built over three years, not something a
 * repo can copy. What *is* copyable is the division of labour they arrived at
 * after V7→V8 regressed: **the model emits sub-scores, deterministic code
 * computes the composite and the thresholds.** Tuning means changing a
 * coefficient here, never editing a prompt.
 *
 * Applied to GPTwiki's own corpus rather than external news: this repo has no
 * ingest pipeline and should not grow one. The inputs are fields the articles
 * already carry.
 *
 * Pure functions, no I/O, no LLM call in this file. The optional `quality`
 * sub-scores are *supplied* to it by a batch job; nothing here obtains them.
 */

/**
 * Provenance tiers, the analogue of AI HOT's T1 / T1.5 / T2 source grading.
 *
 * The ordering is a claim about which content deserves a reader's attention on
 * this site: hand-written editorial first, community answers second, and the
 * Wikipedia mirror last — the mirror is the bulk of the corpus by count and is
 * duplicate-of-Wikipedia by construction, so weighting it equally would bury
 * everything original under sheer volume.
 */
export const SOURCE_TIERS = {
  editorial: 1.0,
  user: 0.75,
  mirror: 0.35,
} as const;

export type SourceTier = keyof typeof SOURCE_TIERS;

/** Map a wiki's raw `source` field onto a tier. */
export function sourceTier(source: string | undefined): SourceTier {
  // 'arena' is an article a reader published from a battle they ran and voted
  // on — human-initiated, so it belongs with community content and must not
  // fall through to the mirror default below.
  if (!source || source === 'user' || source === 'arena') return 'user';
  if (source === 'editorial' || source.startsWith('editorial')) return 'editorial';
  if (source.startsWith('wikipedia-')) return 'mirror';
  // 'seed' and anything unrecognised: treat as mirror rather than promote it.
  // An unknown provenance should not outrank a known-good one by default.
  return 'mirror';
}

/**
 * Per-tier publication thresholds, mirroring AI HOT's dynamic cutoffs (their
 * example: an OpenAI post clears at 60 while an independent blogger needs more).
 * Same intent here — a mirrored Wikipedia page has to be substantially more
 * engaging than an editorial piece to earn the same slot.
 */
export const TIER_THRESHOLDS: Record<SourceTier, number> = {
  editorial: 12,
  user: 18,
  mirror: 45,
};

/** Half-life of the recency term, in days. */
const RECENCY_HALF_LIFE_DAYS = 14;

/** Weight on each LLM sub-score, once supplied. */
const QUALITY_WEIGHT = 6;

export interface HotCandidate {
  id: string;
  title: string;
  language?: string;
  source?: string;
  views: number;
  threadCount?: number;
  /** Unix ms. */
  updatedAt: number;
  /**
   * Optional model-supplied sub-scores, each 0–1. The model's only job is to
   * fill these in; it never sees or produces the composite below. Absent means
   * the article is scored on engagement and provenance alone — which is the
   * default, since obtaining these costs money.
   */
  quality?: {
    depth?: number;
    clarity?: number;
    usefulness?: number;
  };
}

export interface HotScored extends HotCandidate {
  tier: SourceTier;
  score: number;
  /** True when `score` clears this article's tier threshold. */
  featured: boolean;
  /** Component breakdown, so a rank is explainable rather than a bare number. */
  parts: {
    engagement: number;
    discussion: number;
    recency: number;
    quality: number;
  };
}

/**
 * Score one article.
 *
 * Views and threads go through `log1p` because engagement is heavy-tailed: a
 * linear term would let one article with 100k views outrank every other row
 * combined, which is a popularity list, not a hot list.
 */
export function scoreCandidate(candidate: HotCandidate, now: number): HotScored {
  const tier = sourceTier(candidate.source);

  const engagement = Math.log1p(Math.max(0, candidate.views));
  // Threads are weighted well above views: a follow-up question is a far
  // stronger signal that an article was worth reading than a page load is.
  const discussion = 3 * Math.log1p(Math.max(0, candidate.threadCount ?? 0));

  const ageDays = Math.max(0, (now - candidate.updatedAt) / 86_400_000);
  const recency = 4 * Math.pow(0.5, ageDays / RECENCY_HALF_LIFE_DAYS);

  const q = candidate.quality;
  const quality = q
    ? QUALITY_WEIGHT *
      ((clamp01(q.depth) + clamp01(q.clarity) + clamp01(q.usefulness)) / 3)
    : 0;

  const raw = engagement + discussion + recency + quality;
  const score = SOURCE_TIERS[tier] * raw;

  return {
    ...candidate,
    tier,
    score,
    featured: score >= TIER_THRESHOLDS[tier],
    parts: { engagement, discussion, recency, quality },
  };
}

function clamp01(value: number | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export interface HotListOptions {
  /** Reference time for the recency term. Injected so results are reproducible. */
  now: number;
  /** Cap on returned rows. */
  limit?: number;
  /** Keep only rows that clear their tier threshold. Defaults to true. */
  featuredOnly?: boolean;
}

/**
 * Rank a candidate set.
 *
 * Ties break on id so the output is a total order — two articles with identical
 * scores must not swap places between runs, or the "hot list" visibly churns
 * with nothing having changed.
 */
export function buildHotList(
  candidates: readonly HotCandidate[],
  options: HotListOptions
): HotScored[] {
  const featuredOnly = options.featuredOnly ?? true;
  const scored = candidates
    .map((candidate) => scoreCandidate(candidate, options.now))
    .filter((row) => (featuredOnly ? row.featured : true))
    .sort((a, b) => b.score - a.score || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  return options.limit ? scored.slice(0, options.limit) : scored;
}
