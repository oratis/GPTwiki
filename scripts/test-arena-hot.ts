/**
 * Tests for the article hot-list composite.
 *
 * The property under test throughout is the one AI HOT learned the hard way: the
 * composite is arithmetic over supplied inputs, so it must be reproducible,
 * explainable, and free of any model in the loop. Several cases below exist to
 * pin *ordering* claims (threads over views, provenance over volume) that a
 * plausible-looking refactor could silently invert.
 */
import assert from 'node:assert/strict';
import {
  SOURCE_TIERS,
  TIER_THRESHOLDS,
  assertThresholdsReachable,
  buildHotList,
  scoreCandidate,
  sourceTier,
  viewsNeededWhenFresh,
  type HotCandidate,
} from '../src/lib/arena/hot-scoring';

let failures = 0;
let run = 0;

function test(name: string, fn: () => void): void {
  run++;
  try {
    fn();
    console.log(`  ok  ${name}`);
  } catch (err) {
    failures++;
    console.error(`FAIL  ${name}`);
    console.error(`      ${(err as Error).message.split('\n').join('\n      ')}`);
  }
}

const NOW = 1_760_000_000_000;
const DAY = 86_400_000;

function candidate(over: Partial<HotCandidate> = {}): HotCandidate {
  return {
    id: over.id ?? 'a',
    title: over.title ?? 'Article',
    source: over.source ?? 'user',
    views: over.views ?? 100,
    threadCount: over.threadCount ?? 0,
    updatedAt: over.updatedAt ?? NOW,
    ...over,
  };
}

console.log('\narena hot: provenance tiers');

test('raw source strings map onto the intended tier', () => {
  assert.equal(sourceTier('editorial'), 'editorial');
  assert.equal(sourceTier('editorial-draft'), 'editorial');
  assert.equal(sourceTier(undefined), 'user');
  assert.equal(sourceTier('user'), 'user');
  assert.equal(sourceTier('wikipedia-en-dump'), 'mirror');
  assert.equal(sourceTier('wikipedia-zh-rich'), 'mirror');
});

test("the legacy 'hand-authored' stamp is original writing, not a mirror", () => {
  // These are the site's oldest and most-read originals. Letting them fall
  // through to the mirror default buried the best content on the site under a
  // 0.35 weight and a bar meant for copied Wikipedia pages.
  assert.equal(sourceTier('hand-authored'), 'editorial');
});

test('arena-published articles rank as community content, not as mirror', () => {
  // A reader ran the battle, voted, and chose to publish — human-initiated, so
  // it must not fall through to the mirror default.
  assert.equal(sourceTier('arena'), 'user');
});

test('unknown provenance defaults down, not up', () => {
  // An unrecognised source must not outrank a known-good one by default.
  assert.equal(sourceTier('seed'), 'mirror');
  assert.equal(sourceTier('something-new'), 'mirror');
  assert.ok(SOURCE_TIERS.mirror < SOURCE_TIERS.user);
});

test('the tier ordering is editorial > user > mirror', () => {
  assert.ok(SOURCE_TIERS.editorial > SOURCE_TIERS.user);
  assert.ok(SOURCE_TIERS.user > SOURCE_TIERS.mirror);
});

console.log('\narena hot: composite behaviour');

test('a follow-up thread counts for more than a page view', () => {
  // The ordering claim: someone asking a follow-up is stronger evidence the
  // article was worth reading than a page load is.
  const withThread = scoreCandidate(candidate({ views: 100, threadCount: 1 }), NOW);
  const withViews = scoreCandidate(candidate({ views: 200, threadCount: 0 }), NOW);
  assert.ok(
    withThread.score > withViews.score,
    `thread=${withThread.score.toFixed(2)} should beat views=${withViews.score.toFixed(2)}`
  );
});

test('engagement is compressed, so one viral article cannot swamp the list', () => {
  // log1p: 1000x the views must not be 1000x the score.
  const small = scoreCandidate(candidate({ views: 100 }), NOW);
  const huge = scoreCandidate(candidate({ views: 100_000 }), NOW);
  assert.ok(huge.score > small.score);
  assert.ok(
    huge.score < small.score * 3,
    `1000x views gave ${(huge.score / small.score).toFixed(1)}x score — should be compressed`
  );
});

test('recency decays by half over the half-life', () => {
  const fresh = scoreCandidate(candidate({ updatedAt: NOW }), NOW);
  const aged = scoreCandidate(candidate({ updatedAt: NOW - 14 * DAY }), NOW);
  assert.ok(
    Math.abs(aged.parts.recency - fresh.parts.recency / 2) < 1e-9,
    `expected half of ${fresh.parts.recency}, got ${aged.parts.recency}`
  );
});

test('provenance can outweigh raw volume', () => {
  // The whole reason for tiering: the mirror is most of the corpus by count, so
  // equal weighting would bury everything original.
  const editorial = scoreCandidate(candidate({ source: 'editorial', views: 500 }), NOW);
  const mirror = scoreCandidate(candidate({ source: 'wikipedia-en-dump', views: 5000 }), NOW);
  assert.ok(
    editorial.score > mirror.score,
    `editorial=${editorial.score.toFixed(2)} vs mirror=${mirror.score.toFixed(2)}`
  );
});

test('absent quality sub-scores contribute nothing rather than defaulting high', () => {
  const withoutQuality = scoreCandidate(candidate(), NOW);
  assert.equal(withoutQuality.parts.quality, 0);
  const withQuality = scoreCandidate(
    candidate({ quality: { depth: 1, clarity: 1, usefulness: 1 } }),
    NOW
  );
  assert.ok(withQuality.score > withoutQuality.score);
});

test('out-of-range and non-numeric sub-scores are clamped, not trusted', () => {
  // These arrive from a model, so the composite must not be steerable by a
  // malformed value — a 99 in one field cannot dominate the whole ranking.
  const wild = scoreCandidate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    candidate({ quality: { depth: 99, clarity: -5, usefulness: 'high' as any } }),
    NOW
  );
  const capped = scoreCandidate(
    candidate({ quality: { depth: 1, clarity: 0, usefulness: 0 } }),
    NOW
  );
  assert.equal(wild.score, capped.score);
});

test('negative or missing counters do not produce NaN', () => {
  const weird = scoreCandidate(
    candidate({ views: -10, threadCount: -3, updatedAt: NOW + 5 * DAY }),
    NOW
  );
  assert.ok(Number.isFinite(weird.score), `got ${weird.score}`);
  assert.ok(weird.score >= 0);
});

test('the composite is arithmetic over its parts — explainable, not a black box', () => {
  const row = scoreCandidate(
    candidate({ source: 'editorial', views: 300, threadCount: 4, updatedAt: NOW - 3 * DAY }),
    NOW
  );
  const sum = row.parts.engagement + row.parts.discussion + row.parts.recency + row.parts.quality;
  assert.ok(
    Math.abs(row.score - SOURCE_TIERS.editorial * sum) < 1e-9,
    'score must equal tier weight x sum of parts'
  );
});

console.log('\narena hot: thresholds and ranking');

test('the mirror has to clear a much higher bar than editorial', () => {
  assert.ok(TIER_THRESHOLDS.mirror > TIER_THRESHOLDS.user);
  assert.ok(TIER_THRESHOLDS.user > TIER_THRESHOLDS.editorial);
});

test('featured is exactly "raw clears this row\'s own tier threshold"', () => {
  for (const source of ['editorial', 'user', 'wikipedia-en-dump']) {
    const row = scoreCandidate(candidate({ source, views: 4000, threadCount: 3 }), NOW);
    assert.equal(row.featured, row.raw >= TIER_THRESHOLDS[row.tier], source);
  }
});

test('admission is judged before the tier weight, so provenance is not charged twice', () => {
  // The bug this pins: comparing the *discounted* score against a *higher* bar
  // penalised a mirror for its provenance in both directions at once, which is
  // what made the mirror tier unreachable at any view count.
  const mirror = scoreCandidate(
    candidate({ source: 'wikipedia-en-dump', views: 50_000, threadCount: 4 }),
    NOW
  );
  assert.ok(mirror.raw > mirror.score, 'the weight must still discount the ranking score');
  assert.ok(mirror.featured, 'a heavily-read, discussed mirror page must be admissible');
});

test('every tier threshold is actually reachable', () => {
  // The failure mode is silent: an unreachable bar yields an empty list, which
  // is indistinguishable from a correctly-working list on a quiet day. Shipping
  // 12/18/45 against the discounted score emptied two tiers permanently.
  assertThresholdsReachable();
});

test('the published bar, restated in views, is small enough to be real', () => {
  // Guards the same miscalibration from the operator's side: whatever the
  // constants say, a fresh article must not need an implausible readership.
  assert.ok(viewsNeededWhenFresh('editorial') <= 50, 'editorial bar must be modest');
  assert.ok(viewsNeededWhenFresh('user') <= 200, 'community bar must be attainable');
  assert.ok(viewsNeededWhenFresh('mirror') <= 5000, 'mirror bar must be attainable');
  // And strictly ordered, so the copy on /arena/hot stays true.
  assert.ok(viewsNeededWhenFresh('mirror') > viewsNeededWhenFresh('user'));
  assert.ok(viewsNeededWhenFresh('user') > viewsNeededWhenFresh('editorial'));
});

test('freshness alone never features an article nobody read', () => {
  // A just-touched article with no views and no threads scores only the recency
  // term. If any bar sat at or below that ceiling, re-saving a document would
  // put it on the hot list.
  for (const source of ['editorial', 'user', 'wikipedia-en-dump']) {
    const untouched = scoreCandidate(
      candidate({ source, views: 0, threadCount: 0, updatedAt: NOW }),
      NOW
    );
    assert.equal(untouched.featured, false, source);
  }
});

test('featuredOnly filters, and can be turned off for inspection', () => {
  const quiet = candidate({ id: 'quiet', source: 'wikipedia-en-dump', views: 1, updatedAt: NOW - 400 * DAY });
  assert.equal(buildHotList([quiet], { now: NOW }).length, 0);
  assert.equal(buildHotList([quiet], { now: NOW, featuredOnly: false }).length, 1);
});

test('ranking is a total order, so the list does not churn between runs', () => {
  // Two identical articles differing only by id must not swap places.
  const rows = [
    candidate({ id: 'b', source: 'editorial', views: 500, threadCount: 2 }),
    candidate({ id: 'a', source: 'editorial', views: 500, threadCount: 2 }),
  ];
  const first = buildHotList(rows, { now: NOW }).map((r) => r.id);
  const second = buildHotList([...rows].reverse(), { now: NOW }).map((r) => r.id);
  assert.deepEqual(first, ['a', 'b'], 'ties must break deterministically on id');
  assert.deepEqual(first, second, 'input order must not affect output order');
});

test('the same inputs always produce the same list', () => {
  const rows = [
    candidate({ id: 'x', source: 'editorial', views: 900, threadCount: 5 }),
    candidate({ id: 'y', source: 'user', views: 4000, threadCount: 1 }),
    candidate({ id: 'z', source: 'wikipedia-en-dump', views: 90_000, threadCount: 12 }),
  ];
  assert.deepEqual(buildHotList(rows, { now: NOW }), buildHotList(rows, { now: NOW }));
});

test('limit caps the list without reordering it', () => {
  const rows = ['a', 'b', 'c', 'd'].map((id, i) =>
    candidate({ id, source: 'editorial', views: 1000 * (4 - i), threadCount: 3 })
  );
  const full = buildHotList(rows, { now: NOW });
  const capped = buildHotList(rows, { now: NOW, limit: 2 });
  assert.deepEqual(capped, full.slice(0, 2));
});

test('no model in the loop — scoring is a pure function of its arguments', () => {
  // Same candidate, same clock, called twice with nothing else in scope.
  const c = candidate({ source: 'editorial', views: 777, threadCount: 3 });
  assert.deepEqual(scoreCandidate(c, NOW), scoreCandidate(c, NOW));
  // And the clock is injected, never read from the environment.
  assert.notEqual(scoreCandidate(c, NOW).score, scoreCandidate(c, NOW + 60 * DAY).score);
});

console.log(`\n${run - failures}/${run} passed`);
if (failures > 0) process.exit(1);
