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
  // 'hand-authored' is the legacy stamp on the original cluster articles — the
  // oldest and, by views, the most-read original writing on the site. No script
  // in the tree writes it any more (`translate-live.ts` stamps their
  // translations 'editorial'), so it only appears on those early documents, and
  // omitting it here dropped the site's best originals into the mirror tier.
  if (source === 'hand-authored') return 'editorial';
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
 *
 * Compared against the RAW score, before the tier weight is applied. That split
 * is load-bearing: `SOURCE_TIERS` already discounts a mirror to 0.35, so
 * comparing a discounted score against a *higher* bar charged the same article
 * for its provenance twice. It did not merely make the list strict, it made two
 * of the three tiers unreachable by any input — `raw` is dominated by
 * `log1p(views)`, which grows so slowly that 0.35 x raw could not reach 45 even
 * at a million views. The list was empty by arithmetic, not by editorial
 * standard. The weight now decides *ordering* on the merged list; the threshold
 * decides *admission*, and `assertThresholdsReachable` below keeps the two from
 * drifting back into that state.
 *
 * Calibration, in the units the raw score is actually made of: the recency term
 * alone maxes out at 4, so every bar sits above it — freshness by itself can
 * never qualify an article that nobody read. What each tier needs beyond that,
 * on a freshly-updated article with no follow-up threads:
 *
 *   editorial  6  →  ~7 views, or a single follow-up thread
 *   user       7  →  ~19 views, or one thread plus a handful of views
 *   mirror     9  →  ~150 views while fresh; ~8,100 once the recency term decays
 */
export const TIER_THRESHOLDS: Record<SourceTier, number> = {
  editorial: 6,
  user: 7,
  mirror: 9,
};

/** Largest value the recency term can contribute. Thresholds must exceed it. */
export const MAX_RECENCY = 4;

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
  /** Tier-weighted score. Decides ranking. */
  score: number;
  /** Un-weighted sum of the parts. Decides admission. */
  raw: number;
  /** True when `raw` clears this article's tier threshold. */
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
  const recency = MAX_RECENCY * Math.pow(0.5, ageDays / RECENCY_HALF_LIFE_DAYS);

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
    raw,
    // Admission is judged on `raw`, ranking on `score` — see TIER_THRESHOLDS.
    featured: raw >= TIER_THRESHOLDS[tier],
    parts: { engagement, discussion, recency, quality },
  };
}

function clamp01(value: number | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/**
 * How many views a fresh article of this tier needs to be admitted, given no
 * follow-up threads and no model sub-scores. Returns 0 when the recency term
 * alone already clears the bar — which would mean freshness qualifies unread
 * articles, so it is a calibration error in the other direction.
 *
 * Exists to make the thresholds auditable in the units an operator thinks in.
 * "Editorial needs 6" is meaningless on its own; "editorial needs ~7 views"
 * is a claim someone can check against the corpus.
 */
export function viewsNeededWhenFresh(tier: SourceTier): number {
  const gap = TIER_THRESHOLDS[tier] - MAX_RECENCY;
  if (gap <= 0) return 0;
  return Math.ceil(Math.expm1(gap));
}

/**
 * Assert every tier's bar can actually be cleared by some real article.
 *
 * The failure this guards against is silent by construction: an unreachable
 * threshold does not throw, it just yields an empty list, which is exactly what
 * a correctly-working hot list looks like on a quiet day. Shipping 12/18/45
 * against a discounted score emptied two tiers permanently and nothing caught
 * it, because every test fixture asserted relative ordering rather than whether
 * the numbers were attainable at all.
 *
 * `maxViews` is the ceiling a single article could plausibly reach on this site.
 * Called from the test suite, not at runtime.
 */
export function assertThresholdsReachable(maxViews = 1_000_000): void {
  for (const tier of Object.keys(TIER_THRESHOLDS) as SourceTier[]) {
    const bar = TIER_THRESHOLDS[tier];
    // Best case for admission: fresh, heavily read, and fully quality-scored.
    const best = Math.log1p(maxViews) + MAX_RECENCY + QUALITY_WEIGHT;
    if (bar > best) {
      throw new Error(
        `TIER_THRESHOLDS.${tier} = ${bar} is unreachable: the raw score maxes ` +
          `at ${best.toFixed(2)} even at ${maxViews.toLocaleString('en')} views. ` +
          `The list would be empty for this tier no matter what readers do.`
      );
    }
    if (bar <= MAX_RECENCY) {
      throw new Error(
        `TIER_THRESHOLDS.${tier} = ${bar} is at or below the recency ceiling ` +
          `(${MAX_RECENCY}), so simply touching an article would feature it.`
      );
    }
  }
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
