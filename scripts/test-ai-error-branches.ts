/**
 * Every client component that reacts to the AI routes' 403s must handle BOTH
 * of them.
 *
 * The routes that resolve a provider key (`/api/chat`, `POST /api/wiki`,
 * `PUT /api/wiki/[id]`, `.../merge`, `.../threads`) all answer with exactly two
 * error codes: `QUOTA_EXHAUSTED` and `API_KEY_REQUIRED`. Which one fires is
 * decided by configuration, not by the caller:
 *
 *   - `FREE_DAILY_MESSAGES` defaults to 0 (`free-quota.ts`), and
 *   - `PLATFORM_OWNER_EMAIL` now defaults to unset, exempting nobody,
 *
 * so on a default deployment `resolveApiKeyForUser` returns `needsConfig` for
 * every user without a key of their own and the route answers
 * `API_KEY_REQUIRED`. `QUOTA_EXHAUSTED` is unreachable until an operator turns
 * the free tier on.
 *
 * `WikiContinueChat.tsx` handled only `QUOTA_EXHAUSTED`, i.e. only the branch
 * that cannot happen in the shipped configuration, so the one actionable error
 * in that flow ("add your API key") fell through to a generic failure toast.
 * That is invisible to typecheck and to eslint — both codes are just strings —
 * which is why it is pinned here instead.
 *
 * Deliberately a source-level check rather than a runtime one: exercising the
 * real handler would mean standing up Firestore and NextAuth, and the defect
 * being guarded is a missing branch, which is visible in the source.
 *
 * Run with `npm test`.
 */
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { locales } from '../src/lib/i18n/locales';

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

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (full.endsWith('.tsx') || full.endsWith('.ts')) out.push(full);
  }
  return out;
}

const sourceFiles = walk(path.join(repoRoot, 'src', 'components'));

console.log('\nAI error branches');

test('every component handling QUOTA_EXHAUSTED also handles API_KEY_REQUIRED', () => {
  const offenders = sourceFiles.filter((file) => {
    const src = readFileSync(file, 'utf8');
    return src.includes('QUOTA_EXHAUSTED') && !src.includes('API_KEY_REQUIRED');
  });

  assert.deepEqual(
    offenders.map((f) => path.relative(repoRoot, f)),
    [],
    'These components branch on QUOTA_EXHAUSTED but not API_KEY_REQUIRED. With ' +
      'FREE_DAILY_MESSAGES=0 and no PLATFORM_OWNER_EMAIL — the default and the ' +
      'current production configuration — the routes emit API_KEY_REQUIRED and ' +
      'never QUOTA_EXHAUSTED, so the handled branch is the unreachable one.'
  );
});

test('at least one component actually exercises this pair (the scan is not vacuous)', () => {
  const handlers = sourceFiles.filter((file) =>
    readFileSync(file, 'utf8').includes('QUOTA_EXHAUSTED')
  );
  assert.ok(
    handlers.length >= 3,
    `expected several components to branch on these codes, found ${handlers.length} — ` +
      'if the error contract was renamed, update this suite rather than deleting it'
  );
});

test("the 'apiKeys.required' string exists for every supported locale", () => {
  const translations = readFileSync(
    path.join(repoRoot, 'src', 'lib', 'i18n', 'translations.ts'),
    'utf8'
  );
  const localeCount = Object.keys(locales).length;
  const keyCount = (translations.match(/'apiKeys\.required'/g) || []).length;

  assert.ok(localeCount > 0, 'could not count locales — locales.ts shape changed');
  assert.equal(
    keyCount,
    localeCount,
    `'apiKeys.required' is defined ${keyCount} time(s) but there are ${localeCount} ` +
      'locales; the toast this fix shows would fall back to the raw key in the ' +
      'missing ones'
  );
});

console.log(`\n${run - failures}/${run} passed`);
process.exit(failures > 0 ? 1 : 0);
