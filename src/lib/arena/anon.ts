import { createHash, randomBytes } from 'node:crypto';

/**
 * Identity for visitors who are not signed in.
 *
 * The arena plan (`docs/gptwiki-arena-plan.md` §4) ruled that anonymous
 * visitors may battle and see the reveal, with their votes recorded at
 * `weight: 0`. Phase 1 shipped a hard 401 instead, justified by "the keys that
 * pay are the user's own" — a premise the deployment contradicts, since the
 * platform funds battles. §9 then measured the cost of that gate: three
 * registered accounts, zero battles, ever.
 *
 * Two different identifiers are used here, for two different jobs, and
 * conflating them would break one or the other:
 *
 *   - **A cookie token identifies a voter.** It makes one-vote-per-battle and
 *     prompt de-duplication work for anonymous readers exactly as they do for
 *     signed-in ones. It is a random opaque value — not a fingerprint and not a
 *     captcha, both of which the plan ruled out.
 *
 *   - **A hashed IP meters spend.** The cookie cannot do this job: clearing it
 *     is one click, so a cookie-keyed quota is not a quota. The IP is the only
 *     identifier an anonymous visitor cannot trivially change, which makes it
 *     the only honest basis for a limit on someone else's API bill.
 *
 * The IP is hashed rather than stored. We need a stable key, not an address,
 * and a collection of raw visitor IPs is a liability this feature has no reason
 * to create.
 */

/** Opaque per-browser voter token. HttpOnly — the client never reads it. */
export const ANON_COOKIE = 'gptwiki_arena_anon';

/** A year. The token carries no personal data; expiring it only loses dedup. */
const COOKIE_MAX_AGE_SEC = 365 * 24 * 60 * 60;

/**
 * Cookies are read and written as raw HTTP headers rather than through the
 * framework's helpers.
 *
 * `AGENTS.md` warns that this Next version has breaking changes from what is in
 * training data, and directs us to `node_modules/next/dist/docs/` — which this
 * install does not ship. `Cookie` and `Set-Cookie` are stable HTTP, so parsing
 * them directly is correct under every version and needs no doc to confirm.
 */
export function readAnonToken(req: Request): string | null {
  const header = req.headers.get('cookie');
  if (!header) return null;
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() !== ANON_COOKIE) continue;
    const value = part.slice(eq + 1).trim();
    // Only accept the shape we issue. A malformed or injected value would
    // otherwise become a Firestore document id.
    return /^[0-9a-f]{32}$/.test(value) ? value : null;
  }
  return null;
}

/** Mint a fresh anonymous token. */
export function issueAnonToken(): string {
  return randomBytes(16).toString('hex');
}

/**
 * `Set-Cookie` value for a token.
 *
 * `Secure` is omitted outside production so the flow is testable over plain
 * http on localhost; everywhere else the cookie is https-only.
 */
export function anonCookieHeader(token: string): string {
  const parts = [
    `${ANON_COOKIE}=${token}`,
    'Path=/',
    `Max-Age=${COOKIE_MAX_AGE_SEC}`,
    'HttpOnly',
    'SameSite=Lax',
  ];
  if (process.env.NODE_ENV === 'production') parts.push('Secure');
  return parts.join('; ');
}

/**
 * The voter id stored on anonymous votes.
 *
 * Prefixed so an anonymous voter can never collide with a signed-in user id,
 * and so anything reading `arenaVotes` can tell the two apart without a join.
 */
export function anonVoterId(token: string): string {
  return `anon:${token}`;
}

/** True when a voter id was minted by this module. */
export function isAnonVoterId(voterId: string): boolean {
  return voterId.startsWith('anon:');
}

/**
 * The client IP, preferring headers a proxy sets over ones a client controls.
 *
 * Cloudflare rewrites `cf-connecting-ip` on every proxied request, so unlike
 * the first entry of `x-forwarded-for` it cannot be spoofed to dodge a limit.
 * This mirrors `getClientId` in `@/lib/rate-limit`; the difference is that this
 * one is used for a *persisted* quota, so its result gets hashed.
 */
function clientIp(req: Request): string {
  const cf = req.headers.get('cf-connecting-ip');
  if (cf?.trim()) return cf.trim();
  const real = req.headers.get('x-real-ip');
  if (real?.trim()) return real.trim();
  const xff = req.headers.get('x-forwarded-for');
  const first = xff?.split(',')[0]?.trim();
  if (first) return first;
  return 'unknown';
}

/**
 * A stable, non-reversible key for one client address.
 *
 * Salted with `AUTH_SECRET` so the stored digests are not a rainbow-table
 * lookup away from the addresses they came from. Rotating that secret resets
 * everyone's daily allowance once, which is a much smaller problem than keeping
 * a list of visitor IPs.
 */
export function clientIpKey(req: Request): string {
  const salt = process.env.AUTH_SECRET || 'gptwiki-arena-anon';
  return createHash('sha256').update(`${salt}:${clientIp(req)}`).digest('hex').slice(0, 32);
}
