import { NextResponse, type NextRequest } from 'next/server';
import { supportedLocales, defaultLocale, matchLocale } from '@/lib/i18n/server';

// Paths that must never be rewritten with a locale prefix.
// API routes, Next.js internals, static assets, SEO files, auth callbacks.
const BYPASS_PREFIXES = [
  '/api',
  '/_next',
  '/embed',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon',
  '/icon',
  '/manifest.json',
];
const BYPASS_EXACT = new Set<string>([]);

function shouldBypass(pathname: string): boolean {
  if (BYPASS_EXACT.has(pathname)) return true;
  for (const p of BYPASS_PREFIXES) if (pathname.startsWith(p)) return true;
  // Allow files with an extension (favicons, OG images, etc.)
  if (/\.[a-zA-Z0-9]{2,5}$/.test(pathname)) return true;
  return false;
}

function pathHasLocale(pathname: string): boolean {
  for (const loc of supportedLocales) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) return true;
  }
  return false;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (shouldBypass(pathname)) return;
  if (pathHasLocale(pathname)) return;

  // Determine best locale: saved cookie first, then Accept-Language, then default.
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const locale =
    cookieLocale && supportedLocales.includes(cookieLocale as (typeof supportedLocales)[number])
      ? cookieLocale
      : matchLocale(request.headers.get('accept-language')) || defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  url.search = search;

  return NextResponse.redirect(url);
}

export const config = {
  // Run on every path except internals; bypass filtering above is additional safety.
  matcher: ['/((?!_next/static|_next/image).*)'],
};
