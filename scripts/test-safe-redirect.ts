/**
 * Tests for `safeCallbackUrl`, the guard on the sign-in page's `?callbackUrl=`.
 *
 * The login page now sends users wherever that query parameter points, which
 * is the whole reason the guard exists: the parameter is attacker-controlled,
 * and an unguarded version turns a real sign-in page on a real domain into an
 * open redirect. Most of the cases below are the ways a value can look
 * relative while resolving somewhere else entirely.
 *
 * Run with `npm test`.
 */
import assert from 'node:assert/strict';
import { safeCallbackUrl } from '../src/lib/safe-redirect';

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

const FALLBACK = '/en/chat';

console.log('\nsafe callback url');

test('same-origin paths are preserved', () => {
  assert.equal(safeCallbackUrl('/en/profile/abc123', FALLBACK), '/en/profile/abc123');
  assert.equal(safeCallbackUrl('/zh/wiki/xyz', FALLBACK), '/zh/wiki/xyz');
  assert.equal(safeCallbackUrl('/', FALLBACK), '/');
});

test('query strings and fragments survive', () => {
  assert.equal(safeCallbackUrl('/en/search?q=tides', FALLBACK), '/en/search?q=tides');
  assert.equal(safeCallbackUrl('/en/wiki/x#section', FALLBACK), '/en/wiki/x#section');
});

test('missing or empty values fall back', () => {
  assert.equal(safeCallbackUrl(null, FALLBACK), FALLBACK);
  assert.equal(safeCallbackUrl(undefined, FALLBACK), FALLBACK);
  assert.equal(safeCallbackUrl('', FALLBACK), FALLBACK);
});

test('absolute cross-origin URLs are rejected', () => {
  assert.equal(safeCallbackUrl('https://evil.example/phish', FALLBACK), FALLBACK);
  assert.equal(safeCallbackUrl('http://evil.example', FALLBACK), FALLBACK);
});

test('protocol-relative URLs are rejected despite the leading slash', () => {
  // The case a naive `startsWith('/')` check waves straight through.
  assert.equal(safeCallbackUrl('//evil.example/phish', FALLBACK), FALLBACK);
});

test('backslash variants are rejected', () => {
  // Browsers normalise `\` to `/`, so this resolves cross-origin too.
  assert.equal(safeCallbackUrl('/\\evil.example', FALLBACK), FALLBACK);
  assert.equal(safeCallbackUrl('\\\\evil.example', FALLBACK), FALLBACK);
});

test('scheme payloads are rejected', () => {
  assert.equal(safeCallbackUrl('javascript:alert(1)', FALLBACK), FALLBACK);
  assert.equal(safeCallbackUrl('data:text/html,<script>', FALLBACK), FALLBACK);
  assert.equal(safeCallbackUrl('mailto:someone@example.com', FALLBACK), FALLBACK);
});

test('relative paths without a leading slash are rejected', () => {
  assert.equal(safeCallbackUrl('en/chat', FALLBACK), FALLBACK);
  assert.equal(safeCallbackUrl('../admin', FALLBACK), FALLBACK);
});

test('control characters and whitespace are rejected, not trimmed', () => {
  // Smuggling past naive parsers: a leading newline or tab before a scheme.
  assert.equal(safeCallbackUrl('/\nhttps://evil.example', FALLBACK), FALLBACK);
  assert.equal(safeCallbackUrl('/\tfoo', FALLBACK), FALLBACK);
  assert.equal(safeCallbackUrl('/foo bar', FALLBACK), FALLBACK);
  assert.equal(safeCallbackUrl(' /en/chat', FALLBACK), FALLBACK);
});

test('percent-encoded characters are still allowed', () => {
  // Legitimate paths encode these rather than carrying them literally.
  assert.equal(safeCallbackUrl('/en/search?q=a%20b', FALLBACK), '/en/search?q=a%20b');
});

console.log(`\n${run - failures}/${run} passed`);
process.exit(failures > 0 ? 1 : 0);
