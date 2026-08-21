/**
 * Contract tests for `subscribeSchema` — the newsletter signup body.
 *
 * The normalization is the part worth pinning: the parsed email is used as
 * the Firestore document id in `POST /api/subscribe`, so trimming and
 * lowercasing have to happen *in the schema*. If they drift back into the
 * route (or disappear), "A@Example.com " and "a@example.com" become two
 * subscriber documents for one person and the idempotent re-subscribe stops
 * being idempotent — a bug no typecheck can see, since both are strings.
 *
 * Run with `npm test`.
 */
import assert from 'node:assert/strict';
import { subscribeSchema } from '../src/lib/validation';

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

const parse = (body: unknown) => subscribeSchema.safeParse(body);

console.log('\nnewsletter subscribe schema');

test('what the footer form actually posts is accepted', () => {
  const r = parse({ email: 'reader@example.com' });
  assert.ok(r.success);
  assert.equal(r.data.email, 'reader@example.com');
});

test('case and surrounding whitespace normalize to one document id', () => {
  const variants = ['  Reader@Example.com', 'READER@EXAMPLE.COM', 'reader@example.com  '];
  for (const v of variants) {
    const r = parse({ email: v });
    assert.ok(r.success, v);
    assert.equal(r.data.email, 'reader@example.com', v);
  }
});

test('addresses that are not addresses are rejected', () => {
  for (const email of ['', 'reader', 'reader@', '@example.com', 'reader example.com', 'a@b']) {
    assert.equal(parse({ email }).success, false, JSON.stringify(email));
  }
});

test('over-long addresses are rejected (RFC 5321 caps at 254)', () => {
  const local = 'a'.repeat(250);
  assert.equal(parse({ email: `${local}@example.com` }).success, false);
});

test('a missing or non-string email is rejected, not coerced', () => {
  assert.equal(parse({}).success, false);
  assert.equal(parse({ email: null }).success, false);
  assert.equal(parse({ email: 42 }).success, false);
  assert.equal(parse({ email: ['a@b.com'] }).success, false);
  assert.equal(parse(null).success, false);
});

console.log(`\n${run - failures}/${run} passed`);
if (failures) process.exit(1);
