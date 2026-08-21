/**
 * Tests for leaderboard scopes, pricing config, and the Pareto frontier.
 *
 * The pricing parser is the interesting surface: it reads operator-supplied
 * JSON, so its whole job is to fail closed. A malformed value must yield "not
 * configured" rather than a chart with a wrong axis — a wrong chart still looks
 * like a chart, which is worse than an absent one.
 */
import assert from 'node:assert/strict';
import { buildParetoPoints, blendedCost, parseModelPricing } from '../src/lib/arena/pricing';
import { OVERALL_SCOPE, normalizeScope, scopeOptions } from '../src/lib/arena/scopes';

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

/** Silence the parser's console.warn while asserting on rejection paths. */
function quietly<T>(fn: () => T): T {
  const original = console.warn;
  console.warn = () => {};
  try {
    return fn();
  } finally {
    console.warn = original;
  }
}

console.log('\narena scopes');

test('absent or overall scope resolves to overall', () => {
  assert.equal(normalizeScope(undefined), OVERALL_SCOPE);
  assert.equal(normalizeScope('overall'), OVERALL_SCOPE);
});

test('known categories and locales are accepted', () => {
  assert.equal(normalizeScope('category:coding'), 'category:coding');
  assert.equal(normalizeScope('locale:zh'), 'locale:zh');
});

test('unknown scopes fall back rather than reaching Firestore', () => {
  // A scope string becomes a document id, so anything unrecognised must be
  // rejected here instead of turning into a lookup for an arbitrary path.
  for (const bad of [
    'category:nonsense',
    'locale:xx',
    'category:',
    'locale:',
    'nonsense',
    '../secrets',
    'category:coding:extra',
    '',
  ]) {
    assert.equal(normalizeScope(bad), OVERALL_SCOPE, `"${bad}" should not pass through`);
  }
});

test('the third-party board is unreachable through ?scope=', () => {
  // `arenaRatings/reference` holds someone else's numbers. It shares the
  // collection with our own snapshots so every arena page stays a one-document
  // read, which means the scope validator is what stops `?scope=reference` from
  // serving external ratings through the leaderboard's own table — the table
  // that /arena/rules promises is built from GPTwiki's anonymous votes.
  for (const attempt of ['reference', 'category:reference', 'locale:reference']) {
    assert.equal(normalizeScope(attempt), OVERALL_SCOPE, attempt);
  }
});

test('the scope picker offers overall, the current locale, and every category', () => {
  const options = scopeOptions('zh');
  assert.equal(options[0].scope, OVERALL_SCOPE);
  assert.equal(options[1].scope, 'locale:zh');
  assert.ok(options.some((o) => o.scope === 'category:coding'));
  // Every offered scope must survive its own validator.
  for (const option of options) {
    assert.equal(normalizeScope(option.scope), option.scope, option.scope);
  }
});

console.log('\narena pricing config');

test('unset pricing yields an empty table', () => {
  assert.deepEqual(parseModelPricing(undefined), {});
  assert.deepEqual(parseModelPricing(''), {});
  assert.deepEqual(parseModelPricing('   '), {});
});

test('a well-formed table parses', () => {
  const parsed = parseModelPricing('{"claude":{"in":3,"out":15},"gpt":{"in":2.5,"out":10}}');
  assert.deepEqual(parsed, { claude: { in: 3, out: 15 }, gpt: { in: 2.5, out: 10 } });
});

test('a partial table is allowed — unpriced models simply have no coordinate', () => {
  assert.deepEqual(parseModelPricing('{"claude":{"in":3,"out":15}}'), {
    claude: { in: 3, out: 15 },
  });
});

test('malformed pricing fails closed instead of throwing', () => {
  for (const bad of [
    'not json',
    '{',
    '[]',
    '{"claude":{"in":3}}',            // missing out
    '{"claude":{"in":-1,"out":15}}',  // negative price
    '{"claude":{"in":"3","out":"15"}}', // strings, not numbers
    '{"unknown-model":{"in":1,"out":2}}',
    'null',
  ]) {
    assert.deepEqual(quietly(() => parseModelPricing(bad)), {}, `"${bad}" should be rejected`);
  }
});

test('blended cost weights output 3:1 over input', () => {
  // A battle is a short question and a long answer, so output dominates.
  assert.equal(blendedCost({ in: 4, out: 4 }), 4);
  assert.equal(blendedCost({ in: 0, out: 4 }), 3);
  assert.equal(blendedCost({ in: 4, out: 0 }), 1);
});

console.log('\narena pareto frontier');

const rows = (entries: Array<[string, number | null]>) =>
  entries.map(([model, score]) => ({ model, score }));

test('models without a score or without a price are omitted', () => {
  const points = buildParetoPoints(
    rows([['claude', 1100], ['gpt', null], ['gemini', 900]]),
    { claude: { in: 3, out: 15 } } // gemini priced nowhere, gpt has no score
  );
  assert.deepEqual(points.map((p) => p.model), ['claude']);
});

test('a dominated model is off the frontier', () => {
  // gpt is both cheaper and better rated than gemini, so gemini is dominated.
  const points = buildParetoPoints(
    rows([['gpt', 1050], ['gemini', 980]]),
    { gpt: { in: 1, out: 4 }, gemini: { in: 2, out: 8 } }
  );
  const byModel = Object.fromEntries(points.map((p) => [p.model, p.onFrontier]));
  assert.equal(byModel.gpt, true);
  assert.equal(byModel.gemini, false, 'more expensive AND worse rated is dominated');
});

test('a cheaper-but-worse model stays on the frontier', () => {
  // This is the whole point of the view: "cheap and good enough" is a real
  // answer, so a lower score must not disqualify a much cheaper model.
  const points = buildParetoPoints(
    rows([['claude', 1100], ['gemini', 950]]),
    { claude: { in: 3, out: 15 }, gemini: { in: 0.1, out: 0.4 } }
  );
  assert.deepEqual(
    points.filter((p) => p.onFrontier).map((p) => p.model).sort(),
    ['claude', 'gemini']
  );
});

test('exact ties on both axes do not eliminate each other', () => {
  // Mutual domination would mark both as dominated and empty the frontier.
  const points = buildParetoPoints(
    rows([['claude', 1000], ['gpt', 1000]]),
    { claude: { in: 2, out: 8 }, gpt: { in: 2, out: 8 } }
  );
  assert.equal(points.filter((p) => p.onFrontier).length, 2);
});

test('the frontier is never empty when any point exists', () => {
  const datasets: Array<Parameters<typeof buildParetoPoints>> = [
    [rows([['claude', 1000]]), { claude: { in: 3, out: 15 } }],
    [
      rows([['claude', 1100], ['gpt', 1000], ['gemini', 900]]),
      { claude: { in: 3, out: 15 }, gpt: { in: 2.5, out: 10 }, gemini: { in: 0.1, out: 0.4 } },
    ],
    [
      rows([['claude', 900], ['gpt', 900]]),
      { claude: { in: 5, out: 20 }, gpt: { in: 5, out: 20 } },
    ],
  ];
  for (const [modelRows, pricing] of datasets) {
    const points = buildParetoPoints(modelRows, pricing);
    if (points.length === 0) continue;
    assert.ok(
      points.some((p) => p.onFrontier),
      'at least one point must be undominated'
    );
  }
});

console.log(`\n${run - failures}/${run} passed`);
if (failures > 0) process.exit(1);
