/**
 * Tests for the platform-owner exemption.
 *
 * This exemption hands out un-metered use of the deployment's own provider
 * keys, so the interesting cases are all the ways it could say "yes" when it
 * should say "no". It previously defaulted to a hardcoded personal address,
 * which meant every fork and every unconfigured deployment exempted an account
 * its operator did not control; the cases below pin the replacement posture —
 * unset means nobody.
 *
 * Run with `npm test`.
 */
import assert from 'node:assert/strict';
import { isPlatformOwner, hasPlatformOwner } from '../src/lib/ai/platform-owner';

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

/** Run `fn` with PLATFORM_OWNER_EMAIL set to `value` (undefined = unset). */
function withOwner(value: string | undefined, fn: () => void): void {
  const previous = process.env.PLATFORM_OWNER_EMAIL;
  if (value === undefined) delete process.env.PLATFORM_OWNER_EMAIL;
  else process.env.PLATFORM_OWNER_EMAIL = value;
  try {
    fn();
  } finally {
    if (previous === undefined) delete process.env.PLATFORM_OWNER_EMAIL;
    else process.env.PLATFORM_OWNER_EMAIL = previous;
  }
}

console.log('\nplatform owner exemption');

test('unset: nobody is the owner, and there is no hardcoded default', () => {
  withOwner(undefined, () => {
    assert.equal(hasPlatformOwner(), false);
    assert.equal(isPlatformOwner('anyone@example.com'), false);
    assert.equal(isPlatformOwner('owner@example.com'), false);
  });
});

test('unset + user with no email: the nullish pair must not compare equal', () => {
  // The regression this guards. `email === OWNER_EMAIL` with both nullish is
  // `true`, which silently promoted an anonymous user to owner.
  withOwner(undefined, () => {
    assert.equal(isPlatformOwner(null), false);
    assert.equal(isPlatformOwner(undefined), false);
    assert.equal(isPlatformOwner(''), false);
  });
});

test('configured + user with no email: still not the owner', () => {
  withOwner('owner@example.com', () => {
    assert.equal(isPlatformOwner(null), false);
    assert.equal(isPlatformOwner(undefined), false);
    assert.equal(isPlatformOwner(''), false);
  });
});

test('configured: only the exact configured address matches', () => {
  withOwner('owner@example.com', () => {
    assert.equal(hasPlatformOwner(), true);
    assert.equal(isPlatformOwner('owner@example.com'), true);
    assert.equal(isPlatformOwner('someone.else@example.com'), false);
  });
});

test('blank or whitespace-only config counts as unset, not as a match', () => {
  // A deployment that exports PLATFORM_OWNER_EMAIL="" must not thereby exempt
  // users whose stored email is also empty.
  for (const blank of ['', '   ']) {
    withOwner(blank, () => {
      assert.equal(hasPlatformOwner(), false);
      assert.equal(isPlatformOwner(''), false);
      assert.equal(isPlatformOwner('   '), false);
    });
  }
});

test('surrounding whitespace in the env value is tolerated', () => {
  withOwner('  owner@example.com  ', () => {
    assert.equal(isPlatformOwner('owner@example.com'), true);
  });
});

console.log(`\n${run - failures}/${run} passed`);
process.exit(failures > 0 ? 1 : 0);
