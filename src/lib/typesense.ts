/**
 * Minimal Typesense client over plain fetch — no SDK dependency.
 *
 * Self-hosted Typesense is the intended primary search backend (product
 * decision #5, 2026-06-11); the per-doc Firestore `keywords` index remains the
 * automatic fallback when TYPESENSE_* env is unset or the server errors. See
 * docs/typesense.md for provisioning and bootstrap.
 *
 * "Intended" because a deployment with no TYPESENSE_* configured runs entirely
 * on the fallback — which is the supported, documented posture, not a failure,
 * but is easy to misread as "we are running Typesense" when reading this file
 * alone. `searchWikis` logs one `search_backend` line per process so the answer
 * for a given environment comes from its logs rather than from this comment.
 */

const COLLECTION = 'wikis';

/** Fields mirrored into the search index. */
export interface TypesenseWikiDoc {
  id: string;
  title: string;
  question?: string;
  summary?: string;
  /** First ~2000 chars — enough for recall without bloating the index. */
  content?: string;
  tags?: string[];
  language?: string;
  views: number;
  createdAt: number;
}

function config() {
  const host = process.env.TYPESENSE_HOST;
  const apiKey = process.env.TYPESENSE_API_KEY;
  if (!host || !apiKey) return null;
  const protocol = process.env.TYPESENSE_PROTOCOL || 'http';
  const port = process.env.TYPESENSE_PORT || '8108';
  return { baseUrl: `${protocol}://${host}:${port}`, apiKey };
}

export function isTypesenseEnabled(): boolean {
  return config() !== null;
}

async function ts(
  path: string,
  init: RequestInit & { timeoutMs?: number } = {}
): Promise<Response> {
  const cfg = config();
  if (!cfg) throw new Error('Typesense not configured');
  const { timeoutMs = 5000, ...rest } = init;
  return fetch(`${cfg.baseUrl}${path}`, {
    ...rest,
    headers: { 'X-TYPESENSE-API-KEY': cfg.apiKey, ...(rest.headers ?? {}) },
    signal: AbortSignal.timeout(timeoutMs),
  });
}

const COLLECTION_SCHEMA = {
  name: COLLECTION,
  fields: [
    { name: 'title', type: 'string' },
    { name: 'question', type: 'string', optional: true },
    { name: 'summary', type: 'string', optional: true },
    { name: 'content', type: 'string', optional: true },
    { name: 'tags', type: 'string[]', optional: true, facet: true },
    { name: 'language', type: 'string', optional: true, facet: true },
    { name: 'views', type: 'int32' },
    { name: 'createdAt', type: 'int64' },
  ],
  default_sorting_field: 'views',
};

/** Create the wikis collection if it doesn't exist yet (409 = already there). */
export async function ensureWikisCollection(): Promise<void> {
  const res = await ts('/collections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(COLLECTION_SCHEMA),
  });
  if (!res.ok && res.status !== 409) {
    throw new Error(`Typesense collection create failed: ${res.status} ${await res.text()}`);
  }
}

/** Map a wiki (Firestore shape) to its index document. */
export function toTypesenseDoc(
  id: string,
  data: Record<string, unknown>
): TypesenseWikiDoc {
  const str = (v: unknown) => (typeof v === 'string' ? v : undefined);
  return {
    id,
    title: str(data.title) ?? '',
    question: str(data.question),
    summary: str(data.summary),
    content: str(data.content)?.slice(0, 2000),
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === 'string')
      : undefined,
    language: str(data.language),
    views: typeof data.views === 'number' ? data.views : 0,
    createdAt: typeof data.createdAt === 'number' ? data.createdAt : 0,
  };
}

/**
 * Upsert one wiki into the index. Callers treat indexing as best-effort:
 * wrap in try/catch and never block the user-facing write on it.
 */
export async function upsertWikiToTypesense(doc: TypesenseWikiDoc): Promise<void> {
  const res = await ts(`/collections/${COLLECTION}/documents?action=upsert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doc),
  });
  if (!res.ok) {
    throw new Error(`Typesense upsert failed: ${res.status} ${await res.text()}`);
  }
}

/** Bulk upsert via the JSONL import endpoint. Returns per-line failure count. */
export async function importWikisToTypesense(docs: TypesenseWikiDoc[]): Promise<number> {
  if (docs.length === 0) return 0;
  const body = docs.map((d) => JSON.stringify(d)).join('\n');
  const res = await ts(`/collections/${COLLECTION}/documents/import?action=upsert`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body,
    timeoutMs: 60_000,
  });
  if (!res.ok) {
    throw new Error(`Typesense import failed: ${res.status} ${await res.text()}`);
  }
  const lines = (await res.text()).trim().split('\n');
  return lines.filter((l) => !l.includes('"success":true')).length;
}

/**
 * Search the index, returning ranked wiki ids. Title matches outrank tags,
 * then question/summary/content; ties break on views (default sorting field).
 */
export async function searchWikiIdsTypesense(
  query: string,
  limit: number
): Promise<string[]> {
  const params = new URLSearchParams({
    q: query,
    query_by: 'title,tags,question,summary,content',
    query_by_weights: '8,4,2,2,1',
    per_page: String(limit),
    include_fields: 'id',
    num_typos: '2,1,1,1,0',
  });
  const res = await ts(`/collections/${COLLECTION}/documents/search?${params}`, {
    timeoutMs: 4000,
  });
  if (!res.ok) {
    throw new Error(`Typesense search failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { hits?: Array<{ document?: { id?: string } }> };
  return (data.hits ?? [])
    .map((h) => h.document?.id)
    .filter((id): id is string => typeof id === 'string');
}
