import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/layout/Providers';
import Header from '@/components/layout/Header';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

export const metadata: Metadata = {
  title: {
    default: 'GPTwiki - AI-Powered Collaborative Wiki',
    template: '%s | GPTwiki',
  },
  description: 'Create wiki articles through AI conversations. Powered by Claude, GPT-4o, and Gemini. 100,000+ articles in 15 languages.',
  keywords: ['AI wiki', 'AI encyclopedia', 'collaborative wiki', 'GPT wiki', 'Claude', 'knowledge base', 'AI-powered'],
  authors: [{ name: 'GPTwiki Team' }],
  metadataBase: new URL('https://gptwiki.net'),
  openGraph: {
    title: 'GPTwiki - AI-Powered Collaborative Wiki',
    description: 'Create wiki articles through AI conversations. 100,000+ articles in 15 languages.',
    url: 'https://gptwiki.net',
    siteName: 'GPTwiki',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPTwiki - AI-Powered Collaborative Wiki',
    description: 'Create wiki articles through AI conversations. Powered by Claude, GPT-4o, and Gemini.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://gptwiki.net/api/feed',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'GPTwiki',
              url: 'https://gptwiki.net',
              description: 'AI-powered collaborative wiki. Ask Claude, GPT-4o, or Gemini any question — the answer becomes a permanent wiki article.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://gptwiki.net/wiki?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'Organization',
                name: 'GPTwiki',
                url: 'https://gptwiki.net',
              },
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-gray-50">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
