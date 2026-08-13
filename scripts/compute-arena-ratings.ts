/**
 * Recompute Arena ratings and write the leaderboard snapshots.
 *
 * The Bradley-Terry fit never runs in a request path — this job runs out of
 * band, writes one document per scope, and every page then reads a single
 * document. That is what keeps the leaderboard O(1) to render regardless of how
 * many votes exist.
 *
 * Trigger it manually first, the way `docs/auto-content-cron-plan.md` §7 settled
 * on for the auto-author job: watch a few clean runs before putting it on a
 * schedule. A dry run prints the table and writes nothing.
 *
 * Usage:
 *   npx tsx scripts/compute-arena-ratings.ts              # dry run
 *   npx tsx scripts/compute-arena-ratings.ts --apply      # write snapshots
 *   npx tsx scripts/compute-arena-ratings.ts --apply --overall-only
 */
import { config } from 'dotenv';
import { applicationDefault, cert, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { fitRatings, type ArenaBattleOutcome } from '../src/lib/arena/scoring';
import { flagAnomalousVoters } from '../src/lib/arena/vote-filters';
import type { ArenaOutcome, ArenaRatingSnapshot } from '../src/types/arena';

config({ path: '.env.local', override: true });

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const OVERALL_ONLY = args.includes('--overall-only');

function initFirebase() {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'gptwiki';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (clientEmail && privateKey) {
    const sa: ServiceAccount = { projectId, clientEmail, privateKey };
    return initializeApp({ credential: cert(sa), projectId });
  }
  console.log('▸ no FIREBASE_CLIENT_EMAIL/PRIVATE_KEY — using ADC');
  return initializeApp({ credential: applicationDefault(), projectId });
}

interface VoteRow {
  battleId: string;
  voterId: string;
  outcome: ArenaOutcome;
  weight: number;
  createdAt: number;
}

interface BattleRow {
  modelA: string;
  modelB: string;
  locale?: string;
  category?: string;
}

async function main(): Promise<void> {
  const db: Firestore = getFirestore(initFirebase());
  console.log(`▸ computing arena ratings${APPLY ? '' : ' (DRY RUN)'}`);

  const [voteSnap, battleSnap] = await Promise.all([
    db.collection('arenaVotes').get(),
    db.collection('arenaBattles').select('modelA', 'modelB', 'locale', 'category').get(),
  ]);

  const votes: VoteRow[] = voteSnap.docs.map((d) => ({
    battleId: d.get('battleId') as string,
    voterId: d.get('voterId') as string,
    outcome: d.get('outcome') as ArenaOutcome,
    weight: Number(d.get('weight') ?? 0),
    createdAt: Number(d.get('createdAt') ?? 0),
  }));

  const battles = new Map<string, BattleRow>();
  for (const doc of battleSnap.docs) {
    battles.set(doc.id, {
      modelA: doc.get('modelA') as string,
      modelB: doc.get('modelB') as string,
      locale: doc.get('locale') as string | undefined,
      category: doc.get('category') as string | undefined,
    });
  }

  console.log(`▸ ${votes.length} votes, ${battles.size} battles`);
  if (votes.length === 0) {
    console.log('▸ nothing to fit — leaving snapshots untouched');
    return;
  }

  // The per-voter rate rule needs a whole history, so it lives here rather than
  // at vote time. Votes already zero-weighted keep their zero.
  const anomalous = flagAnomalousVoters(votes);
  if (anomalous.size > 0) {
    console.log(`▸ ${anomalous.size} voter(s) exceeded the hourly ceiling — zeroing their votes`);
  }

  const outcomes: Array<ArenaBattleOutcome & { locale?: string; category?: string }> = [];
  let orphaned = 0;
  for (const vote of votes) {
    const battle = battles.get(vote.battleId);
    if (!battle) {
      orphaned++;
      continue;
    }
    outcomes.push({
      modelA: battle.modelA,
      modelB: battle.modelB,
      outcome: vote.outcome,
      weight: anomalous.has(vote.voterId) ? 0 : vote.weight > 0 ? 1 : 0,
      locale: battle.locale,
      category: battle.category,
    });
  }
  if (orphaned > 0) console.log(`▸ ${orphaned} vote(s) had no matching battle — skipped`);

  const scopes = new Map<string, ArenaBattleOutcome[]>([['overall', outcomes]]);
  if (!OVERALL_ONLY) {
    for (const row of outcomes) {
      if (row.locale) push(scopes, `locale:${row.locale}`, row);
      if (row.category) push(scopes, `category:${row.category}`, row);
    }
  }

  for (const [scope, rows] of scopes) {
    const fit = fitRatings(rows);
    const computedAt = Date.now();
    report({ scope, computedAt, ...fit });
    if (APPLY) {
      // `scope` is the document id, so it is not duplicated in the body — the
      // reader in `src/lib/arena/ratings.ts` puts it back from the id.
      await db.collection('arenaRatings').doc(scope).set({ computedAt, ...fit });
    }
  }

  console.log(APPLY ? '▸ snapshots written' : '▸ dry run — re-run with --apply to write');
}

function push(
  scopes: Map<string, ArenaBattleOutcome[]>,
  key: string,
  row: ArenaBattleOutcome
): void {
  const list = scopes.get(key);
  if (list) list.push(row);
  else scopes.set(key, [row]);
}

function report(snapshot: ArenaRatingSnapshot): void {
  const ranked = snapshot.models.filter((m) => !m.provisional).length;
  console.log(
    `\n  ${snapshot.scope} — ${snapshot.effectiveBattles} counted, ` +
      `${snapshot.excludedBattles} excluded, ${ranked}/${snapshot.models.length} publishable`
  );
  for (const m of snapshot.models) {
    const score = m.score === null
      ? 'provisional'
      : `${Math.round(m.score)} ±${Math.round((m.ciHigh! - m.ciLow!) / 2)}` +
        `  rank ${m.rankLow === m.rankHigh ? m.rankLow : `${m.rankLow}-${m.rankHigh}`}`;
    console.log(
      `    ${m.model.padEnd(8)} ${score.padEnd(24)} ` +
        `${m.wins}/${m.losses}/${m.ties}  votes=${m.votes}`
    );
  }
  if (snapshot.positionBias !== 0) {
    console.log(`    slot bias: ${snapshot.positionBias.toFixed(3)} log-odds`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
