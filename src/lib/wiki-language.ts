import { defaultLocale, locales, type Locale } from './i18n/locales';

export function articleLocale(language?: string, source?: string): Locale {
  const code = (language || source?.match(/^wikipedia-([a-z]{2})(?:-|$)/)?.[1])
    ?.toLowerCase().split(/[-_]/)[0];
  return code && Object.hasOwn(locales, code) ? code as Locale : defaultLocale;
}

export function articleUrl(id: string, locale: Locale): string {
  return `https://gptwiki.net/${locale}/wiki/${encodeURIComponent(id)}`;
}

/** Each alternate must identify an actual edition of this topic. */
export function editionLinks(id: string, locale: Locale, editions: { id: string; language: string }[]) {
  const byLocale = new Map<string, string>();
  const ambiguous = new Set<string>();
  for (const edition of editions) {
    if (!Object.hasOwn(locales, edition.language)) continue;
    if (byLocale.has(edition.language)) ambiguous.add(edition.language);
    byLocale.set(edition.language, articleUrl(edition.id, edition.language as Locale));
  }
  for (const lang of ambiguous) byLocale.delete(lang);
  byLocale.set(locale, articleUrl(id, locale));
  return Object.fromEntries(byLocale);
}
