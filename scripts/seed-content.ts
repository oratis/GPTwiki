/**
 * Cold-start content seeder for GPTwiki
 * Fetches popular articles from Wikipedia and Grokipedia,
 * then imports them into Firestore as wiki entries.
 *
 * Usage: npx tsx scripts/seed-content.ts
 */

import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';

config({ path: '.env.local' });

// ─── Firebase setup ───
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

// ─── Types ───
interface WikiEntry {
  title: string;
  question: string;
  content: string;
  summary: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorImage: string;
  aiModel: string;
  conversation: Array<{ id: string; role: string; content: string; timestamp: number }>;
  views: number;
  createdAt: number;
  updatedAt: number;
  source: string;
}

// ─── Wikipedia fetcher ───
const WIKIPEDIA_TOPICS = [
  // Programming & CS
  'JavaScript_(programming_language)', 'Python_(programming_language)', 'TypeScript',
  'React_(software)', 'Node.js', 'Docker_(software)', 'Kubernetes',
  'Git', 'GraphQL', 'REST', 'SQL', 'NoSQL', 'Redis',
  'Machine_learning', 'Artificial_intelligence', 'Neural_network_(machine_learning)',
  'Large_language_model', 'Natural_language_processing',
  'Cloud_computing', 'Microservices', 'DevOps',
  'Linux', 'HTTP', 'TCP/IP', 'Domain_Name_System',
  'Blockchain', 'Cryptocurrency', 'Bitcoin', 'Ethereum',
  // Science
  'Quantum_computing', 'CRISPR', 'General_relativity', 'Black_hole',
  'Climate_change', 'Renewable_energy', 'Nuclear_fusion',
  // General knowledge
  'World_Wide_Web', 'Internet', 'Open-source_software',
  'Agile_software_development', 'Object-oriented_programming',
  'Functional_programming', 'Data_structure', 'Algorithm',
  'Computer_network', 'Cybersecurity', 'Encryption',
];

async function fetchWikipediaArticle(title: string): Promise<WikiEntry | null> {
  try {
    // Fetch extract
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const summary = await res.json();

    // Fetch full content as mobile-sections for cleaner text
    const contentUrl = `https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(title)}`;
    const contentRes = await fetch(contentUrl);
    if (!contentRes.ok) return null;
    const contentData = await contentRes.json();

    // Build markdown from sections
    let markdown = `# ${summary.title}\n\n${summary.extract}\n\n`;
    const sections = contentData.remaining?.sections || [];

    for (const section of sections.slice(0, 8)) {
      if (['See also', 'References', 'External links', 'Notes', 'Further reading', 'Bibliography'].includes(section.line)) continue;

      const sectionTitle = section.line;
      // Strip HTML tags for plain text
      const text = (section.text || '')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      if (text.length > 50) {
        markdown += `## ${sectionTitle}\n\n${text}\n\n`;
      }
    }

    // Truncate if too long
    if (markdown.length > 8000) {
      markdown = markdown.substring(0, 8000) + '\n\n---\n*Content sourced from Wikipedia. Visit the full article for more details.*';
    }

    // Generate tags from title
    const displayTitle = summary.title;
    const tags = generateTags(displayTitle, summary.description || '');

    return {
      title: displayTitle,
      question: `What is ${displayTitle}?`,
      content: markdown,
      summary: summary.extract?.substring(0, 300) || '',
      tags,
      authorId: 'system',
      authorName: 'GPTwiki Bot',
      authorImage: '',
      aiModel: 'claude',
      conversation: [
        { id: 'q1', role: 'user', content: `What is ${displayTitle}?`, timestamp: Date.now() },
        { id: 'a1', role: 'assistant', content: summary.extract || '', timestamp: Date.now() },
      ],
      views: Math.floor(Math.random() * 100) + 10,
      createdAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: Date.now(),
      source: 'wikipedia',
    };
  } catch (err) {
    console.error(`  Failed to fetch Wikipedia: ${title}`, err);
    return null;
  }
}

// ─── Grokipedia fetcher ───
// Grokipedia is xAI's wiki at grokipedia.com - we'll scrape article pages
const GROKIPEDIA_TOPICS = [
  'artificial-general-intelligence', 'transformer-architecture', 'attention-mechanism',
  'reinforcement-learning', 'generative-ai', 'prompt-engineering',
  'retrieval-augmented-generation', 'fine-tuning', 'tokenization',
  'gradient-descent', 'backpropagation', 'convolutional-neural-network',
  'recurrent-neural-network', 'diffusion-model', 'multimodal-ai',
  'ai-alignment', 'ai-safety', 'superintelligence',
  'chain-of-thought', 'few-shot-learning', 'zero-shot-learning',
  'embedding', 'vector-database', 'semantic-search',
];

async function fetchGrokipediaArticle(slug: string): Promise<WikiEntry | null> {
  try {
    const url = `https://grokipedia.com/article/${slug}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'GPTwiki-Bot/1.0 (content aggregation for gptwiki.net)' },
    });
    if (!res.ok) return null;

    const html = await res.text();

    // Extract title
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
    const title = titleMatch
      ? titleMatch[1].replace(/<[^>]+>/g, '').trim()
      : slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    // Extract main content area
    const contentMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/s)
      || html.match(/<main[^>]*>([\s\S]*?)<\/main>/s)
      || html.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/s);

    if (!contentMatch) {
      console.log(`  No content found for grokipedia: ${slug}`);
      return null;
    }

    // Convert HTML to rough markdown
    let content = contentMatch[1]
      .replace(/<h2[^>]*>(.*?)<\/h2>/gs, '\n## $1\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gs, '\n### $1\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gs, '\n$1\n')
      .replace(/<li[^>]*>(.*?)<\/li>/gs, '- $1')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gs, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gs, '*$1*')
      .replace(/<code[^>]*>(.*?)<\/code>/gs, '`$1`')
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gs, '[$2]($1)')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (content.length < 100) {
      console.log(`  Too short for grokipedia: ${slug} (${content.length} chars)`);
      return null;
    }

    if (content.length > 8000) {
      content = content.substring(0, 8000) + '\n\n---\n*Content sourced from Grokipedia.*';
    }

    const summary = content.split('\n').find((l) => l.trim().length > 50)?.substring(0, 300) || '';
    const tags = generateTags(title, content.substring(0, 500));

    return {
      title,
      question: `What is ${title}?`,
      content: `# ${title}\n\n${content}`,
      summary,
      tags,
      authorId: 'system',
      authorName: 'GPTwiki Bot',
      authorImage: '',
      aiModel: 'gemini',
      conversation: [
        { id: 'q1', role: 'user', content: `Explain ${title}`, timestamp: Date.now() },
        { id: 'a1', role: 'assistant', content: summary, timestamp: Date.now() },
      ],
      views: Math.floor(Math.random() * 80) + 5,
      createdAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: Date.now(),
      source: 'grokipedia',
    };
  } catch (err) {
    console.error(`  Failed to fetch Grokipedia: ${slug}`, err);
    return null;
  }
}

// ─── Helpers ───
function generateTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tagMap: Record<string, string[]> = {
    programming: ['javascript', 'python', 'typescript', 'programming', 'code', 'language'],
    'web development': ['react', 'node', 'web', 'html', 'css', 'frontend', 'backend'],
    'machine learning': ['machine learning', 'neural', 'deep learning', 'training', 'model'],
    ai: ['artificial intelligence', 'ai', 'llm', 'language model', 'generative'],
    devops: ['docker', 'kubernetes', 'devops', 'container', 'deploy', 'ci/cd'],
    database: ['sql', 'nosql', 'redis', 'database', 'firestore', 'mongo'],
    networking: ['http', 'tcp', 'dns', 'network', 'internet', 'protocol'],
    security: ['security', 'encryption', 'cyber', 'authentication'],
    blockchain: ['blockchain', 'crypto', 'bitcoin', 'ethereum', 'decentralized'],
    science: ['quantum', 'physics', 'climate', 'energy', 'biology', 'crispr'],
    cloud: ['cloud', 'aws', 'gcp', 'azure', 'serverless'],
  };

  const tags: string[] = [];
  for (const [tag, keywords] of Object.entries(tagMap)) {
    if (keywords.some((kw) => text.includes(kw))) {
      tags.push(tag);
    }
  }

  // Add the title itself as a tag
  const titleTag = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  if (titleTag && !tags.includes(titleTag)) {
    tags.unshift(titleTag);
  }

  return tags.slice(0, 5);
}

// ─── Main ───
async function main() {
  console.log('=== GPTwiki Cold Start Content Seeder ===\n');

  const entries: WikiEntry[] = [];

  // Fetch Wikipedia articles
  console.log(`Fetching ${WIKIPEDIA_TOPICS.length} Wikipedia articles...`);
  for (const topic of WIKIPEDIA_TOPICS) {
    process.stdout.write(`  ${topic}... `);
    const entry = await fetchWikipediaArticle(topic);
    if (entry) {
      entries.push(entry);
      console.log(`OK (${entry.content.length} chars)`);
    } else {
      console.log('SKIP');
    }
    // Rate limit
    await new Promise((r) => setTimeout(r, 200));
  }

  // Fetch Grokipedia articles
  console.log(`\nFetching ${GROKIPEDIA_TOPICS.length} Grokipedia articles...`);
  for (const slug of GROKIPEDIA_TOPICS) {
    process.stdout.write(`  ${slug}... `);
    const entry = await fetchGrokipediaArticle(slug);
    if (entry) {
      entries.push(entry);
      console.log(`OK (${entry.content.length} chars)`);
    } else {
      console.log('SKIP');
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\nTotal entries: ${entries.length}`);

  // Write to Firestore
  console.log('\nWriting to Firestore...');
  const batch_size = 20;
  for (let i = 0; i < entries.length; i += batch_size) {
    const batch = db.batch();
    const slice = entries.slice(i, i + batch_size);

    for (const entry of slice) {
      const ref = db.collection('wikis').doc();
      batch.set(ref, entry);
    }

    await batch.commit();
    console.log(`  Wrote batch ${Math.floor(i / batch_size) + 1} (${slice.length} entries)`);
  }

  console.log(`\nDone! Seeded ${entries.length} wiki articles.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
