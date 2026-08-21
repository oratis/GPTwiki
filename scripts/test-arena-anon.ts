/**
 * Tests for anonymous battling.
 *
 * The thing under test is a split that is easy to collapse by accident: a
 * **cookie** identifies a voter, an **address** meters spend, and neither may do
 * the other's job. Swap them and you get either a quota anyone can reset by
 * clearing cookies, or a persistent record of who visited from where.
 *
 * The other invariant here is the one the leaderboard depends on: an anonymous
 * vote is recorded and never counted.
 */
import assert from 'node:assert/strict';
import {
  ANON_COOKIE,
  anonCookieHeader,
  anonVoterId,
  clientIpKey,
  isAnonVoterId,
  issueAnonToken,
  readAnonToken,
} from '../src/lib/arena/anon';
import { evaluateVote } from '../src/lib/arena/vote-filters';

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

function reqWith(headers: Record<string, string>): Request {
  return new Request('https://gptwiki.net/api/arena/battle', { headers });
}

console.log('\narena anon: voter token');

test('a freshly issued token round-trips through a Cookie header', () => {
  const token = issueAnonToken();
  const header = anonCookieHeader(token);
  const value = header.split(';')[0].split('=')[1];
  assert.equal(readAnonToken(reqWith({ cookie: `${ANON_COOKIE}=${value}` })), token);
});

test('tokens are unpredictable and of the shape the reader accepts', () => {
  const seen = new Set<string>();
  for (let i = 0; i < 200; i++) {
    const t = issueAnonToken();
    assert.match(t, /^[0-9a-f]{32}$/, t);
    assert.ok(!seen.has(t), 'issued a duplicate token');
    seen.add(t);
  }
});

test('a malformed or injected cookie value is rejected, not passed through', () => {
  // The token becomes part of a Firestore document id, so anything that is not
  // the exact shape we mint must be refused rather than sanitised.
  for (const bad of ['../../admin', 'abc', '', 'z'.repeat(32), `${'a'.repeat(31)}!`, 'A'.repeat(32)]) {
    assert.equal(readAnonToken(reqWith({ cookie: `${ANON_COOKIE}=${bad}` })), null, bad);
  }
});

test('the token is found among other cookies, and absence reads as absence', () => {
  const token = issueAnonToken();
  assert.equal(
    readAnonToken(reqWith({ cookie: `theme=dark; ${ANON_COOKIE}=${token}; other=1` })),
    token
  );
  assert.equal(readAnonToken(reqWith({ cookie: 'theme=dark' })), null);
  assert.equal(readAnonToken(reqWith({})), null);
});

test('the cookie is not readable by scripts and does not travel cross-site', () => {
  const header = anonCookieHeader(issueAnonToken());
  assert.ok(header.includes('HttpOnly'), header);
  assert.ok(header.includes('SameSite=Lax'), header);
  assert.ok(header.includes('Path=/'), header);
});

test('anonymous voter ids are namespaced so they cannot collide with accounts', () => {
  const token = issueAnonToken();
  assert.ok(isAnonVoterId(anonVoterId(token)));
  // A real account id is an opaque Firestore id; it must never look anonymous.
  assert.ok(!isAnonVoterId('kJ8sPqL2mN4vR7wX1yZ0'));
});

console.log('\narena anon: spend metering');

test('the meter key is derived from the address, not from the cookie', () => {
  // If the cookie fed the quota, clearing it would reset the allowance and the
  // limit would bound nothing at all.
  const a = clientIpKey(reqWith({ 'cf-connecting-ip': '203.0.113.7', cookie: `${ANON_COOKIE}=${'a'.repeat(32)}` }));
  const b = clientIpKey(reqWith({ 'cf-connecting-ip': '203.0.113.7', cookie: `${ANON_COOKIE}=${'b'.repeat(32)}` }));
  assert.equal(a, b, 'a new cookie must not buy a fresh allowance');
});

test('different addresses get different meters', () => {
  const a = clientIpKey(reqWith({ 'cf-connecting-ip': '203.0.113.7' }));
  const b = clientIpKey(reqWith({ 'cf-connecting-ip': '203.0.113.8' }));
  assert.notEqual(a, b);
});

test('the stored key is a digest, never the address', () => {
  const ip = '203.0.113.7';
  const key = clientIpKey(reqWith({ 'cf-connecting-ip': ip }));
  assert.match(key, /^[0-9a-f]{32}$/);
  assert.ok(!key.includes(ip), 'the address must not survive into storage');
  assert.ok(!key.includes('203'), key);
});

test('the proxy header wins over the client-controlled one', () => {
  // Cloudflare rewrites cf-connecting-ip on every request; x-forwarded-for's
  // first entry is whatever the caller typed. Trusting the latter would let one
  // address spend the whole allowance under a thousand fake ones.
  const spoofed = clientIpKey(
    reqWith({ 'cf-connecting-ip': '203.0.113.7', 'x-forwarded-for': '198.51.100.1' })
  );
  const honest = clientIpKey(reqWith({ 'cf-connecting-ip': '203.0.113.7' }));
  assert.equal(spoofed, honest, 'x-forwarded-for must not override cf-connecting-ip');
});

test('a request with no address headers still yields a usable key', () => {
  // Fails closed onto one shared bucket rather than throwing: an unmetered
  // request is worse than an over-shared meter.
  assert.match(clientIpKey(reqWith({})), /^[0-9a-f]{32}$/);
});

console.log('\narena anon: votes are recorded, never counted');

const CLEAN = {
  promptHash: 'h',
  recentPromptHashes: [] as string[],
  answersReadyAt: 1_000_000,
  votedAt: 1_000_000 + 10_000,
  answerA: 'A perfectly ordinary answer.',
  answerB: 'Another perfectly ordinary answer.',
};

test('an otherwise flawless anonymous vote still carries no weight', () => {
  const anon = evaluateVote({ ...CLEAN, signedIn: false });
  assert.equal(anon.weight, 0, 'anonymous votes must never reach the fit');
  assert.deepEqual(anon.flags, ['anonymous']);

  // The same vote from an account is the control: nothing else about it is
  // wrong, so signing in is the only difference.
  const signedIn = evaluateVote({ ...CLEAN, signedIn: true });
  assert.equal(signedIn.weight, 1);
});

test('signing in cannot rescue a vote that is bad for another reason', () => {
  const dup = evaluateVote({ ...CLEAN, signedIn: true, recentPromptHashes: ['h'] });
  assert.equal(dup.weight, 0);
  assert.ok(dup.flags.includes('duplicate'));
});

console.log(`\n${run - failures}/${run} passed`);
if (failures > 0) process.exit(1);
