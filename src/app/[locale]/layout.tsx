import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import Providers from '@/components/layout/Providers';
import Header from '@/components/layout/Header';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';
import {
  hasLocale,
  supportedLocales,
  rtlLocales,
  getTranslations,
  type Locale,
} from '@/lib/i18n/server';

/** Pre-render the locale layout for every supported locale. */
export function generateStaticParams(): Array<{ locale: Locale }> {
  return supportedLocales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const t = getTranslations(locale);
  // `home.title` is "GPTwiki" across locales; `home.subtitle` is the localized tagline.
  const siteName = 'GPTwiki';
  const title = `${siteName} - ${t('home.subtitle')}`;
  const description = t('home.subtitle');

  // hreflang alternates — one entry per supported locale + x-default → en
  const languages: Record<string, string> = {};
  for (const loc of supportedLocales) languages[loc] = `https://gptwiki.net/${loc}`;
  languages['x-default'] = 'https://gptwiki.net/en';

  return {
    metadataBase: new URL('https://gptwiki.net'),
    title: { default: title, template: `%s | ${siteName}` },
    description,
    keywords: ['AI wiki', 'AI encyclopedia', 'collaborative wiki', 'GPT wiki', 'Claude', 'knowledge base'],
    authors: [{ name: 'GPTwiki Team' }],
    robots: { index: true, follow: true },
    icons: { icon: '/icon.svg' },
    openGraph: {
      title,
      description,
      url: `https://gptwiki.net/${locale}`,
      siteName,
      type: 'website',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://gptwiki.net/${locale}`,
      languages,
      types: { 'application/rss+xml': 'https://gptwiki.net/api/feed' },
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const t = getTranslations(locale);
  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="h-full">
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
              inLanguage: locale,
              description: t('home.subtitle'),
              potentialAction: {
                '@type': 'SearchAction',
                target: `https://gptwiki.net/${locale}/wiki?q={search_term_string}`,
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
        <Providers locale={locale}>
          <Header />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
