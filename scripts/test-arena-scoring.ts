/**
 * Known-answer tests for the Arena rating fit.
 *
 * These are the repo's first tests, so they deliberately add no dependency:
 * `node:assert` plus the `tsx` devDependency that is already here. Run with
 * `npm test`.
 *
 * Bradley-Terry is the first code in this codebase that returns *plausible*
 * numbers when it is wrong — a sign error still produces a leaderboard-shaped
 * leaderboard. So every case below pins a value the maths must reproduce, not
 * just a shape: recovered log-odds, interval width scaling with √n, and the
 * position term separating slot bias from model strength.
 */
import assert from 'node:assert/strict';
import { fitRatings, type ArenaBattleOutcome } from '../src/lib/arena/scoring';
import type { ArenaOutcome } from '../src/types/arena';

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

/** `n` identical battles — fixed slot order, so the slot is *not* randomised. */
function battles(
  modelA: string,
  modelB: string,
  outcome: ArenaOutcome,
  n: number,
  weight = 1
): ArenaBattleOutcome[] {
  return Array.from({ length: n }, () => ({ modelA, modelB, outcome, weight }));
}

/**
 * A matchup with the slot assignment alternated within every outcome class, so
 * which slot a model occupies carries no information about who won — the same
 * property `/api/arena/battle` gets by randomising the order.
 *
 * Using `battles()` directly for a lopsided result instead would put every
 * winner in slot A, and the fit would (correctly) charge the whole effect to
 * the position term rather than to strength.
 */
function matchup(
  x: string,
  y: string,
  xWins: number,
  yWins: number,
  ties = 0,
  weight = 1
): ArenaBattleOutcome[] {
  const out: ArenaBattleOutcome[] = [];
  const push = (modelA: string, modelB: string, outcome: ArenaOutcome) =>
    out.push({ modelA, modelB, outcome, weight });

  for (let i = 0; i < xWins; i++) {
    if (i % 2 === 0) push(x, y, 'a');
    else push(y, x, 'b');
  }
  for (let i = 0; i < yWins; i++) {
    if (i % 2 === 0) push(y, x, 'a');
    else push(x, y, 'b');
  }
  for (let i = 0; i < ties; i++) {
    if (i % 2 === 0) push(x, y, 'tie');
    else push(y, x, 'tie');
  }
  return out;
}

function row(result: ReturnType<typeof fitRatings>, model: string) {
  const found = result.models.find((m) => m.model === model);
  assert.ok(found, `no row for ${model}`);
  return found;
}

/** Log-odds of a win probability — the value the fit should recover. */
const logit = (p: number) => Math.log(p / (1 - p));
/** Log-odds → display points, matching scoring.ts. */
const toPoints = (logOdds: number) => (400 / Math.LN10) * logOdds;

console.log('arena scoring');

test('empty input yields no rows and does not throw', () => {
  const r = fitRatings([]);
  assert.deepEqual(r.models, []);
  assert.equal(r.effectiveBattles, 0);
  assert.equal(r.excludedBattles, 0);
});

test('evenly split results score the two models equally', () => {
  const r = fitRatings(matchup('a', 'b', 50, 50), { minVotes: 100 });
  const [a, b] = [row(r, 'a'), row(r, 'b')];
  assert.equal(a.provisional, false);
  assert.ok(
    Math.abs(a.score! - b.score!) < 1,
    `expected near-equal scores, got ${a.score} vs ${b.score}`
  );
  assert.ok(Math.abs(a.score! - 1000) < 1, `expected anchor at 1000, got ${a.score}`);
});

test('a dominant model scores higher, by the log-odds of its win rate', () => {
  const r = fitRatings(matchup('a', 'b', 90, 10), { minVotes: 100 });
  const gap = row(r, 'a').score! - row(r, 'b').score!;
  const expected = toPoints(logit(0.9)); // ≈ 382 points
  assert.ok(gap > 0, `expected a > b, got gap ${gap}`);
  assert.ok(
    Math.abs(gap - expected) < 25,
    `expected gap ≈ ${expected.toFixed(0)}, got ${gap.toFixed(0)}`
  );
  assert.ok(Math.abs(r.positionBias) < 0.05, `expected no slot bias, got ${r.positionBias}`);
});

test('ties count as half credit, so all-ties scores equally', () => {
  const r = fitRatings(matchup('a', 'b', 0, 0, 120), { minVotes: 100 });
  const [a, b] = [row(r, 'a'), row(r, 'b')];
  assert.equal(a.ties, 120);
  assert.equal(a.wins, 0);
  assert.ok(
    Math.abs(a.score! - b.score!) < 1,
    `expected near-equal scores, got ${a.score} vs ${b.score}`
  );
});

test('confidence intervals shrink as √n', () => {
  const build = (n: number) =>
    fitRatings(matchup('a', 'b', n * 0.6, n * 0.4), { minVotes: 100 });
  const small = row(build(200), 'a');
  const large = row(build(2000), 'a');
  const widthSmall = small.ciHigh! - small.ciLow!;
  const widthLarge = large.ciHigh! - large.ciLow!;
  assert.ok(widthLarge < widthSmall, `expected narrowing, got ${widthSmall} → ${widthLarge}`);
  const ratio = widthSmall / widthLarge;
  assert.ok(
    ratio > 2.5 && ratio < 4,
    `expected ≈√10 ≈ 3.16× narrower at 10× the votes, got ${ratio.toFixed(2)}×`
  );
});

test('zero-weight votes are recorded but change nothing', () => {
  const base = matchup('a', 'b', 60, 60);
  const clean = fitRatings(base, { minVotes: 100 });
  // A landslide for "b" that must be entirely ignored.
  const polluted = fitRatings([...base, ...battles('a', 'b', 'b', 1000, 0)], { minVotes: 100 });

  assert.equal(polluted.excludedBattles, 1000);
  assert.equal(polluted.effectiveBattles, clean.effectiveBattles);
  assert.equal(row(polluted, 'b').wins, row(clean, 'b').wins);
  assert.ok(
    Math.abs(row(polluted, 'a').score! - row(clean, 'a').score!) < 1e-9,
    'zero-weight votes must not move the fit'
  );
});

test('"both bad" is tallied but kept out of the fit', () => {
  const base = matchup('a', 'b', 60, 60);
  const clean = fitRatings(base, { minVotes: 100 });
  const withBothBad = fitRatings([...base, ...battles('a', 'b', 'both_bad', 40)], {
    minVotes: 100,
  });

  assert.equal(row(withBothBad, 'a').bothBad, 40);
  assert.equal(row(withBothBad, 'a').votes, row(clean, 'a').votes, 'both_bad is not a vote');
  assert.equal(withBothBad.excludedBattles, 40);
  assert.ok(
    Math.abs(row(withBothBad, 'a').score! - row(clean, 'a').score!) < 1e-9,
    '"both bad" says something about the prompt, not the models'
  );
});

test('models below the vote threshold publish no score', () => {
  const r = fitRatings(matchup('a', 'b', 30, 30), { minVotes: 100 });
  const a = row(r, 'a');
  assert.equal(a.provisional, true);
  assert.equal(a.score, null);
  assert.equal(a.ciLow, null);
  assert.equal(a.ciHigh, null);
  assert.equal(a.rankLow, null);
  assert.equal(a.votes, 60, 'counts are still shown while provisional');
});

test('a model whose every battle was excluded still gets a provisional row', () => {
  const r = fitRatings(battles('a', 'b', 'a', 5, 0), { minVotes: 100 });
  assert.equal(r.models.length, 2, 'a model must not vanish because its votes were dropped');
  assert.equal(row(r, 'a').votes, 0);
  assert.equal(row(r, 'a').provisional, true);
});

test('slot bias is absorbed by the position term, not by model strength', () => {
  // Whichever answer is shown first wins 70% of the time; the models are equal.
  const r = fitRatings(
    [
      ...battles('x', 'y', 'a', 70),
      ...battles('x', 'y', 'b', 30),
      ...battles('y', 'x', 'a', 70),
      ...battles('y', 'x', 'b', 30),
    ],
    { minVotes: 100 }
  );
  const expected = logit(0.7); // ≈ 0.847
  assert.ok(
    Math.abs(r.positionBias - expected) < 0.1,
    `expected position bias ≈ ${expected.toFixed(3)}, got ${r.positionBias.toFixed(3)}`
  );
  assert.ok(
    Math.abs(row(r, 'x').score! - row(r, 'y').score!) < 1,
    'equal models must stay equal once slot bias is regressed out'
  );
});

test('statistically indistinguishable models share a rank interval', () => {
  const r = fitRatings(matchup('a', 'b', 100, 100), { minVotes: 100 });
  const [a, b] = [row(r, 'a'), row(r, 'b')];
  assert.deepEqual([a.rankLow, a.rankHigh], [1, 2]);
  assert.deepEqual([b.rankLow, b.rankHigh], [1, 2]);
});

test('a clear winner takes rank 1 alone', () => {
  const r = fitRatings(matchup('a', 'b', 450, 50), { minVotes: 100 });
  assert.deepEqual([row(r, 'a').rankLow, row(r, 'a').rankHigh], [1, 1]);
  assert.deepEqual([row(r, 'b').rankLow, row(r, 'b').rankHigh], [2, 2]);
});

test('an inestimable strength variance forces the row provisional, never ±0', () => {
  // One pair, always the same slot order: strength and position are perfectly
  // collinear, so the strength variances collapse to non-positive values. A
  // zero-width interval — "certain to the point" — would be the single most
  // misleading number this leaderboard could publish, so the row must drop to
  // provisional instead. The whole 60% edge lands on the position term here,
  // which is the honest reading of data that cannot separate the two.
  const r = fitRatings(
    [...battles('a', 'b', 'a', 300), ...battles('a', 'b', 'b', 200)],
    { minVotes: 100 }
  );
  for (const m of r.models) {
    assert.equal(m.provisional, true, `${m.model} must not be published`);
    assert.equal(m.score, null);
    assert.equal(m.ciLow, null);
  }
  assert.equal(row(r, 'a').votes, 500, 'the votes still happened and are still shown');
  assert.ok(
    Math.abs(r.positionBias - logit(0.6)) < 0.01,
    `expected the edge to land on position, got ${r.positionBias}`
  );
});

test('no published row ever carries a zero-width interval', () => {
  const datasets = [
    matchup('a', 'b', 100, 100),
    matchup('a', 'b', 450, 50),
    [...matchup('a', 'b', 300, 200), ...matchup('a', 'c', 150, 150), ...matchup('b', 'c', 90, 110)],
  ];
  for (const data of datasets) {
    for (const m of fitRatings(data, { minVotes: 100 }).models) {
      if (m.score === null) continue;
      assert.ok(
        m.ciHigh! > m.ciLow!,
        `${m.model} published a degenerate interval [${m.ciLow}, ${m.ciHigh}]`
      );
    }
  }
});

test('per-pair balancing stops one heavily-played pair from drowning the rest', () => {
  // Direct a-vs-b evidence says "dead even", on huge volume. The low-volume
  // pairs say a ≫ c and c ≫ b, which transitively puts a well above b.
  const data = [
    ...matchup('a', 'b', 1000, 1000),
    ...matchup('a', 'c', 95, 5),
    ...matchup('c', 'b', 95, 5),
  ];
  const unbalanced = fitRatings(data, { minVotes: 100, balancePairs: false });
  const balanced = fitRatings(data, { minVotes: 100, balancePairs: true });

  const gap = (r: ReturnType<typeof fitRatings>) => row(r, 'a').score! - row(r, 'b').score!;
  assert.ok(
    gap(balanced) > gap(unbalanced) + 10,
    `balancing should amplify the low-volume evidence: ` +
      `${gap(unbalanced).toFixed(1)} → ${gap(balanced).toFixed(1)}`
  );
  assert.ok(gap(unbalanced) >= 0, 'sanity: a is never below b on this data');
});

test('no LLM, no clock, no I/O — the same input always fits the same numbers', () => {
  const data = matchup('a', 'b', 70, 50);
  const first = fitRatings(data, { minVotes: 100 });
  const second = fitRatings(data, { minVotes: 100 });
  assert.deepEqual(first.models, second.models);
  assert.equal(first.positionBias, second.positionBias);
});

console.log(`\n${run - failures}/${run} passed`);
if (failures > 0) process.exit(1);
