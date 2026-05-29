import type { MetadataRoute } from 'next';

/**
 * Allow rules listed BEFORE disallow so crawlers that take rules in order
 * (older Bingbot, some non-Google bots) still reach the SEO surface we
 * actually want indexed under /api/. Google honours the most-specific
 * match regardless of order, but ordering doesn't hurt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/api/sitemap',
          '/api/sitemap*',
          '/api/feed',
          '/api/og',
        ],
        disallow: [
          '/api/',
          // Pages live under /{locale}/... so disallow both the bare path
          // (the redirect source) and the localized variants for all locales.
          '/login',
          '/*/login',
          '/profile/',
          '/*/profile/',
          '/chat',
          '/*/chat',
          // Note: search-result pages (?q=) are kept crawlable here on purpose
          // and excluded via a page-level `noindex` robots meta instead — a
          // robots.txt disallow would block crawling and prevent Google from
          // ever seeing that noindex directive.
        ],
      },
    ],
    sitemap: 'https://gptwiki.net/api/sitemap',
    host: 'https://gptwiki.net',
  };
}
