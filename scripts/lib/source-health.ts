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

/**
 * Check one URL. `dead` only when the evidence is strong.
 *
 * HEAD is tried first because it is cheap, but its answer is only ever trusted
 * when it is POSITIVE. Real servers lie on HEAD: cloud.google.com/learn/
 * containers-vs-vms — cited by an article already live on production — answers
 * 404 to HEAD and 200 with 40KB of content to GET. An earlier version of this
 * function returned on the first HEAD verdict and would have deleted that
 * citation. So a non-live HEAD proves nothing and always falls through to GET,
 * which is authoritative.
 *
 * The reverse trap is just as real and is why this uses fetch rather than
 * shelling out to curl: FDA's WAF serves a hard 404 to curl and a correct 200
 * to a normal client, for the same URL and the same User-Agent.
 *
 * A thrown request is not proof of anything either, except when DNS says the
 * host does not exist — that is the fabricated-domain case, which is worth
 * catching. Timeouts, resets and TLS errors are transient and are kept.
 */
export async function checkUrl(
  url: string,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = 20_000
): Promise<SourceHealth> {
  const attempt = async (method: 'HEAD' | 'GET'): Promise<SourceHealth | 'error'> => {
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
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });
      return classifyStatus(res.status);
    } catch (err) {
      // A host that does not resolve is the fabricated-URL case.
      const cause = (err as { cause?: { code?: string } }).cause;
      if (cause?.code === 'ENOTFOUND') return 'dead';
      return 'error';
    }
  };

  // A positive HEAD is conclusive; anything else must be confirmed by GET.
  if ((await attempt('HEAD')) === 'live') return 'live';

  const get = await attempt('GET');
  // Transient failure (timeout, reset, TLS) — not evidence the page is gone.
  return get === 'error' ? 'blocked' : get;
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
