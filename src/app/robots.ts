import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/sitemap', '/api/feed', '/api/og'],
        disallow: ['/api/', '/login', '/profile/'],
      },
    ],
    sitemap: 'https://gptwiki.net/api/sitemap',
  };
}
