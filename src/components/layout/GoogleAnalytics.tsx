'use client';

import Script from 'next/script';

/**
 * No fallback measurement id, on purpose.
 *
 * This used to read `process.env.NEXT_PUBLIC_GA_ID || '<a literal id>'`, which
 * made the `!GA_ID` guard below unreachable and meant every deployment of this
 * MIT-licensed repo — including forks and local runs — shipped visitor
 * analytics to a property belonging to the upstream author, silently, with no
 * way to turn it off short of editing the source.
 *
 * Unset now means gtag is never loaded at all.
 *
 * Note this is a build-time value: Next inlines `NEXT_PUBLIC_*` into the client
 * bundle during `next build`, so setting it on the running container has no
 * effect. It has to reach the image build — see the `NEXT_PUBLIC_GA_ID` build
 * arg in the Dockerfile and the `_GA_ID` substitution in cloudbuild.yaml.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
