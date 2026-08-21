/**
 * Test runner: executes every `scripts/test-*.ts` in this checkout.
 *
 * Discovery rather than a hand-maintained list in `package.json`. That list was
 * briefly wrong in exactly the way a list always eventually is — it named suites
 * that only exist on a later branch, so `npm test` died with MODULE_NOT_FOUND
 * before reaching the suites that were present. Discovering the files means a
 * branch runs precisely the tests it actually has, and adding a suite needs no
 * edit here.
 *
 * Each suite runs in its own process so one crashing cannot take the rest with
 * it, and the runner exits non-zero if any of them do.
 */
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';

const dir = path.dirname(new URL(import.meta.url).pathname);
const suites = readdirSync(dir)
  .filter((f) => f.startsWith('test-') && f.endsWith('.ts'))
  .sort();

if (suites.length === 0) {
  console.error('No test suites found in scripts/ — expected at least one test-*.ts');
  process.exit(1);
}

let failed = 0;
for (const suite of suites) {
  const result = spawnSync('npx', ['tsx', path.join(dir, suite)], { stdio: 'inherit' });
  if (result.status !== 0) failed++;
}

console.log(
  `\n${suites.length - failed}/${suites.length} suite(s) passed` +
    (failed > 0 ? ` — ${failed} failed` : '')
);
process.exit(failed > 0 ? 1 : 0);
