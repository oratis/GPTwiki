import type { Locale } from './locales';

/**
 * Build a locale-prefixed pathname. Paths pointing at APIs, static assets,
 * or external URLs pass through unchanged.
 *
 * Works on both client and server. Client components should get the current
 * locale from `useI18n()` or `useParams()`; server components should get it
 * from page params.
 */
export function localeHref(locale: Locale, path: string): string {
  if (!path.startsWith('/')) return path; // relative or external
  if (path.startsWith('//')) return path; // protocol-relative
  if (path.startsWith('/api/')) return path;
  if (path.startsWith('/_next/')) return path;
  // Already prefixed with the current locale — return unchanged.
  if (path.split('/')[1] === locale) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}
