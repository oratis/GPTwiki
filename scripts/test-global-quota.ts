/**
 * Tests for the platform-wide free-generation cap (src/lib/ai/free-quota.ts).
 *
 * Two surfaces, both of which fail silently and expensively if they drift:
 *
 *  - `globalDailyGenerationLimit()`: unset **and empty** must mean *no cap*.
 *    Its three sibling limits use 0-means-off, but they gate free tiers that
 *    are off by default; this one gates a free tier that is ON in production
 *    (ARENA_ANON_DAILY_BATTLES=2). If an empty value parsed as 0 — and
 *    `Number('')` is 0 — then adding the variable to .env.example, blank like
 *    every other entry there, would switch the arena off.
 *
 *  - `decideConsumption()`: the arithmetic the transaction applies. Pulled out
 *    as a pure function precisely so the cap's behaviour can be pinned without
 *    a Firestore emulator. The case that matters most is a refusal by the
 *    global cap leaving the caller's own meter untouched — the platform is out
 *    of budget, the caller has done nothing.
 *
 * Run with `npm test`.
 */
import assert from 'node:assert/strict';
import { decideConsumption, globalDailyGenerationLimit } from '../src/lib/ai/free-quota';

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

/** Run `fn` with FREE_GLOBAL_DAILY_GENERATIONS set (undefined = unset). */
function withCap(value: string | undefined, fn: () => void): void {
  const previous = process.env.FREE_GLOBAL_DAILY_GENERATIONS;
  if (value === undefined) delete process.env.FREE_GLOBAL_DAILY_GENERATIONS;
  else process.env.FREE_GLOBAL_DAILY_GENERATIONS = value;
  try {
    fn();
  } finally {
    if (previous === undefined) delete process.env.FREE_GLOBAL_DAILY_GENERATIONS;
    else process.env.FREE_GLOBAL_DAILY_GENERATIONS = previous;
  }
}

const TODAY = '2026-08-21';
const YESTERDAY = '2026-08-20';

/** A consumption with the cap armed, unless the case overrides it. */
function decide(over: Partial<Parameters<typeof decideConsumption>[0]> = {}) {
  return decideConsumption({
    today: TODAY,
    meter: {},
    meterLimit: 5,
    units: 1,
    global: {},
    globalLimit: 100,
    generations: 1,
    ...over,
  });
}

console.log('\nglobal cap: env parsing');

test('unset or empty means no cap — never a cap of zero', () => {
  for (const v of [undefined, '', '   ']) {
    assert.equal(globalDailyGenerationLimit(), null, JSON.stringify(v));
  }
});

test('a number arms the cap; an explicit 0 means no free generations', () => {
  withCap('2000', () => assert.equal(globalDailyGenerationLimit(), 2000));
  withCap(' 2000 ', () => assert.equal(globalDailyGenerationLimit(), 2000));
  withCap('2000.7', () => assert.equal(globalDailyGenerationLimit(), 2000));
  withCap('0', () => assert.equal(globalDailyGenerationLimit(), 0));
});

test('garbage and negatives leave it uncapped rather than guessing', () => {
  for (const v of ['abc', '-5', 'NaN', 'Infinity', '1e', '2,000']) {
    withCap(v, () => assert.equal(globalDailyGenerationLimit(), null, v));
  }
});

console.log('\nglobal cap: consumption decisions');

test('a fresh caller under both limits is allowed and both counters advance', () => {
  const d = decide({ generations: 2 });
  assert.deepEqual(d, { ok: true, meterUsed: 1, globalUsed: 2, remaining: 4 });
});

test("with no cap configured, only the caller's meter is touched", () => {
  const d = decide({ globalLimit: null, global: null });
  assert.deepEqual(d, { ok: true, meterUsed: 1, globalUsed: null, remaining: 4 });
});

test("the caller's own meter still refuses first, and says so", () => {
  const d = decide({ meter: { date: TODAY, used: 5 } });
  assert.deepEqual(d, { ok: false, remaining: 0, reason: 'meter' });
});

test('a disabled meter (limit 0) is refused even with global budget left', () => {
  assert.deepEqual(decide({ meterLimit: 0 }), { ok: false, remaining: 0, reason: 'meter' });
});

test("the global cap refuses without spending the caller's allowance", () => {
  const d = decide({ global: { date: TODAY, used: 100 }, meter: { date: TODAY, used: 1 } });
  // 4 units left on their meter: the refusal is the platform's, not theirs.
  assert.deepEqual(d, { ok: false, remaining: 4, reason: 'global' });
});

test('a battle costing 2 generations cannot slip through on the last unit', () => {
  const nearlyFull = { date: TODAY, used: 99 };
  assert.deepEqual(decide({ global: nearlyFull, generations: 2 }), {
    ok: false,
    remaining: 5,
    reason: 'global',
  });
  // …while a 1-generation chat message still fits in that same slot.
  assert.deepEqual(decide({ global: nearlyFull, generations: 1 }), {
    ok: true,
    meterUsed: 1,
    globalUsed: 100,
    remaining: 4,
  });
});

test('landing exactly on the cap is allowed; one more is not', () => {
  assert.equal(decide({ global: { date: TODAY, used: 98 }, generations: 2 }).ok, true);
  assert.equal(decide({ global: { date: TODAY, used: 99 }, generations: 2 }).ok, false);
});

test("yesterday's counters are treated as zero, so the day rolls over on its own", () => {
  const d = decide({
    meter: { date: YESTERDAY, used: 5 },
    global: { date: YESTERDAY, used: 100 },
    generations: 2,
  });
  assert.deepEqual(d, { ok: true, meterUsed: 1, globalUsed: 2, remaining: 4 });
});

test('a cap of 0 refuses everything, and is distinguishable from an absent cap', () => {
  assert.deepEqual(decide({ globalLimit: 0 }), { ok: false, remaining: 5, reason: 'global' });
});

test('missing fields on a stored counter read as zero, not NaN', () => {
  const d = decide({ meter: { date: TODAY }, global: { date: TODAY } });
  assert.deepEqual(d, { ok: true, meterUsed: 1, globalUsed: 1, remaining: 4 });
});

console.log(`\n${run - failures}/${run} passed`);
if (failures) process.exit(1);
