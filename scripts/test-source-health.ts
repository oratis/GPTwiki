/**
 * Tests for the citation health check — scripts/lib/source-health.ts.
 *
 * These exist because of what PR #138 nearly published. The drafter's quality
 * gate checked headings and prose length and stopped there, so three articles
 * reached review with 7 of their 14 citations dead; air-fryer-vs-convection-oven
 * had all four sources 404, every figure in it unsourced while still reading as
 * cited. A reader cannot see that, and Google indexes it anyway.
 *
 * The interesting risk is the OPPOSITE error. Real publishers routinely refuse
 * anonymous bots — Investopedia answers 402, Fidelity 403, Serious Eats 402 —
 * and the articles already live on production cite exactly those. A check that
 * equated "not 200" with "dead" would strip the mainstream sources an
 * encyclopedia most wants, and would do it silently. So most of these cases pin
 * the statuses that must NOT be treated as fatal; only a server positively
 * disclaiming the resource (404/410) may drop a citation.
 *
 * Run with `npm test`.
 */
import assert from 'node:assert/strict';
import { classifyStatus, checkUrl, verifySources } from './lib/source-health';

let failures = 0;
let run = 0;

function test(name: string, fn: () => void | Promise<void>): Promise<void> {
  run++;
  return Promise.resolve()
    .then(fn)
    .then(() => console.log(`  ok  ${name}`))
    .catch((err: Error) => {
      failures++;
      console.error(`FAIL  ${name}`);
      console.error(`      ${err.message.split('\n').join('\n      ')}`);
    });
}

/** A fetch stub that maps url → status, or throws for network failure. */
function stubFetch(map: Record<string, number | 'throw'>): typeof fetch {
  return (async (url: string | URL | Request, init?: RequestInit) => {
    const key = String(url);
    const v = map[key];
    if (v === undefined) throw new Error(`unexpected URL in test: ${key}`);
    if (v === 'throw') throw new Error('ECONNREFUSED');
    void init;
    return { status: v, ok: v >= 200 && v < 300 } as Response;
  }) as unknown as typeof fetch;
}

console.log('\ncitation health');

const cases: Array<[number, string]> = [
  [200, 'live'],
  [204, 'live'],
  [301, 'live'],
  [302, 'live'],
];

async function main(): Promise<void> {
  for (const [status, expected] of cases) {
    await test(`${status} → ${expected}`, () => {
      assert.equal(classifyStatus(status), expected);
    });
  }

  await test('404 and 410 are the ONLY fatal statuses', () => {
    assert.equal(classifyStatus(404), 'dead');
    assert.equal(classifyStatus(410), 'dead');
  });

  await test('paywalls and bot-blocks are kept, not dropped', () => {
    // These are the real statuses returned by sources already cited on
    // production: Investopedia 402, Fidelity 403. Dropping them would strip
    // correct citations.
    for (const s of [401, 402, 403, 405, 406, 429]) {
      assert.equal(classifyStatus(s), 'blocked', `status ${s} must not be 'dead'`);
    }
  });

  await test('a server erroring today does not condemn a citation', () => {
    for (const s of [500, 502, 503, 504]) {
      assert.equal(classifyStatus(s), 'blocked', `status ${s} must not be 'dead'`);
    }
  });

  await test('checkUrl retries a HEAD-rejecting server as GET', async () => {
    let calls = 0;
    const f = (async (_u: string, init?: RequestInit) => {
      calls++;
      // 405 to HEAD, 200 to GET — common for CDN-fronted docs.
      return { status: init?.method === 'HEAD' ? 405 : 200 } as Response;
    }) as unknown as typeof fetch;

    assert.equal(await checkUrl('https://example.com/x', f), 'live');
    assert.equal(calls, 2, 'expected a HEAD then a GET');
  });

  await test('a total network failure counts as dead', async () => {
    const f = stubFetch({ 'https://nope.invalid/': 'throw' });
    assert.equal(await checkUrl('https://nope.invalid/', f), 'dead');
  });

  await test("verifySources drops only the dead, and reports what it dropped", async () => {
    // Mirrors the real PR #138 led-vs-incandescent-math source block.
    const sources = [
      { title: 'DOE LED Lighting', url: 'https://www.energy.gov/energysaver/led-lighting' },
      { title: 'ENERGY STAR', url: 'https://www.energystar.gov/led' },
      { title: 'DOE lighting choices', url: 'https://www.energy.gov/energysaver/lighting-choices' },
      { title: 'EIA prices', url: 'https://www.eia.gov/electricity/' },
      { title: 'DOE SSL', url: 'https://www.energy.gov/eere/ssl/ssl-program-documents' },
    ];
    const { kept, dropped } = await verifySources(
      sources,
      stubFetch({
        'https://www.energy.gov/energysaver/led-lighting': 404,
        'https://www.energystar.gov/led': 200,
        'https://www.energy.gov/energysaver/lighting-choices': 404,
        'https://www.eia.gov/electricity/': 302,
        'https://www.energy.gov/eere/ssl/ssl-program-documents': 404,
      })
    );

    assert.equal(dropped.length, 3);
    assert.equal(kept.length, 2);
    assert.deepEqual(
      kept.map((s) => s.title).sort(),
      ['EIA prices', 'ENERGY STAR']
    );
  });

  await test('the air-fryer case — every source dead — keeps nothing', async () => {
    // This draft must fail the caller's MIN_LIVE_SOURCES check rather than
    // ship as a plausible-looking cited article.
    const { kept, dropped } = await verifySources(
      [
        { title: 'ATK', url: 'https://a.test/1' },
        { title: 'DOE', url: 'https://a.test/2' },
        { title: "Cook's", url: 'https://a.test/3' },
      ],
      stubFetch({ 'https://a.test/1': 404, 'https://a.test/2': 404, 'https://a.test/3': 404 })
    );

    assert.equal(kept.length, 0);
    assert.equal(dropped.length, 3);
  });

  await test('an all-healthy block is passed through untouched', async () => {
    // The docker-vs-vm article already on production: 5/5 live. A check that
    // perturbs a good article is a regression.
    const sources = [
      { title: 'Docker', url: 'https://d.test/1' },
      { title: 'Red Hat', url: 'https://d.test/2' },
    ];
    const { kept, dropped } = await verifySources(
      sources,
      stubFetch({ 'https://d.test/1': 200, 'https://d.test/2': 200 })
    );

    assert.equal(dropped.length, 0);
    assert.deepEqual(kept, sources);
  });

  await test('an empty source list is not an error', async () => {
    const { kept, dropped } = await verifySources([], stubFetch({}));
    assert.equal(kept.length, 0);
    assert.equal(dropped.length, 0);
  });

  console.log(`\n${run - failures}/${run} passed`);
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
