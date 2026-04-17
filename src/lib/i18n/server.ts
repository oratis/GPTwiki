import 'server-only';
import { locales, defaultLocale, rtlLocales, type Locale } from './locales';
import translations from './translations';

export { locales, defaultLocale, rtlLocales };
export type { Locale };

/** Narrow a raw path segment into one of the supported locales. */
export function hasLocale(value: string): value is Locale {
  return value in locales;
}

/**
 * Pick the best locale from an Accept-Language header. Strips region
 * subtags ("zh-CN" → "zh") since we only stock language-level dictionaries.
 */
export function matchLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranges = acceptLanguage
    .split(',')
    .map((part) => {
      const [raw, qStr] = part.trim().split(';q=');
      return { tag: raw.trim().toLowerCase(), q: Number(qStr ?? 1) };
    })
    .filter((r) => r.tag && !Number.isNaN(r.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranges) {
    const primary = tag.split('-')[0];
    if (hasLocale(primary)) return primary;
  }
  return defaultLocale;
}

/**
 * Server-side translator. Mirrors the client useI18n() `t()` API so server
 * components and page metadata can translate strings without bundling the
 * client context.
 */
export function getTranslations(locale: Locale) {
  return (key: string, params?: Record<string, string | number>): string => {
    let text = translations[locale]?.[key] ?? translations[defaultLocale]?.[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  };
}

/** All supported locale codes as a readonly array. */
export const supportedLocales = Object.keys(locales) as Locale[];
