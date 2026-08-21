/**
 * Citation health checks for auto-authored drafts.
 *
 * The drafter's quality gate checked that an article had headings and enough
 * prose, and nothing else — so it happily passed articles whose citations did
 * not exist. PR #138 shipped 7 dead URLs out of 14; one article
 * (air-fryer-vs-convection-oven) had all four of its sources 404, meaning every
 * number in it was effectively unsourced while still *looking* cited. On a site
 * whose whole premise is "AI answers, with citations", that is the worst kind
 * of defect: invisible to a reader, and indexed by Google.
 *
 * The hard part is not detecting 404s, it is NOT over-detecting. Plenty of
 * legitimate publishers refuse anonymous bots: Investopedia answers 402,
 * Fidelity 403, Serious Eats 402. Those URLs are real and correct, and a naive
 * "status !== 200 means dead" check would strip exactly the mainstream sources
 * an encyclopedia article should be citing. So a status is only ever treated as
 * fatal when the server positively says the resource is not there.
 */

export type SourceHealth = 'live' | 'blocked' | 'dead';

export interface Source {
  title: string;
  url: string;
}

/**
 * Classify an HTTP status for citation purposes.
 *
 * - `live`    — 2xx, or a redirect chain that resolved (fetch follows them).
 * - `dead`    — the server says the resource is not there. Only 404 and 410.
 * - `blocked` — the server is refusing US, not disclaiming the resource
 *               (401/402/403/405/406/429) or is broken right now (5xx).
 *               Kept: a paywall or a bot-block is not evidence of a bad URL,
 *               and a 502 today says nothing about the citation.
 */
export function classifyStatus(status: number): SourceHealth {
  if (status === 404 || status === 410) return 'dead';
  if (status >= 200 && status < 400) return 'live';
  return 'blocked';
}

/** Non-2xx-aware fetch of one URL. Network/DNS failure counts as `dead`. */
export async function checkUrl(
  url: string,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = 15_000
): Promise<SourceHealth> {
  // HEAD first (cheap), then GET — a fair number of servers reject HEAD with
  // 405 even though the page is fine, and some CDNs only 404 on a real GET.
  for (const method of ['HEAD', 'GET'] as const) {
    try {
      const res = await fetchImpl(url, {
        method,
        redirect: 'follow',
        signal: AbortSignal.timeout(timeoutMs),
        headers: {
          // Anonymous scripted requests get blocked far more often than a
          // browser-shaped one; this reduces false `blocked` results.
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        },
      });
      const health = classifyStatus(res.status);
      // A HEAD that comes back 405/501 tells us nothing — retry as GET.
      if (method === 'HEAD' && (res.status === 405 || res.status === 501)) continue;
      return health;
    } catch {
      if (method === 'GET') return 'dead'; // DNS failure, refused, or timeout on both verbs
    }
  }
  return 'dead';
}

export interface SourceReport {
  kept: Source[];
  dropped: Source[];
  /** Parallel to `kept`, for logging. */
  health: Map<string, SourceHealth>;
}

/**
 * Check every citation, dropping only the ones a server positively disclaimed.
 *
 * Dropping rather than annotating is deliberate: a dead link in a published
 * encyclopedia article is worse than a missing one, and the article's prose
 * does not name its sources inline, so removing an entry loses no reference.
 * Callers should log `dropped` — a draft quietly losing half its citations is
 * a signal about the generation, not just about the web.
 */
export async function verifySources(
  sources: readonly Source[],
  fetchImpl: typeof fetch = fetch
): Promise<SourceReport> {
  const results = await Promise.all(
    sources.map(async (s) => ({ source: s, health: await checkUrl(s.url, fetchImpl) }))
  );

  const kept: Source[] = [];
  const dropped: Source[] = [];
  const health = new Map<string, SourceHealth>();
  for (const r of results) {
    health.set(r.source.url, r.health);
    (r.health === 'dead' ? dropped : kept).push(r.source);
  }
  return { kept, dropped, health };
}
