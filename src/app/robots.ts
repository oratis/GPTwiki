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
          '/login',
          '/profile/',
          '/chat',
          // Search-result variants shouldn't be indexed — they fragment
          // ranking across many low-value URLs.
          '/*?q=*',
        ],
      },
    ],
    sitemap: 'https://gptwiki.net/api/sitemap',
    host: 'https://gptwiki.net',
  };
}
