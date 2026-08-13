import { db } from '@/lib/firebase';
import type { ArenaBattle, ArenaOutcome, ArenaVote, ArenaVoteFlag } from '@/types/arena';
import { DEDUP_WINDOW_MS } from './vote-filters';

/** Firestore access for battles and votes. Queries only — no maths lives here. */

const BATTLES = 'arenaBattles';
const VOTES = 'arenaVotes';

/**
 * Reserve an id without writing anything.
 *
 * The battle document is written once, complete, after both answers finish, so
 * there is never a half-written battle that a vote could attach to. Firestore
 * hands out ids client-side, which is what makes that possible.
 */
export function reserveBattleId(): string {
  return db.collection(BATTLES).doc().id;
}

/**
 * Reserve a wiki id without writing. Lets the publish flow record which article
 * a battle produced *before* the article exists, so the claim is what decides
 * the race rather than the write.
 */
export function reserveWikiId(): string {
  return db.collection('wikis').doc().id;
}

export interface BattleWriteInput {
  id: string;
  prompt: string;
  promptHash: string;
  locale: string;
  category: string;
  modelA: string;
  modelB: string;
  answerA: string;
  answerB: string;
  creatorId: string;
  /** Server clock, so the reading-time check cannot be forged by a client. */
  answersReadyAt: number;
}

export async function writeBattle(input: BattleWriteInput): Promise<void> {
  const { id, ...rest } = input;
  await db.collection(BATTLES).doc(id).set({ ...rest, createdAt: Date.now() });
}

export async function getBattle(id: string): Promise<(ArenaBattle & { creatorId?: string; category?: string; answersReadyAt?: number }) | null> {
  const snap = await db.collection(BATTLES).doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as ArenaBattle & { creatorId?: string };
}

/**
 * Prompt hashes this voter has already voted on inside the dedup window.
 *
 * `promptHash` is denormalised onto the vote so this is one query rather than a
 * vote query followed by a fan-out of battle reads.
 */
export async function getRecentPromptHashes(voterId: string, now: number): Promise<string[]> {
  const snap = await db
    .collection(VOTES)
    .where('voterId', '==', voterId)
    .where('createdAt', '>', now - DEDUP_WINDOW_MS)
    .select('promptHash')
    .get();
  return snap.docs.map((d) => d.get('promptHash') as string).filter(Boolean);
}

export interface VoteWriteInput {
  battleId: string;
  promptHash: string;
  outcome: ArenaOutcome;
  voterId: string;
  weight: 0 | 1;
  flags: ArenaVoteFlag[];
}

/**
 * Record a vote, at most one per battle per voter.
 *
 * The id is derived from the pair so `create()` rejects a second attempt
 * atomically — cheaper and racier-proof compared with read-then-write.
 * Returns false when the voter had already voted on this battle.
 */
export async function writeVote(input: VoteWriteInput): Promise<boolean> {
  const id = `${input.battleId}_${input.voterId}`;
  try {
    await db.collection(VOTES).doc(id).create({ ...input, createdAt: Date.now() });
    return true;
  } catch (err) {
    // ALREADY_EXISTS (code 6) is the duplicate-vote case, not a failure.
    if ((err as { code?: number }).code === 6) return false;
    throw err;
  }
}

/**
 * Claim the right to publish a battle, or report who already did.
 *
 * The claim lives on the vote document because that is exactly the thing that
 * is one-per-battle-per-voter, and it is written in a transaction so two
 * concurrent publishes (a double-click, or a retry racing its own response)
 * cannot both decide they are first. Returns the existing wiki id when the
 * battle was already published, so the caller can hand back the original
 * article rather than minting a duplicate.
 */
export async function claimPublish(
  battleId: string,
  voterId: string,
  wikiId: string
): Promise<{ claimed: true } | { claimed: false; existingWikiId: string }> {
  const ref = db.collection(VOTES).doc(`${battleId}_${voterId}`);
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const existing = snap.get('publishedWikiId') as string | undefined;
    if (existing) return { claimed: false as const, existingWikiId: existing };
    tx.set(ref, { publishedWikiId: wikiId, publishedAt: Date.now() }, { merge: true });
    return { claimed: true as const };
  });
}

export async function hasVote(battleId: string, voterId: string): Promise<boolean> {
  const snap = await db.collection(VOTES).doc(`${battleId}_${voterId}`).get();
  return snap.exists;
}

/** Every vote on a battle, used to decide whether identities may be revealed. */
export async function countVotes(battleId: string): Promise<number> {
  const snap = await db.collection(VOTES).where('battleId', '==', battleId).count().get();
  return snap.data().count;
}

/**
 * Load every battle and vote for a rating recompute.
 *
 * Intentionally a full scan: the batch job runs out of band and needs the whole
 * history to fit Bradley-Terry, and at this scale the corpus is small. If this
 * ever stops being true, snapshot incrementally rather than sampling — a fit on
 * a subset of votes is a different (and unpublishable) statistic.
 */
export async function loadAllVotes(): Promise<ArenaVote[]> {
  const snap = await db.collection(VOTES).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ArenaVote);
}

export async function loadBattleModels(): Promise<
  Map<string, { modelA: string; modelB: string; locale?: string; category?: string }>
> {
  const snap = await db.collection(BATTLES).select('modelA', 'modelB', 'locale', 'category').get();
  const out = new Map<string, { modelA: string; modelB: string; locale?: string; category?: string }>();
  for (const doc of snap.docs) {
    out.set(doc.id, {
      modelA: doc.get('modelA') as string,
      modelB: doc.get('modelB') as string,
      locale: doc.get('locale') as string | undefined,
      category: doc.get('category') as string | undefined,
    });
  }
  return out;
}
