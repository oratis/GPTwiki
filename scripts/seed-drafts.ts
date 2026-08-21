/**
 * Seed the hand-written draft articles in /content into Firestore.
 *
 * Usage:
 *   npx tsx scripts/seed-drafts.ts            # dry run — prints what WOULD be written
 *   npx tsx scripts/seed-drafts.ts --apply    # actually write to Firestore
 *
 * Requires .env.local with FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL /
 * FIREBASE_PRIVATE_KEY (same as the other seed scripts). De-dups by title:
 * any draft whose title already exists in `wikis` is skipped.
 */
import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import { allDrafts } from '../content';
import { allTranslations } from '../content/i18n';

config({ path: '.env.local' });

// English originals + all completed translations. Titles are language-specific,
// so de-dup by title is safe across languages.
const corpus = [...allDrafts, ...allTranslations];

const APPLY = process.argv.includes('--apply');

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

async function titleExists(title: string): Promise<boolean> {
  const snap = await db.collection('wikis').where('title', '==', title).limit(1).get();
  return !snap.empty;
}

async function main() {
  console.log(
    `${APPLY ? 'APPLY' : 'DRY RUN'} — ${corpus.length} draft articles ` +
      `(${allDrafts.length} en + ${allTranslations.length} translated)\n`
  );
  const now = Date.now();
  let written = 0;
  let skipped = 0;

  for (const draft of corpus) {
    if (await titleExists(draft.title)) {
      console.log(`SKIP  (exists)  ${draft.title}`);
      skipped++;
      continue;
    }

    if (!APPLY) {
      console.log(`WOULD WRITE  [${draft.language}]  ${draft.title}  (${draft.content.length} chars)`);
      written++;
      continue;
    }

    const doc = {
      title: draft.title,
      question: draft.question,
      content: draft.content,
      summary: draft.summary,
      tags: draft.tags,
      authorId: 'system',
      authorName: 'GPTwiki Editorial',
      authorImage: '',
      aiModel: 'claude',
      conversation: [
        { id: 'q1', role: 'user', content: draft.question, timestamp: now },
        { id: 'a1', role: 'assistant', content: draft.content, timestamp: now },
      ],
      views: 0,
      createdAt: now,
      updatedAt: now,
      source: 'editorial-draft',
      language: draft.language,
      // Drafts ship without imagery; scripts/backfill-editorial-images.ts
      // flips this when it attaches a hero (see src/lib/header-image.ts).
      hasHeaderImage: false,
    };

    await db.collection('wikis').add(doc);
    console.log(`WROTE           ${draft.title}`);
    written++;
  }

  console.log(`\n${APPLY ? 'Wrote' : 'Would write'}: ${written}   Skipped (already exist): ${skipped}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
