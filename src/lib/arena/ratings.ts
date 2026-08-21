import { db } from '@/lib/firebase';
import type { ArenaRatingSnapshot, ArenaReferenceBoard } from '@/types/arena';

/**
 * Read/write side of the Arena leaderboard.
 *
 * The fit itself (`./scoring`) never runs in a request. A batch job writes one
 * snapshot document per scope; pages read exactly that document, so rendering
 * the leaderboard is a single point read no matter how many battles exist.
 */

const COLLECTION = 'arenaRatings';

/** The only scope in use today. Locale and category slices come with Phase 2. */
export const DEFAULT_SCOPE = 'overall';

/**
 * Is this document actually a rating snapshot?
 *
 * The collection holds more than one document shape — the article hot list also
 * lives here — and pages read it through a cast, so an unexpected shape would
 * otherwise reach the renderer and throw on the first field it touches
 * (`models.length`, `positionBias.toFixed`, `new Date(computedAt)`). That throw
 * happens during render, so the `.catch(() => null)` the pages put around the
 * *fetch* cannot catch it, and a page designed to show an honest empty state
 * 500s instead. Checking the shape here keeps that guarantee real.
 */
function isRatingSnapshot(data: unknown): data is Omit<ArenaRatingSnapshot, 'scope'> {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return (
    Array.isArray(d.models) &&
    typeof d.positionBias === 'number' &&
    typeof d.effectiveBattles === 'number' &&
    typeof d.excludedBattles === 'number' &&
    typeof d.minVotes === 'number' &&
    // Must survive `new Date(...).toISOString()`, which throws on NaN.
    Number.isFinite(d.computedAt) &&
    typeof d.method === 'string'
  );
}

/**
 * Load a precomputed snapshot, or `null` when none has been written yet.
 *
 * A missing snapshot is the normal state before the first batch run, not an
 * error — callers render an empty state rather than failing the page. A snapshot
 * of the wrong shape is treated the same way, and logged.
 */
export async function getRatingSnapshot(
  scope: string = DEFAULT_SCOPE
): Promise<ArenaRatingSnapshot | null> {
  const snap = await db.collection(COLLECTION).doc(scope).get();
  if (!snap.exists) return null;

  const data = snap.data();
  if (!isRatingSnapshot(data)) {
    console.warn(`[arena] ${COLLECTION}/${scope} is not a rating snapshot — ignoring`);
    return null;
  }
  return { ...data, scope };
}

/** Overwrite a scope's snapshot. Called by the batch job, never by a request. */
export async function writeRatingSnapshot(snapshot: ArenaRatingSnapshot): Promise<void> {
  const { scope, ...rest } = snapshot;
  await db.collection(COLLECTION).doc(scope).set(rest);
}

/** One row of the article hot list. */
export interface HotSnapshotItem {
  id: string;
  title: string;
  language: string | null;
  tier: 'editorial' | 'user' | 'mirror';
  score: number;
  views: number;
  threadCount: number;
  updatedAt: number;
}

export interface HotSnapshot {
  items: HotSnapshotItem[];
  windowDays: number;
  candidatesConsidered: number;
  computedAt: number;
}

/**
 * Load the article hot list, or `null` when the batch job has not run.
 *
 * Shares the ratings collection so every arena page is a single point read.
 */
export async function getHotSnapshot(): Promise<HotSnapshot | null> {
  const snap = await db.collection(COLLECTION).doc('hot').get();
  if (!snap.exists) return null;
  return snap.data() as HotSnapshot;
}

/**
 * Is this document a usable third-party board?
 *
 * Stricter than the hot-list read above, and for a specific reason: this
 * document is the only one in the collection whose contents came from outside
 * the project, and the attribution fields are what make displaying it lawful.
 * A board that lost its `sourceName` or `licenseUrl` in a bad write must not
 * render at all rather than render uncredited.
 */
function isReferenceBoard(data: unknown): data is ArenaReferenceBoard {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  const required = ['sourceName', 'sourceUrl', 'datasetUrl', 'license', 'licenseUrl', 'board'];
  return (
    Array.isArray(d.rows) &&
    d.rows.length > 0 &&
    Array.isArray(d.unrankedServedModels) &&
    typeof d.publishedAt === 'string' &&
    Number.isFinite(d.fetchedAt) &&
    required.every((k) => typeof d[k] === 'string' && (d[k] as string).length > 0)
  );
}

/**
 * Load the third-party reference board, or `null` when none is stored.
 *
 * Lives in the same collection as the model board so every arena page stays a
 * single point read, but under a fixed `reference` id that `normalizeScope()`
 * cannot produce — a reader cannot reach this document through `?scope=`, so
 * external numbers can never be served through the leaderboard's own table.
 */
export async function getReferenceBoard(): Promise<ArenaReferenceBoard | null> {
  const snap = await db.collection(COLLECTION).doc('reference').get();
  if (!snap.exists) return null;

  const data = snap.data();
  if (!isReferenceBoard(data)) {
    console.warn(`[arena] ${COLLECTION}/reference is not an attributed board — ignoring`);
    return null;
  }
  return data;
}

/** Overwrite the reference board. Called by the batch job, never by a request. */
export async function writeReferenceBoard(board: ArenaReferenceBoard): Promise<void> {
  await db.collection(COLLECTION).doc('reference').set(board);
}
