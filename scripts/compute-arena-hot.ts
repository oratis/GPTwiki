/**
 * Build the article hot list and write it as a snapshot.
 *
 * Deliberately mirrors AI HOT's division of labour (`docs/arena-research.md`
 * §3.4): this job gathers candidates and calls the pure composite in
 * `src/lib/arena/hot-scoring.ts`. It does **not** ask a model to rank anything.
 * The optional LLM sub-scores that the composite accepts are not produced here
 * either — wiring those in is a later, budgeted step, and the list is useful
 * without them.
 *
 * Bounded by construction: it scans a recency window rather than the whole
 * corpus, because the corpus is ~100k+ documents and a hot list has no business
 * reading all of them.
 *
 * Usage:
 *   npx tsx scripts/compute-arena-hot.ts                     # dry run
 *   npx tsx scripts/compute-arena-hot.ts --apply             # write snapshot
 *   npx tsx scripts/compute-arena-hot.ts --apply --days=30 --limit=50
 *   npx tsx scripts/compute-arena-hot.ts --all               # include unfeatured
 */
import { config } from 'dotenv';
import { applicationDefault, cert, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { buildHotList, type HotCandidate } from '../src/lib/arena/hot-scoring';

config({ path: '.env.local', override: true });

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const FEATURED_ONLY = !args.includes('--all');
const numArg = (name: string, fallback: number) => {
  const raw = args.find((a) => a.startsWith(`--${name}=`));
  if (!raw) return fallback;
  const value = Number(raw.slice(name.length + 3));
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback;
};
/**
 * Default window. 90 rather than 60 because at 60 this job returned an empty
 * list against the live corpus: the site's most-read original articles were last
 * touched 60-90 days ago, so the window excluded exactly the content the list
 * exists to surface. Note that `MAX_SCAN`, not this number, is usually the
 * binding constraint — once the window covers more than MAX_SCAN documents,
 * widening it further changes nothing, which is why 90, 120 and 365 all produce
 * the same list today.
 */
const DAYS = numArg('days', 90);
const LIMIT = numArg('limit', 30);
/** Hard ceiling on documents read, so a wide window can't turn into a full scan. */
const MAX_SCAN = numArg('max-scan', 5000);

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

async function main(): Promise<void> {
  const db: Firestore = getFirestore(initFirebase());
  const now = Date.now();
  const since = now - DAYS * 86_400_000;

  console.log(
    `▸ hot list: last ${DAYS}d, top ${LIMIT}` +
      `${FEATURED_ONLY ? '' : ' (including unfeatured)'}${APPLY ? '' : ' (DRY RUN)'}`
  );

  const snap = await db
    .collection('wikis')
    .where('updatedAt', '>=', since)
    .orderBy('updatedAt', 'desc')
    .limit(MAX_SCAN)
    .select('title', 'language', 'source', 'views', 'threadCount', 'updatedAt')
    .get();

  if (snap.size === MAX_SCAN) {
    // Say so rather than letting a silent cap read as full coverage.
    console.log(`▸ hit the ${MAX_SCAN}-document scan ceiling — older items in the window were not considered`);
  }

  const candidates: HotCandidate[] = snap.docs.map((doc) => ({
    id: doc.id,
    title: (doc.get('title') as string) ?? '(untitled)',
    language: doc.get('language') as string | undefined,
    source: doc.get('source') as string | undefined,
    views: Number(doc.get('views') ?? 0),
    threadCount: Number(doc.get('threadCount') ?? 0),
    updatedAt: Number(doc.get('updatedAt') ?? 0),
  }));

  console.log(`▸ ${candidates.length} candidate(s) in window`);
  if (candidates.length === 0) {
    console.log('▸ nothing to rank — leaving the snapshot untouched');
    return;
  }

  const rows = buildHotList(candidates, { now, limit: LIMIT, featuredOnly: FEATURED_ONLY });
  console.log(`▸ ${rows.length} row(s) after tier thresholds\n`);

  for (const [i, row] of rows.entries()) {
    console.log(
      `  ${String(i + 1).padStart(2)}. ${row.score.toFixed(1).padStart(6)}  ` +
        `${row.tier.padEnd(9)} ${row.title.slice(0, 58)}`
    );
  }

  if (!APPLY) {
    console.log('\n▸ dry run — re-run with --apply to write');
    return;
  }

  await db.collection('arenaRatings').doc('hot').set({
    // Same collection as the model board so pages read one document either way.
    items: rows.map((row) => ({
      id: row.id,
      title: row.title,
      language: row.language ?? null,
      tier: row.tier,
      score: row.score,
      views: row.views,
      threadCount: row.threadCount ?? 0,
      updatedAt: row.updatedAt,
    })),
    windowDays: DAYS,
    candidatesConsidered: candidates.length,
    computedAt: now,
  });
  console.log('\n▸ snapshot written to arenaRatings/hot');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
