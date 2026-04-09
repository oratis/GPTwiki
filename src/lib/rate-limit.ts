import { NextResponse } from 'next/server';

/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Per-Cloud Run instance only — not shared across instances. For a small app
 * this is a useful first line of defense; upgrade to Redis when traffic grows.
 */

interface Entry {
  // timestamps of recent hits within the window, oldest first
  hits: number[];
}

const buckets = new Map<string, Entry>();

// Prune idle buckets once in a while to avoid unbounded memory growth.
let lastPrune = Date.now();
const PRUNE_INTERVAL_MS = 60_000;

function prune(now: number) {
  if (now - lastPrune < PRUNE_INTERVAL_MS) return;
  lastPrune = now;
  for (const [k, v] of buckets.entries()) {
    if (v.hits.length === 0 || now - v.hits[v.hits.length - 1] > 10 * 60_000) {
      buckets.delete(k);
    }
  }
}

export interface RateLimitOptions {
  /** Unique identifier, e.g. `chat:${userId}` or `wiki:${ip}` */
  key: string;
  /** Max requests allowed within the window */
  max: number;
  /** Window size in seconds */
  windowSec: number;
}

export interface RateLimitResult {
  ok: boolean;
  limit: number;
  remaining: number;
  /** Unix ms when the window resets (earliest hit + window) */
  resetAt: number;
  retryAfterSec: number;
}

export function checkRateLimit(opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  prune(now);
  const windowMs = opts.windowSec * 1000;

  let entry = buckets.get(opts.key);
  if (!entry) {
    entry = { hits: [] };
    buckets.set(opts.key, entry);
  }

  // Drop hits outside the window
  const cutoff = now - windowMs;
  while (entry.hits.length && entry.hits[0] < cutoff) entry.hits.shift();

  if (entry.hits.length >= opts.max) {
    const oldest = entry.hits[0];
    const resetAt = oldest + windowMs;
    return {
      ok: false,
      limit: opts.max,
      remaining: 0,
      resetAt,
      retryAfterSec: Math.max(1, Math.ceil((resetAt - now) / 1000)),
    };
  }

  entry.hits.push(now);
  return {
    ok: true,
    limit: opts.max,
    remaining: opts.max - entry.hits.length,
    resetAt: now + windowMs,
    retryAfterSec: 0,
  };
}

/** Extract a client identifier from a Next request — userId if available, else IP. */
export function getClientId(req: Request, userId?: string | null): string {
  if (userId) return `u:${userId}`;
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return `ip:${xff.split(',')[0]?.trim() || 'unknown'}`;
  const real = req.headers.get('x-real-ip');
  if (real) return `ip:${real}`;
  return 'ip:unknown';
}

/** Build a 429 response matching the result from checkRateLimit. */
export function rateLimited(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    { error: 'Too many requests', retryAfterSec: result.retryAfterSec },
    {
      status: 429,
      headers: {
        'Retry-After': String(result.retryAfterSec),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.floor(result.resetAt / 1000)),
      },
    }
  );
}
