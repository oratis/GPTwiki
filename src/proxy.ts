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

// Shared secret injected by Cloudflare Transform Rule on every request that
// transits CF. Direct hits to the Cloud Run URL (bypassing CF, e.g. found via
// certificate transparency logs) will not carry this header.
//
// Setup (see docs/cloudflare-migration.md §5.1):
//   1. CF dashboard → Rules → Transform Rules → Modify Request Header:
//        Add X-Origin-Auth: <random secret>  for all matched requests
//   2. Cloud Run → service env vars: ORIGIN_AUTH_SECRET=<same value>
//
// If the env var is unset (local dev, staging, or pre-rollout), the check is
// skipped — preserves existing behavior so this change is safe to deploy
// before the CF Transform Rule is created.
const ORIGIN_AUTH_SECRET = process.env.ORIGIN_AUTH_SECRET;

/**
 * Constant-time string comparison.
 *
 * `a !== b` short-circuits on the first differing byte, so the time it takes
 * leaks how much of the secret a guess got right. That is the standard way
 * shared secrets are recovered byte-by-byte. The margin is small over a
 * network and Cloudflare sits in front, but this is a header compared on
 * EVERY request — the cheapest possible place to get it right.
 *
 * Written by hand rather than with node:crypto's timingSafeEqual because Next
 * middleware runs on the Edge runtime, where node:crypto is unavailable.
 * Compares over a fixed number of iterations and folds the length difference
 * into the accumulator so neither the loop count nor an early return depends
 * on the secret.
 */
function timingSafeEqual(provided: string | null, expected: string): boolean {
  if (provided === null) return false;
  let diff = provided.length ^ expected.length;
  const n = Math.max(provided.length, expected.length);
  for (let i = 0; i < n; i++) {
    diff |= (provided.charCodeAt(i) || 0) ^ (expected.charCodeAt(i) || 0);
  }
  return diff === 0;
}

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

  // Origin protection: when ORIGIN_AUTH_SECRET is configured, reject any
  // request that doesn't carry the matching X-Origin-Auth header. This
  // prevents attackers from bypassing CF rate-limit / WAF by hitting the
  // Cloud Run URL directly.
  if (ORIGIN_AUTH_SECRET) {
    const provided = request.headers.get('x-origin-auth');
    if (!timingSafeEqual(provided, ORIGIN_AUTH_SECRET)) {
      return new NextResponse('Forbidden: direct origin access blocked', {
        status: 403,
      });
    }
  }

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
