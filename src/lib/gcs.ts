import { Storage } from '@google-cloud/storage';
import { createHash } from 'node:crypto';

const GCS_BUCKET = process.env.GCS_WIKI_IMAGES_BUCKET || 'gptwiki-images';

let _storage: Storage | null = null;
function getStorage(): Storage {
  if (_storage) return _storage;
  // Prefer explicit service-account env vars (Cloud Run injects these).
  // Fall back to Application Default Credentials so one-off scripts run
  // from a developer machine work after `gcloud auth application-default
  // login` — without dragging the service-account JSON onto disk.
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (clientEmail && privateKey) {
    _storage = new Storage({
      projectId,
      credentials: { client_email: clientEmail, private_key: privateKey },
    });
  } else {
    _storage = new Storage({ projectId });
  }
  return _storage;
}

export function getBucketName(): string {
  return GCS_BUCKET;
}

export function isGcsUrl(url: string): boolean {
  return url.includes(`storage.googleapis.com/${GCS_BUCKET}/`);
}

function guessExt(contentType: string, url: string): string {
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('gif')) return '.gif';
  if (contentType.includes('svg')) return '.svg';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return '.jpg';
  const m = url.match(/\.(jpe?g|png|webp|gif|svg)(?:[?#]|$)/i);
  return m ? `.${m[1].toLowerCase()}` : '.jpg';
}

export interface MirrorOptions {
  /** Folder under the bucket root, e.g. "wikipedia/thumb". */
  prefix?: string;
  /** UA sent to the upstream image host. Wikipedia rejects empty/odd UAs. */
  userAgent?: string;
  /** Hard request timeout in ms. */
  timeoutMs?: number;
  /** How many times to retry on 429 / transient network errors. */
  maxRetries?: number;
}

/**
 * Download a remote image and re-upload it to the public GCS wiki-images
 * bucket. Returns the new public URL, or null if the upstream image was
 * unreachable / 4xx / 5xx (after retries). Idempotent: the GCS object
 * path is a sha1 of the source URL, so repeated calls reuse the same
 * object instead of re-uploading.
 *
 * Important ordering: we check GCS *first* and short-circuit on cache
 * hits. Otherwise every re-run pays a full upstream fetch — devastating
 * against `upload.wikimedia.org`, which throttles aggressively per
 * source IP and was the dominant failure mode in the backfill.
 *
 * 429 handling: honor `Retry-After`, back off, and retry a small number
 * of times. The fetch's bare `catch` previously swallowed timeouts and
 * 429s as plain "null" results, hiding ~67% of recoverable work.
 */
export async function mirrorImageToGCS(
  url: string,
  opts: MirrorOptions = {},
): Promise<string | null> {
  if (isGcsUrl(url)) return url;

  const prefix = opts.prefix ?? 'mirror';
  const userAgent = opts.userAgent ?? 'GPTwiki-Bot/1.0 (https://gptwiki.net)';
  const timeoutMs = opts.timeoutMs ?? 15_000;
  const maxRetries = opts.maxRetries ?? 3;

  const hash = createHash('sha1').update(url).digest('hex').slice(0, 16);

  // Single cache probe using the extension implied by the URL. A
  // multi-probe loop costs ~100ms per checked extension and adds up
  // fast on a cold cache; one targeted probe keeps the re-run win
  // (no upstream fetch on hit) without slowing first-time fetches.
  const guessedExt = guessExt('', url);
  const bucket = getStorage().bucket(GCS_BUCKET);
  const cachedPath = `${prefix}/${hash}${guessedExt}`;
  try {
    const [exists] = await bucket.file(cachedPath).exists();
    if (exists) {
      return `https://storage.googleapis.com/${GCS_BUCKET}/${cachedPath}`;
    }
  } catch {
    // Treat probe error as miss — fall through to upstream fetch.
  }

  // No cache hit: fetch from upstream, retry on 429 / transient network.
  let lastErr: unknown = null;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const ac = new AbortController();
      const timer = setTimeout(() => ac.abort(), timeoutMs);
      const res = await fetch(url, {
        headers: { 'User-Agent': userAgent, Accept: 'image/*' },
        signal: ac.signal,
      }).finally(() => clearTimeout(timer));

      if (res.status === 429) {
        // Wikimedia returns Retry-After in seconds. Cap so a stuck host
        // doesn't park a worker forever.
        const retryAfter = Number(res.headers.get('retry-after') || '5');
        const delayMs = Math.min(Math.max(retryAfter, 1), 30) * 1000;
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
      if (!res.ok) return null;
      const contentType = res.headers.get('content-type') || 'image/jpeg';
      if (!contentType.startsWith('image/')) return null;

      const ext = guessExt(contentType, url);
      const objectPath = `${prefix}/${hash}${ext}`;
      const file = bucket.file(objectPath);

      const buffer = Buffer.from(await res.arrayBuffer());
      await file.save(buffer, {
        resumable: false,
        metadata: {
          contentType,
          cacheControl: 'public, max-age=31536000, immutable',
        },
      });

      return `https://storage.googleapis.com/${GCS_BUCKET}/${objectPath}`;
    } catch (err) {
      lastErr = err;
      // Retry on transient network errors / aborts; brief linear backoff.
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  void lastErr;
  return null;
}
