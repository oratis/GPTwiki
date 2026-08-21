import { ARENA_CATEGORIES, isArenaCategory } from './categories';
// Straight from `locales`, not the `hasLocale` re-export in `i18n/server` —
// that module is `server-only`, which would pin this pure validation logic to
// the Next server bundle and make it untestable outside it.
import { locales } from '@/lib/i18n/locales';

/**
 * Leaderboard scopes.
 *
 * A scope is a snapshot document id, so the set of *offerable* scopes is fixed
 * in code while the set of *populated* ones depends on what the batch job found.
 * Following arena.ai's evolution (see `docs/arena-research.md` §2.5), slices
 * exist from the start but only earn a place in the UI once they carry enough
 * votes to publish an interval — so an empty slice renders the same honest empty
 * state as the overall board rather than being hidden.
 */

export const OVERALL_SCOPE = 'overall';

/**
 * Validate a `?scope=` parameter. Returns the overall scope for anything else.
 *
 * The return value is *rebuilt* from the validated parts rather than echoing the
 * input, and the input must split into exactly two segments. Both matter because
 * the result becomes a Firestore document id: `split(':', 2)` truncates instead
 * of keeping the remainder, so `category:coding:extra` would pass the category
 * check and then hand the untouched string through as an id.
 */
export function normalizeScope(raw: string | undefined): string {
  if (!raw || raw === OVERALL_SCOPE) return OVERALL_SCOPE;

  const parts = raw.split(':');
  if (parts.length !== 2) return OVERALL_SCOPE;
  const [kind, value] = parts;

  if (kind === 'category' && isArenaCategory(value)) return `category:${value}`;
  if (kind === 'locale' && value in locales) return `locale:${value}`;
  return OVERALL_SCOPE;
}

export interface ScopeOption {
  scope: string;
  /** i18n key for the label, or the raw locale/category token. */
  label: string;
}

/**
 * Scopes offered in the picker: overall, the current locale, and every
 * category. Other locales are reachable by URL but not listed — a reader on the
 * Chinese site has little use for a "Japanese battles only" tab.
 */
export function scopeOptions(locale: string): ScopeOption[] {
  return [
    { scope: OVERALL_SCOPE, label: 'arena.scope.overall' },
    { scope: `locale:${locale}`, label: 'arena.scope.thisLocale' },
    ...ARENA_CATEGORIES.map((category) => ({
      scope: `category:${category}`,
      label: `arena.category.${category}`,
    })),
  ];
}
