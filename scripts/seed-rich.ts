/**
 * Rich content seeder: generates structured wiki articles with AI-generated images.
 *
 * Pipeline per topic:
 *   1. Claude generates a structured article (JSON: title, sections, image prompts)
 *   2. Seedream 5 generates an image per section that requests one
 *   3. Images are downloaded and re-uploaded to GCS (bucket is public-read)
 *   4. Final markdown is assembled with image URLs injected
 *   5. Document is written to Firestore `wikis` collection
 *
 * Usage:
 *   npx tsx scripts/seed-rich.ts "Black Hole"
 *   npx tsx scripts/seed-rich.ts "Black Hole" --dry-run      # skip Firestore write
 *   npx tsx scripts/seed-rich.ts "Black Hole" --no-images    # text only
 */

import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Storage } from '@google-cloud/storage';
import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import { randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';

config({ path: '.env.local', override: true });

// ─── Config ──────────────────────────────────────────────────────────────
const ARK_API_KEY = process.env.ARK_API_KEY!;
const ARK_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
const ARK_MODEL = 'doubao-seedream-5-0-260128';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

const GCS_BUCKET = process.env.GCS_WIKI_IMAGES_BUCKET || 'gptwiki-images';

// ─── CLI ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const topic = args.find((a) => !a.startsWith('--')) || 'Black Hole';
const DRY_RUN = args.includes('--dry-run');
const NO_IMAGES = args.includes('--no-images');

// ─── Firebase ────────────────────────────────────────────────────────────
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};
const firebaseApp = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(firebaseApp);

// ─── GCS ─────────────────────────────────────────────────────────────────
const storage = new Storage({
  projectId: process.env.FIREBASE_PROJECT_ID,
  credentials: {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});
const bucket = storage.bucket(GCS_BUCKET);

// ─── Types ───────────────────────────────────────────────────────────────
interface Section {
  heading: string;
  body: string;
  image?: {
    prompt: string;
    alt: string;
    caption?: string;
  };
}

interface GeneratedArticle {
  title: string;
  question: string;
  summary: string;
  tags: string[];
  hero_image?: {
    prompt: string;
    alt: string;
    caption?: string;
  };
  sections: Section[];
}

// ─── Claude content generation ───────────────────────────────────────────
async function generateArticle(topic: string): Promise<GeneratedArticle> {
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  const systemPrompt = `You are an expert encyclopedic writer for GPTwiki, a visual wiki platform. Produce rich, well-researched articles with strong narrative structure and vivid section imagery.

Output MUST be a single JSON object, no prose before or after, no markdown code fences. Schema:

{
  "title": "Canonical title, like Wikipedia",
  "question": "The question this article answers, e.g. 'What is a black hole?'",
  "summary": "One sentence, ≤ 200 chars, for listing pages",
  "tags": ["lowercase", "multi-word", "tags"],   // 3-6 tags, lowercase
  "hero_image": {
    "prompt": "Detailed English image prompt for a hero image. Cinematic, high contrast, evocative. ~60-120 words. Include style keywords: 'photorealistic', 'cinematic lighting', etc.",
    "alt": "Short alt text for accessibility",
    "caption": "Optional italic caption displayed below image"
  },
  "sections": [
    {
      "heading": "Section title (no leading #)",
      "body": "Markdown body — 2-5 paragraphs, may include **bold**, lists, tables, > blockquotes, inline code, or code blocks. Do NOT include images here; images are added from the image field.",
      "image": {                                  // optional, include for ~half the sections
        "prompt": "Detailed image prompt for THIS section, different style from hero",
        "alt": "Short alt text",
        "caption": "Optional caption"
      }
    }
  ]
}

Rules:
- 5-8 sections total. Aim for 1500-3000 words of body content overall.
- Include hero_image ALWAYS.
- Include section images on 2-4 sections, chosen to maximize visual interest.
- Image prompts must be specific and visual: describe subject, composition, lighting, mood, colors. Avoid text in images. Adapt style to topic (cinematic for science/cosmic, clean infographic-style for tech, historical painting style for history, etc.).
- Body markdown should use \`\`\`lang code blocks where useful, tables for comparisons, bullet lists sparingly.
- Never include raw HTML. Only standard markdown + GFM.
- Write in English.`;

  const userPrompt = `Write a rich, image-rich encyclopedic article about: ${topic}`;

  console.log(`[Claude] Generating article for: ${topic}`);
  const res = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 8192,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();

  // Strip possible code fences
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let parsed: GeneratedArticle;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error('[Claude] Failed to parse JSON. Raw response saved to /tmp/claude-raw.txt');
    writeFileSync('/tmp/claude-raw.txt', text);
    throw e;
  }

  console.log(`[Claude] Got article "${parsed.title}" with ${parsed.sections.length} sections`);
  return parsed;
}

// ─── Seedream image generation ───────────────────────────────────────────
async function generateImage(prompt: string): Promise<string> {
  const body = {
    model: ARK_MODEL,
    prompt,
    sequential_image_generation: 'disabled',
    response_format: 'url',
    size: '2K',
    stream: false,
    watermark: false,
  };

  const res = await fetch(ARK_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ARK_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Seedream API error ${res.status}: ${errText}`);
  }

  const data: { data?: Array<{ url: string }> } = await res.json();
  const url = data.data?.[0]?.url;
  if (!url) throw new Error(`Seedream returned no URL. Full response: ${JSON.stringify(data)}`);
  return url;
}

// ─── GCS upload ──────────────────────────────────────────────────────────
async function uploadToGCS(imageUrl: string, objectPath: string): Promise<string> {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to download image: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  const file = bucket.file(objectPath);
  await file.save(buffer, {
    metadata: {
      contentType: res.headers.get('content-type') || 'image/jpeg',
      cacheControl: 'public, max-age=31536000, immutable',
    },
  });

  return `https://storage.googleapis.com/${GCS_BUCKET}/${objectPath}`;
}

// ─── Slug ────────────────────────────────────────────────────────────────
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .slice(0, 60);
}

// ─── Pipeline ────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n▸ Topic: ${topic}`);
  console.log(`▸ Dry run: ${DRY_RUN}  |  No images: ${NO_IMAGES}\n`);

  // 1. Generate article
  const article = await generateArticle(topic);
  const slug = slugify(article.title);

  // 2. Generate + upload images
  const heroUrl = article.hero_image && !NO_IMAGES
    ? await (async () => {
        console.log(`[Seedream] Generating hero image...`);
        const src = await generateImage(article.hero_image!.prompt);
        console.log(`[GCS] Uploading hero...`);
        return uploadToGCS(src, `wikis/${slug}/hero-${randomUUID().slice(0, 8)}.jpg`);
      })()
    : null;

  const sectionImageUrls: (string | null)[] = [];
  for (let i = 0; i < article.sections.length; i++) {
    const s = article.sections[i];
    if (s.image && !NO_IMAGES) {
      console.log(`[Seedream] Generating image for section ${i + 1}: "${s.heading}"...`);
      try {
        const src = await generateImage(s.image.prompt);
        console.log(`[GCS] Uploading section ${i + 1} image...`);
        const url = await uploadToGCS(src, `wikis/${slug}/sec${i + 1}-${randomUUID().slice(0, 8)}.jpg`);
        sectionImageUrls.push(url);
      } catch (e) {
        console.warn(`[Seedream] Failed for section ${i + 1}:`, (e as Error).message);
        sectionImageUrls.push(null);
      }
    } else {
      sectionImageUrls.push(null);
    }
  }

  // 3. Assemble markdown
  const parts: string[] = [`# ${article.title}`, ''];
  if (heroUrl) {
    parts.push(`![${article.hero_image!.alt}](${heroUrl})`);
    if (article.hero_image!.caption) {
      parts.push(`*${article.hero_image!.caption}*`);
    }
    parts.push('');
  }
  parts.push(article.summary, '');

  article.sections.forEach((s, i) => {
    parts.push(`## ${s.heading}`, '');
    const url = sectionImageUrls[i];
    if (url && s.image) {
      parts.push(`![${s.image.alt}](${url})`);
      if (s.image.caption) parts.push(`*${s.image.caption}*`);
      parts.push('');
    }
    parts.push(s.body, '');
  });

  const fullMarkdown = parts.join('\n').trim();

  // 4. Write to Firestore (or print on dry-run)
  const now = Date.now();
  const doc = {
    title: article.title,
    question: article.question,
    content: fullMarkdown,
    summary: article.summary,
    tags: article.tags,
    authorId: 'system',
    authorName: 'GPTwiki Bot',
    authorImage: '',
    aiModel: 'claude' as const,
    conversation: [
      { id: 'q1', role: 'user' as const, content: article.question, timestamp: now },
      { id: 'a1', role: 'assistant' as const, content: article.summary, timestamp: now },
    ],
    views: Math.floor(Math.random() * 200) + 20,
    createdAt: now,
    updatedAt: now,
    source: 'seed-rich',
  };

  if (DRY_RUN) {
    console.log(`\n─── DRY RUN: would write document ───`);
    console.log(`title: ${doc.title}`);
    console.log(`tags:  ${doc.tags.join(', ')}`);
    console.log(`content length: ${fullMarkdown.length} chars`);
    const previewPath = `/tmp/seed-rich-${slug}.md`;
    writeFileSync(previewPath, fullMarkdown);
    console.log(`preview written to: ${previewPath}`);
  } else {
    const ref = db.collection('wikis').doc();
    await ref.set(doc);
    console.log(`\n✓ Firestore document created: ${ref.id}`);
    console.log(`  /wiki/${ref.id}`);
  }

  console.log(`\nDone.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('\nFATAL:', err);
  process.exit(1);
});
