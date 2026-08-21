# Contributing to GPTwiki

Thanks for your interest in improving GPTwiki! This project turns AI conversations
into a living, multilingual, searchable encyclopedia — contributions of all sizes
are welcome, from typo fixes to new content clusters to features.

## Ways to contribute

- 🐛 **Report a bug** — open an [issue](https://github.com/oratis/GPTwiki/issues/new/choose).
- 💡 **Propose a feature** — open a feature-request issue so we can align before you build.
- 🌍 **Improve localization** — the editorial content lives in `content/` across 15 locales.
- 📝 **Fix docs** — README, `docs/`, code comments.
- 🧑‍💻 **Pick up a [good first issue](https://github.com/oratis/GPTwiki/labels/good%20first%20issue).**

## Development setup

> ⚠️ This repo runs a customized build of **Next.js 16**. APIs and conventions may
> differ from upstream — read the relevant guide in `node_modules/next/dist/docs/`
> before changing framework code (see [`AGENTS.md`](AGENTS.md)).

```bash
git clone https://github.com/<you>/GPTwiki.git && cd GPTwiki
npm install
cp .env.example .env.local      # add at least one AI key + auth/Firebase creds
npm run dev                     # → http://localhost:3000
```

You only need credentials for the pieces you're touching — e.g. a single AI key
to work on chat, or none at all for most docs/content changes.

## Before you open a PR

Run the same checks CI does:

```bash
npm run typecheck     # tsc --noEmit
npm run lint          # eslint
npm test              # scripts/test-*.ts, auto-discovered by scripts/run-tests.ts
npm run build         # next build (for non-trivial changes)
```

Add a `scripts/test-<thing>.ts` next to the code you change when the behaviour
is worth pinning; the runner picks it up without registration.

A pre-commit hook (husky + lint-staged) runs `eslint --fix` on staged files.

## Pull request workflow

1. **Fork** and create a branch: `git checkout -b feat/short-description`.
2. **Keep PRs focused** — one logical change per PR makes review faster.
3. **Write a clear description** — what changed, why, and how you verified it.
   Link the issue it closes (`Closes #123`).
4. Make sure `typecheck`, `lint`, `test`, and (for code) `build` pass.
5. Open the PR and fill in the template.

### Commit messages

We loosely follow [Conventional Commits](https://www.conventionalcommits.org/):
`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, etc. A clear subject line and a
body explaining *why* beats a perfect format.

## Content & localization

- Editorial clusters live in `content/<cluster>.<locale>.ts` (15 locales).
- Translations should be **native, not machine-translated** — quality is what makes
  this content rank and get cited.
- New clusters should follow the structure of an existing one (headings, tables,
  FAQ, citations, disclaimers).

## Security

Found a vulnerability or a leaked credential? **Do not open a public issue.**
Email the maintainer (see the GitHub profile) with details. See
[`docs/security/`](docs/security) for ongoing security notes.

## Code of Conduct

Be respectful, assume good intent, and keep discussion constructive. Harassment,
discrimination, and personal attacks are not tolerated. Maintainers may remove
comments, commits, and contributions that violate this, and may block repeat
offenders. By participating, you agree to uphold these standards.

---

By contributing, you agree that your contributions are licensed under the
project's [MIT License](LICENSE).
