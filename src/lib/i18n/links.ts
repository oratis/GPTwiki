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
  // If path already has a locale prefix, return unchanged.
  const firstSeg = path.split('/')[1];
  if (firstSeg && (firstSeg === locale || /^[a-z]{2}$/i.test(firstSeg))) {
    // Could still be a legitimate non-locale segment like "ar" for articles.
    // Only strip when it matches current locale; otherwise prefix.
    if (firstSeg === locale) return path;
  }
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}
