/**
 * Fail the build if a credential-bearing file is tracked again.
 *
 * Not a general secret scanner — a guard against the exact thing that already
 * happened here twice. The Feishu `APP_SECRET` was hardcoded in nine
 * `scripts/write-*.py` files, committed to a public repo in `00c5244`
 * (2026-04-09), untracked in `8524697` (2026-06-10) — and then re-added on
 * 2026-08-08 by a branch that had forked *before* the untrack commit and so
 * still carried the files. `.gitignore` cannot prevent that: it stops new
 * adds, not files already in a branch's index.
 *
 * So the check runs over `git ls-files`, i.e. what is actually tracked, rather
 * than the working tree. Two rules:
 *
 *  1. No `scripts/write-*.py`. Those are Feishu doc-automation scripts; they
 *     are operational tooling, not part of GPTwiki, and every copy of them
 *     that has ever existed carried a live credential.
 *  2. No literal assignment of a credential-shaped constant. Deliberately
 *     narrow — it matches an assignment of a long opaque string to a name like
 *     APP_SECRET / API_KEY / PRIVATE_KEY, not any string that looks random.
 *     A wide entropy scan on a repo of 15-language content would cry wolf
 *     until someone disabled it, which is worse than no check.
 *
 * `docs/security/feishu-secret-rotation.md` is exempt from rule 2: it has to
 * name the variables to explain the incident.
 *
 * Usage: npx tsx scripts/check-no-secrets.ts   (exit 1 on a finding)
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

/** Paths that must never be tracked again, as (matcher, why) pairs. */
const BANNED_PATHS: { test: (p: string) => boolean; why: string }[] = [
  {
    test: (p) => /^scripts\/write-[^/]*\.py$/.test(p),
    why: 'Feishu ops scripts — every historical copy carried a live APP_SECRET. They belong in a private ops repo.',
  },
];

/**
 * A credential-shaped literal: NAME = "…" where NAME ends in one of the
 * secret-ish words and the value is 16+ opaque characters with no spaces.
 * Placeholders that are obviously not secrets are allowed through.
 */
const SECRET_ASSIGNMENT =
  /\b(?:APP_SECRET|API_KEY|APIKEY|SECRET_KEY|PRIVATE_KEY|ACCESS_TOKEN|CLIENT_SECRET)\b\s*[:=]\s*['"`]([A-Za-z0-9_\-+/=]{16,})['"`]/;

const PLACEHOLDER = /^(?:x{4,}|X{4,}|your|YOUR|placeholder|PLACEHOLDER|example|EXAMPLE|dummy|DUMMY|test|TEST|changeme|CHANGEME|redacted|REDACTED|sk-xxx)/;

/** Files allowed to *describe* the pattern without being a finding. */
const EXEMPT_FROM_LITERALS = new Set([
  'docs/security/feishu-secret-rotation.md',
  'scripts/check-no-secrets.ts',
  'scripts/scrub-feishu-secret.sh',
]);

// Text-ish files only: a scan of binary assets finds nothing but noise.
const SCANNED = /\.(ts|tsx|js|jsx|mjs|cjs|py|sh|bash|zsh|json|ya?ml|toml|env|md|txt|Dockerfile)$|(^|\/)(Dockerfile|\.env[^/]*)$/;

function trackedFiles(): string[] {
  return execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);
}

const findings: string[] = [];

for (const file of trackedFiles()) {
  for (const rule of BANNED_PATHS) {
    if (rule.test(file)) findings.push(`${file}: banned path — ${rule.why}`);
  }

  if (EXEMPT_FROM_LITERALS.has(file) || !SCANNED.test(file)) continue;

  let content: string;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue; // unreadable or binary — nothing to scan
  }
  if (content.includes('\0')) continue;

  content.split('\n').forEach((line, i) => {
    const m = line.match(SECRET_ASSIGNMENT);
    if (m && !PLACEHOLDER.test(m[1])) {
      findings.push(
        `${file}:${i + 1}: credential-shaped literal assigned to a secret-named constant. ` +
          'Read it from the environment instead; see .env.example.'
      );
    }
  });
}

if (findings.length) {
  console.error(`\n✖ ${findings.length} finding(s):\n`);
  for (const f of findings) console.error(`  ${f}`);
  console.error(
    '\nIf a finding is a false positive, narrow the pattern or add the path to ' +
      'EXEMPT_FROM_LITERALS in scripts/check-no-secrets.ts — with a comment saying why.\n'
  );
  process.exit(1);
}

console.log(`✓ no banned paths or credential literals in ${trackedFiles().length} tracked files`);
