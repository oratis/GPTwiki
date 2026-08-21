/**
 * Tests for the third-party leaderboard mapping.
 *
 * The property under test throughout is faithfulness. This board's only value
 * is that it reproduces someone else's published numbers exactly, under their
 * licence — so the cases here are mostly about what the mapper must REFUSE to
 * do: invent a value, guess a version equivalence, or reorder a table.
 */
import assert from 'node:assert/strict';
import {
  LMARENA_SOURCE,
  MAX_ROWS,
  buildReferenceBoard,
  rowsUrl,
  servedModelIds,
  toReferenceRow,
  type RawArenaRow,
} from '../src/lib/arena/reference';

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
const SERVED = ['claude-sonnet-4-6', 'gpt-4o', 'gemini-2.0-flash'];

function raw(over: Partial<RawArenaRow> = {}): RawArenaRow {
  return {
    model_name: 'some-model',
    organization: 'someorg',
    license: 'Proprietary',
    rating: 1400,
    rating_lower: 1395,
    rating_upper: 1405,
    vote_count: 10_000,
    rank: 1,
    category: 'overall',
    leaderboard_publish_date: '2026-08-19',
    ...over,
  };
}

console.log('\narena reference: row mapping');

test('a well-formed row maps field for field', () => {
  const row = toReferenceRow(raw(), new Set());
  assert.deepEqual(row, {
    rank: 1,
    modelName: 'some-model',
    organization: 'someorg',
    modelLicense: 'Proprietary',
    rating: 1400,
    ratingLow: 1395,
    ratingHigh: 1405,
    votes: 10_000,
    served: false,
  });
});

test('a row missing any load-bearing number is dropped, not repaired', () => {
  // Rendering a dash where the source published a number would attribute our
  // gap to them. Dropping the row is the honest failure.
  for (const field of ['rating', 'rating_lower', 'rating_upper', 'vote_count', 'rank'] as const) {
    assert.equal(toReferenceRow(raw({ [field]: null }), new Set()), null, field);
    assert.equal(toReferenceRow(raw({ [field]: 'not a number' }), new Set()), null, field);
  }
  assert.equal(toReferenceRow(raw({ model_name: '' }), new Set()), null, 'model_name');
});

test('an inverted confidence interval is rejected', () => {
  // Means we misread the schema. A negative-width interval must never render.
  assert.equal(toReferenceRow(raw({ rating_lower: 1405, rating_upper: 1395 }), new Set()), null);
  // Equal bounds are legitimate — a zero-width interval is a real value here.
  assert.ok(toReferenceRow(raw({ rating_lower: 1400, rating_upper: 1400 }), new Set()));
});

test('an empty organization is reproduced as empty, not invented', () => {
  // The source genuinely leaves this blank on some rows. That is its data.
  const row = toReferenceRow(raw({ organization: '' }), new Set());
  assert.equal(row?.organization, '');
});

console.log('\narena reference: served-model matching');

test('served matching is exact — no version fuzzing', () => {
  const served = new Set(SERVED);
  assert.equal(toReferenceRow(raw({ model_name: 'gpt-4o' }), served)?.served, true);
  // The real LMArena board carries these, and neither is the model we serve.
  assert.equal(toReferenceRow(raw({ model_name: 'gpt-4o-2024-05-13' }), served)?.served, false);
  assert.equal(
    toReferenceRow(raw({ model_name: 'chatgpt-4o-latest-20250326' }), served)?.served,
    false
  );
});

test('the served list comes from models.ts, not a restatement', () => {
  // If someone repoints a provider slot, this must follow automatically.
  const ids = servedModelIds();
  assert.equal(ids.length, 3);
  assert.ok(ids.includes('claude-sonnet-4-6'), ids.join(','));
});

console.log('\narena reference: board assembly');

test('only the reproduced category survives', () => {
  const board = buildReferenceBoard(
    [raw({ category: 'overall' }), raw({ model_name: 'x', category: 'coding' })],
    { now: NOW, servedIds: SERVED }
  );
  assert.equal(board?.rows.length, 1);
});

test('a payload with no rows in the category yields null, not an empty board', () => {
  // An empty board would overwrite a good snapshot with nothing.
  assert.equal(
    buildReferenceBoard([raw({ category: 'coding' })], { now: NOW, servedIds: SERVED }),
    null
  );
  assert.equal(buildReferenceBoard([], { now: NOW, servedIds: SERVED }), null);
});

test('rows are ordered by rank, and ties break deterministically', () => {
  const board = buildReferenceBoard(
    [
      raw({ model_name: 'c', rank: 2 }),
      raw({ model_name: 'b', rank: 1 }),
      raw({ model_name: 'a', rank: 1 }),
    ],
    { now: NOW, servedIds: SERVED }
  );
  assert.deepEqual(board?.rows.map((r) => r.modelName), ['a', 'b', 'c']);
});

test('served models the source does not rank are recorded, not silently dropped', () => {
  // The real case: LMArena ranks claude-sonnet-4-6 and does not rank
  // gemini-2.0-flash at all. A blank would read as our oversight.
  const board = buildReferenceBoard([raw({ model_name: 'claude-sonnet-4-6' })], {
    now: NOW,
    servedIds: SERVED,
  });
  assert.deepEqual(board?.unrankedServedModels, ['gpt-4o', 'gemini-2.0-flash']);
});

test('absence is judged against the full category, not the truncated table', () => {
  // A served model ranked below the cut is ranked — it is just not shown.
  const rows = Array.from({ length: MAX_ROWS + 5 }, (_, i) =>
    raw({ model_name: i === MAX_ROWS + 2 ? 'gpt-4o' : `m${i}`, rank: i + 1 })
  );
  const board = buildReferenceBoard(rows, { now: NOW, servedIds: SERVED });
  assert.equal(board?.rows.length, MAX_ROWS, 'table is capped');
  assert.ok(!board?.unrankedServedModels.includes('gpt-4o'), 'ranked-but-unshown is not unranked');
});

test('the publish date is the source\'s, and fetchedAt is ours', () => {
  const board = buildReferenceBoard([raw()], { now: NOW, servedIds: SERVED });
  assert.equal(board?.publishedAt, '2026-08-19');
  assert.equal(board?.fetchedAt, NOW);
  assert.notEqual(board?.publishedAt, String(board?.fetchedAt));
});

test('a malformed date on one row does not invent a date for the board', () => {
  const board = buildReferenceBoard(
    [raw({ leaderboard_publish_date: null }), raw({ model_name: 'z', rank: 2 })],
    { now: NOW, servedIds: SERVED }
  );
  assert.equal(board?.publishedAt, '2026-08-19', 'falls through to a real row');
});

console.log('\narena reference: attribution and fetching');

test('every attribution field the licence requires is present and non-empty', () => {
  const board = buildReferenceBoard([raw()], { now: NOW, servedIds: SERVED })!;
  for (const field of ['sourceName', 'sourceUrl', 'license', 'licenseUrl', 'datasetUrl'] as const) {
    assert.ok(board[field] && board[field].length > 0, field);
  }
  assert.equal(board.license, 'CC BY 4.0');
  assert.ok(board.licenseUrl.startsWith('https://creativecommons.org/licenses/by/4.0'));
});

test('the source constant is not silently editable into an unattributed board', () => {
  assert.equal(LMARENA_SOURCE.sourceName, 'LMArena');
  assert.ok(LMARENA_SOURCE.datasetUrl.includes('lmarena-ai/leaderboard-dataset'));
});

test('the fetch URL is keyless and pinned to the dataset we vetted', () => {
  const url = new URL(rowsUrl(0));
  assert.equal(url.host, 'datasets-server.huggingface.co');
  assert.equal(url.searchParams.get('dataset'), 'lmarena-ai/leaderboard-dataset');
  assert.equal(url.searchParams.get('split'), 'latest');
  assert.equal(url.searchParams.get('offset'), '0');
  // No token, key or credential is ever appended.
  for (const key of [...url.searchParams.keys()]) {
    assert.ok(!/token|key|auth/i.test(key), `unexpected credential param: ${key}`);
  }
});

console.log(`\n${run - failures}/${run} passed`);
if (failures > 0) process.exit(1);
