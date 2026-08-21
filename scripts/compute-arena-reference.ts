/**
 * Fetch a third-party leaderboard and store it, attributed.
 *
 * Why this job exists: GPTwiki's own board has no votes and will not have any
 * until real battles happen (`docs/gptwiki-arena-plan.md` §9), so
 * /arena/leaderboard has been an empty page since launch. This puts a real,
 * credited board on the site in the meantime — LMArena's own CC-BY-4.0 dataset,
 * reproduced as *theirs*. It is never merged into our Bradley-Terry board; the
 * full reasoning, and the sources that were rejected, are in
 * `docs/arena-reference-boards.md`.
 *
 * Keyless: Hugging Face's datasets-server serves JSON rows without auth, so
 * there is no token to store and no new dependency to install.
 *
 * No LLM anywhere in this file, matching the discipline the rest of the arena
 * scoring holds to: fetch, validate, map, store.
 *
 * Usage:
 *   npx tsx scripts/compute-arena-reference.ts            # dry run
 *   npx tsx scripts/compute-arena-reference.ts --apply    # write the board
 */
import { config } from 'dotenv';
import { applicationDefault, cert, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import {
  LMARENA_CATEGORY,
  MAX_ROWS,
  PAGE_SIZE,
  buildReferenceBoard,
  rowsUrl,
  type RawArenaRow,
} from '../src/lib/arena/reference';

config({ path: '.env.local', override: true });

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');

/**
 * How many pages to pull.
 *
 * The rows arrive grouped by category with `overall` first, so the models we
 * want are at the head of the split and one page covers the published table.
 * A second page is fetched anyway so `unrankedServedModels` is judged against
 * more of the category than we display — a served model ranked 120th is ranked,
 * and reporting it as unranked would be wrong.
 */
const PAGES = 4;

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

interface RowsResponse {
  rows?: Array<{ row?: RawArenaRow }>;
}

async function fetchPage(offset: number): Promise<RawArenaRow[]> {
  const res = await fetch(rowsUrl(offset, PAGE_SIZE), {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    throw new Error(`datasets-server returned ${res.status} ${res.statusText} at offset ${offset}`);
  }
  const body = (await res.json()) as RowsResponse;
  if (!Array.isArray(body.rows)) {
    throw new Error(`unexpected payload at offset ${offset} — no rows array`);
  }
  return body.rows.map((r) => r.row ?? {});
}

async function main(): Promise<void> {
  console.log(`▸ fetching the reference board${APPLY ? '' : ' (DRY RUN)'}`);

  const raw: RawArenaRow[] = [];
  for (let page = 0; page < PAGES; page++) {
    const rows = await fetchPage(page * PAGE_SIZE);
    raw.push(...rows);
    if (rows.length < PAGE_SIZE) break;
    // Stop as soon as the category we reproduce is exhausted — the split
    // continues into other categories we deliberately do not mirror.
    if (!rows.some((r) => r.category === LMARENA_CATEGORY)) break;
  }
  console.log(`▸ ${raw.length} raw row(s) fetched`);

  const board = buildReferenceBoard(raw, { now: Date.now(), maxRows: MAX_ROWS });
  if (!board) {
    // Refusing to write is the point: an empty board would replace a good
    // stored one with nothing the next time the upstream schema shifts.
    console.error('▸ no usable rows — leaving the stored board untouched');
    process.exit(1);
  }

  const dropped = raw.filter((r) => r.category === LMARENA_CATEGORY).length - board.rows.length;
  console.log(
    `\n  ${board.sourceName} · ${board.board} — published ${board.publishedAt}, ` +
      `${board.rows.length} row(s) kept` +
      (dropped > MAX_ROWS ? '' : dropped > 0 ? `, ${dropped} beyond the cap or unusable` : '')
  );
  console.log(`  ${board.license} — ${board.licenseUrl}\n`);

  for (const row of board.rows.slice(0, 12)) {
    const ci = Math.round((row.ratingHigh - row.ratingLow) / 2);
    console.log(
      `    ${String(row.rank).padStart(3)}  ${row.modelName.slice(0, 34).padEnd(34)} ` +
        `${row.organization.slice(0, 12).padEnd(12)} ${Math.round(row.rating)} ±${ci}` +
        `  votes=${row.votes.toLocaleString('en')}${row.served ? '   ← served here' : ''}`
    );
  }
  if (board.rows.length > 12) console.log(`    … ${board.rows.length - 12} more`);

  if (board.unrankedServedModels.length > 0) {
    console.log(
      `\n  not ranked by this board: ${board.unrankedServedModels.join(', ')}` +
        '\n  (surfaced on the page — an unexplained gap reads as our oversight)'
    );
  }

  if (!APPLY) {
    console.log('\n▸ dry run — re-run with --apply to write');
    return;
  }

  const db: Firestore = getFirestore(initFirebase());
  await db.collection('arenaRatings').doc('reference').set(board);
  console.log('\n▸ board written to arenaRatings/reference');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
