/**
 * Sweep already-published editorial docs for dead citations and drop them.
 *
 * `scripts/lib/source-health.ts` stops NEW drafts shipping dead links, but the
 * corpus already on production predates it. The live sunscreen-spf-guide
 * article cites an FDA page that 404s (its other four sources resolve), and the
 * web keeps rotting under everything else — three of the DOE Energy Saver URLs
 * that auto-authored articles like to cite were retired wholesale.
 *
 * Scope is deliberately narrow: `source: 'editorial'` only. The ~19M-doc
 * Wikipedia mirror is not ours to rewrite, and a full-corpus URL sweep would be
 * an enormous amount of outbound traffic for no benefit.
 *
 * Only URLs a server positively disclaims (404/410) are removed — paywalls and
 * bot-blocks are kept. See source-health.ts for why that distinction carries
 * the whole design.
 *
 * Every URL is checked ONCE per run and cached, because the same handful of
 * citations recur across many docs and across locales.
 *
 * Usage:
 *   npx tsx scripts/backfill-source-health.ts                  # dry run (default)
 *   npx tsx scripts/backfill-source-health.ts --apply
 *   npx tsx scripts/backfill-source-health.ts --apply --limit=50
 *   npx tsx scripts/backfill-source-health.ts --only=<docId>
 */
import { config } from 'dotenv';
import { initializeApp, cert, applicationDefault, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { checkUrl, type SourceHealth } from './lib/source-health';

config({ path: '.env.local', override: true });

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
function flag(name: string): string | undefined {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a ? a.slice(name.length + 3) : undefined;
}
const LIMIT = Number(flag('limit') ?? 0) || 0;
const ONLY = flag('only');

interface Source {
  title: string;
  url: string;
}

// Same init as the other scripts: explicit SA when the env has one, otherwise
// Application Default Credentials (gcloud locally, WIF in CI). src/lib/firebase
// is not reused here — it is cert-only and throws without a private key.
function initFirebase() {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'gptwiki';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (clientEmail && privateKey) {
    const sa: ServiceAccount = { projectId, clientEmail, privateKey };
    return initializeApp({ credential: cert(sa), projectId });
  }
  console.log('▸ no FIREBASE_CLIENT_EMAIL/PRIVATE_KEY in env — using ADC');
  return initializeApp({ credential: applicationDefault(), projectId });
}

const db = getFirestore(initFirebase());

const cache = new Map<string, SourceHealth>();
async function health(url: string): Promise<SourceHealth> {
  const hit = cache.get(url);
  if (hit) return hit;
  const h = await checkUrl(url);
  cache.set(url, h);
  return h;
}

async function main(): Promise<void> {
  console.log(`▸ scanning editorial docs${APPLY ? '' : ' (DRY RUN)'}`);

  let query = db.collection('wikis').where('source', '==', 'editorial');
  if (LIMIT) query = query.limit(LIMIT);

  const snap = ONLY
    ? { docs: [await db.collection('wikis').doc(ONLY).get()].filter((d) => d.exists) }
    : await query.get();

  let scanned = 0;
  let touched = 0;
  let removed = 0;
  const deadUrls = new Map<string, number>();

  for (const doc of snap.docs) {
    const data = doc.data() as { sources?: Source[]; title?: string } | undefined;
    const sources = data?.sources;
    if (!sources?.length) continue;
    scanned++;

    const keep: Source[] = [];
    const drop: Source[] = [];
    for (const s of sources) {
      if (!s?.url) continue;
      ((await health(s.url)) === 'dead' ? drop : keep).push(s);
    }
    if (!drop.length) continue;

    touched++;
    removed += drop.length;
    for (const d of drop) deadUrls.set(d.url, (deadUrls.get(d.url) ?? 0) + 1);

    console.log(`\n  ${doc.id}  "${(data?.title ?? '').slice(0, 60)}"`);
    console.log(`    ${sources.length} → ${keep.length} source(s)`);
    for (const d of drop) console.log(`    ✗ ${d.url}`);

    if (APPLY) {
      // Remove the field entirely when nothing survives, rather than writing an
      // empty array, so the doc looks exactly like one seeded without sources
      // and the article's References section stays hidden instead of rendering
      // an empty heading.
      await doc.ref.update({ sources: keep.length ? keep : FieldValue.delete() });
    }
  }

  console.log(
    `\n▸ ${scanned} doc(s) with citations scanned, ${touched} had dead links, ${removed} link(s) ${APPLY ? 'removed' : 'would be removed'}`
  );
  if (deadUrls.size) {
    console.log('\nDead URLs by frequency:');
    for (const [url, n] of [...deadUrls].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${String(n).padStart(3)}×  ${url}`);
    }
  }
  if (!APPLY && touched) console.log('\nRe-run with --apply to write.');
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
