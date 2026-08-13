import { db } from '@/lib/firebase';
import type { ArenaRatingSnapshot } from '@/types/arena';

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
