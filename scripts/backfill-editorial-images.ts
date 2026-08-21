/**
 * Generate a Seedream hero image for each auto-authored editorial topic and
 * patch every wiki sharing that topicKey (en + zh) with imageUrl + an inline
 * header image. Targets ONLY the docs in AUTO_EN_DOCS.
 *
 * Why not backfill-wiki-images.ts: that one mirrors images from Wikipedia by
 * title, which our editorial titles don't resolve to. This uses Seedream, the
 * same generator + GCS path convention (editorial/<topicKey>.jpg) as
 * scripts/seed-editorial.ts, so re-runs reuse the uploaded image (no re-bill),
 * and en/zh share one hero.
 *
 * Order-independent: it ensures the EN doc has a topicKey (so zh, which copies
 * imageUrl at creation, inherits it either way), then patches every doc with
 * that topicKey that still lacks an image.
 *
 * Needs ARK_API_KEY in .env.local (Seedream); Firestore + GCS via ADC or
 * FIREBASE_*.
 *
 * Usage:
 *   npx tsx scripts/backfill-editorial-images.ts                 # dry-run
 *   npx tsx scripts/backfill-editorial-images.ts --apply         # generate + patch
 *   npx tsx scripts/backfill-editorial-images.ts --only=vpn-when-needed
 */

import {
  initializeApp, cert, applicationDefault, type ServiceAccount,
} from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { Storage } from '@google-cloud/storage';
import { config } from 'dotenv';
import { EDITORIAL_STYLE as STYLE } from '../content/editorial-style';

config({ path: '.env.local', override: true });

const AUTO_EN_DOCS: { id: string; topicKey: string }[] = [
  { id: 'tGYAW2TouOBT3oe9fAbD', topicKey: 'usb-c-vs-thunderbolt' },
  { id: 'mTO9Nnph8pRW0vBkwVqS', topicKey: 'wifi-6-worth-it' },
  { id: 'R7BS2vrbgeOAFOYniKS7', topicKey: 'index-funds-vs-etfs' },
  { id: 'LdeUxkNxW911hiZQ7hK4', topicKey: 'vpn-when-needed' },
  { id: 'UlohkuEDuqybIFnzEyd3', topicKey: 'passkeys-explained' },
  { id: 'yjrPABsIjXkTk0Gy8LWK', topicKey: 'protein-how-much' },
  { id: 'WA7op4jxNiU2Y7egmYF3', topicKey: 'emergency-fund-size' },
  { id: 'JPdRrnJs5qeJwE2dvPns', topicKey: 'salary-negotiation' },
  { id: 'BmxGm0dJg0JwmtuyHfo0', topicKey: 'heat-pump-worth-it' },
  { id: '3g2TLIiD4YdAQhxkjTCg', topicKey: 'standing-desk-worth-it' },
  { id: 'y0xPGxPcyBXdoc6Wj8cx', topicKey: 'spaced-repetition' },
  { id: 'OdW4ESWtD9gSf8kYC8ap', topicKey: 'git-rebase-vs-merge' },
  { id: 'L5cNNTQCAvPXdZbABQ7v', topicKey: 'microwave-nutrients' },
  { id: 'lTMJWrp8klh7fAWjho6S', topicKey: 'cast-iron-seasoning' },
];

const ARK_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
const ARK_MODEL = 'doubao-seedream-5-0-260128';
const IMG_W = 2560;
const IMG_H = 1440;
const GCS_BUCKET = process.env.GCS_WIKI_IMAGES_BUCKET || 'gptwiki-images';

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const onlyArg = args.find((a) => a.startsWith('--only='));
const ONLY = new Set((onlyArg?.slice('--only='.length) ?? '').split(',').filter(Boolean));

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

function initStorage(): Storage {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (clientEmail && privateKey) {
    return new Storage({ projectId: process.env.FIREBASE_PROJECT_ID, credentials: { client_email: clientEmail, private_key: privateKey } });
  }
  return new Storage({ projectId: process.env.FIREBASE_PROJECT_ID });
}

async function generateImage(prompt: string): Promise<Buffer> {
  const res = await fetch(ARK_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.ARK_API_KEY}` },
    body: JSON.stringify({
      model: ARK_MODEL, prompt, sequential_image_generation: 'disabled',
      response_format: 'url', size: `${IMG_W}x${IMG_H}`, stream: false, watermark: false,
    }),
  });
  if (!res.ok) throw new Error(`Seedream ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { data?: Array<{ url?: string }> };
  const url = data.data?.[0]?.url;
  if (!url) throw new Error('Seedream returned no URL');
  const img = await fetch(url);
  if (!img.ok) throw new Error(`download ${img.status}`);
  return Buffer.from(await img.arrayBuffer());
}

function injectHero(content: string, alt: string, url: string): string {
  const lines = content.split('\n');
  lines.splice(1, 0, '', `![${alt}](${url})`);
  return lines.join('\n');
}

async function main(): Promise<void> {
  let docs = AUTO_EN_DOCS;
  if (ONLY.size) docs = docs.filter((d) => ONLY.has(d.topicKey));
  console.log(`▸ hero images for ${docs.length} topics${APPLY ? '' : ' (DRY RUN)'}`);
  if (APPLY && !process.env.ARK_API_KEY) {
    console.error('ARK_API_KEY missing — add it to .env.local');
    process.exit(1);
  }

  const db: Firestore = getFirestore(initFirebase());
  const bucket = initStorage().bucket(GCS_BUCKET);
  const stats = { images: 0, patched: 0, skipped: 0, failed: 0 };

  for (const { id, topicKey } of docs) {
    const enRef = db.collection('wikis').doc(id);
    const enSnap = await enRef.get();
    if (!enSnap.exists) { console.log(`  ✗ ${topicKey}: EN doc missing`); stats.failed++; continue; }
    const en = enSnap.data() as { title: string; summary: string; topicKey?: string };

    if (APPLY && !en.topicKey) await enRef.update({ topicKey }).catch(() => {});

    // 1) Ensure the hero exists in GCS (idempotent per topicKey).
    const objectPath = `editorial/${topicKey}.jpg`;
    const file = bucket.file(objectPath);
    const publicUrl = `https://storage.googleapis.com/${GCS_BUCKET}/${objectPath}`;
    let haveImage = false;
    try {
      const [exists] = await file.exists();
      if (exists) { haveImage = true; console.log(`  ✓ image cached  ${topicKey}`); }
      else if (!APPLY) { console.log(`  ○ would generate ${topicKey}`); }
      else {
        const prompt = `A clean, conceptual editorial illustration for an encyclopedia article titled "${en.title}". ${STYLE}`;
        console.log(`  … generating    ${topicKey}`);
        const buf = await generateImage(prompt);
        await file.save(buf, { resumable: false, metadata: { contentType: 'image/jpeg', cacheControl: 'public, max-age=31536000, immutable' } });
        haveImage = true;
        stats.images++;
        console.log(`  ✓ image uploaded ${topicKey}`);
      }
    } catch (err) {
      console.log(`  ✗ ${topicKey}: image failed — ${(err as Error).message}`);
      stats.failed++;
      continue;
    }

    // 2) Patch every doc with this topicKey (en + zh) that lacks an image.
    const sharing = await db.collection('wikis').where('topicKey', '==', topicKey).get();
    const targets = sharing.empty ? [enSnap] : sharing.docs;
    for (const d of targets) {
      const data = d.data() as { imageUrl?: string; content: string; title: string };
      if (data.imageUrl) { stats.skipped++; continue; }
      if (!APPLY) { console.log(`    ○ would patch ${d.id} (${(data as { language?: string }).language ?? 'en'})`); stats.patched++; continue; }
      if (!haveImage) continue;
      await d.ref.update({
        imageUrl: publicUrl,
        imageWidth: IMG_W,
        imageHeight: IMG_H,
        // Only docs without an image reach here, so the flag always flips
        // (see src/lib/header-image.ts).
        hasHeaderImage: true,
        content: injectHero(data.content, data.title, publicUrl),
        updatedAt: Date.now(),
      });
      stats.patched++;
      console.log(`    ✓ patched ${d.id}`);
    }
  }

  console.log(`\n✓ Done. images=${stats.images} patched=${stats.patched} skipped=${stats.skipped} failed=${stats.failed}`);
  process.exit(0);
}

main().catch((err) => { console.error('FATAL:', err); process.exit(1); });
