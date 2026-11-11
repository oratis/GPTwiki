import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { autoDraftEn } from '../content/auto-draft.en';
import { readRelease, releaseKeys, validateDraft } from './lib/editorial-release';

const [operation, ...args] = process.argv.slice(2);
const keys = new Set<string>();
if (operation === 'export') {
  const [stamp] = args;
  if (!/^\d{8}-\d{6}$/.test(stamp)) throw new Error('Invalid release timestamp');
  const errors = autoDraftEn.flatMap(validateDraft);
  if (errors.length) throw new Error(errors.join('\n'));
  for (const key of releaseKeys(autoDraftEn)) keys.add(key);
  mkdirSync('content/releases', { recursive: true });
  writeFileSync(`content/releases/${stamp}.json`, JSON.stringify(autoDraftEn, null, 2) + '\n', { flag: 'wx' });
} else if (operation === 'publish') {
  const [before, after] = args;
  if (![before, after].every(sha => /^[0-9a-f]{40}$/.test(sha))) throw new Error('Invalid push range');
  const files = execFileSync('git', ['diff', '--name-only', '--diff-filter=AM', before, after, '--',
    'content/auto-draft.en.ts', 'content/releases/*.json'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  for (const file of files) {
    const legacy = file === 'content/auto-draft.en.ts';
    const drafts = legacy ? autoDraftEn : readRelease(file);
    execFileSync('npx', ['tsx', 'scripts/seed-editorial.ts',
      legacy ? '--batch=auto-draft' : `--release=${file}`, '--apply'], { stdio: 'inherit' });
    for (const draft of drafts) if (draft.topicKey) keys.add(draft.topicKey);
  }
} else {
  throw new Error('Expected export or publish');
}
const output = process.env.BATCH_TOPIC_KEYS_FILE;
if (output) writeFileSync(output, JSON.stringify([...keys]));
