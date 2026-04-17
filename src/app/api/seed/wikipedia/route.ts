import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

const SEED_SECRET = process.env.AUTH_SECRET;

const WIKI_API = (lang: string) =>
  `https://${lang}.wikipedia.org/w/api.php`;

interface WikiImage {
  source: string;
  width: number;
  height: number;
}

interface WikiArticle {
  title: string;
  extract: string;
  thumbnail?: WikiImage;
  originalimage?: WikiImage;
}

const LANG_CONFIG: Record<string, { name: string; target: number }> = {
  en: { name: 'English', target: 30000 },
  zh: { name: '中文', target: 8000 },
  ja: { name: '日本語', target: 6000 },
  ko: { name: '한국어', target: 5000 },
  es: { name: 'Español', target: 6000 },
  fr: { name: 'Français', target: 6000 },
  de: { name: 'Deutsch', target: 6000 },
  pt: { name: 'Português', target: 5000 },
  ru: { name: 'Русский', target: 5000 },
  ar: { name: 'العربية', target: 4000 },
  hi: { name: 'हिन्दी', target: 3000 },
  it: { name: 'Italiano', target: 5000 },
  tr: { name: 'Türkçe', target: 3000 },
  vi: { name: 'Tiếng Việt', target: 3000 },
  th: { name: 'ไทย', target: 3000 },
};

function generateTags(title: string, extract: string, lang: string): string[] {
  const tags: string[] = [lang];
  const text = `${title} ${extract}`.toLowerCase();
  const kw: Record<string, string[]> = {
    science: ['science', 'physics', 'chemistry', 'biology', 'research', '科学', '物理', '化学', '生物'],
    technology: ['technology', 'computer', 'software', 'digital', '技术', 'テクノロジー', '기술'],
    mathematics: ['math', 'theorem', 'equation', 'algebra', '数学'],
    history: ['history', 'century', 'war', 'empire', 'dynasty', '历史', '역사', '歴史'],
    geography: ['country', 'city', 'river', 'mountain', 'island', '地理'],
    arts: ['art', 'music', 'film', 'literature', 'novel', '艺术', '音楽', '예술'],
    medicine: ['disease', 'medical', 'health', 'syndrome', '医学'],
    sports: ['sport', 'football', 'olympic', 'championship', '体育', 'スポーツ'],
    politics: ['politic', 'government', 'president', 'election', '政治'],
    nature: ['animal', 'plant', 'species', 'ecosystem', '自然'],
    philosophy: ['philosophy', 'ethics', 'logic', '哲学'],
    economics: ['economy', 'market', 'trade', 'finance', '经济'],
    engineering: ['engineering', 'machine', 'engine', 'design', '工程'],
  };
  for (const [tag, words] of Object.entries(kw)) {
    if (words.some((w) => text.includes(w))) tags.push(tag);
  }
  return tags.slice(0, 5);
}

function buildQuestion(lang: string, title: string): string {
  const q: Record<string, string> = {
    zh: `什么是${title}？`, ja: `${title}とは？`, ko: `${title}란 무엇인가요?`,
    es: `¿Qué es ${title}?`, fr: `Qu'est-ce que ${title} ?`, de: `Was ist ${title}?`,
    pt: `O que é ${title}?`, ru: `Что такое ${title}?`, ar: `ما هو ${title}؟`,
    hi: `${title} क्या है?`, it: `Cos'è ${title}?`, tr: `${title} nedir?`,
    vi: `${title} là gì?`, th: `${title} คืออะไร?`,
  };
  return q[lang] || `What is ${title}?`;
}

/**
 * Fetch random articles using MediaWiki API - returns up to 20 articles with extracts per call.
 * Much faster than the REST API random endpoint (1 article per call).
 */
async function fetchRandomBatch(lang: string): Promise<WikiArticle[]> {
  const url = `${WIKI_API(lang)}?action=query&generator=random&grnnamespace=0&grnlimit=20&prop=extracts|pageimages&piprop=thumbnail|original&pithumbsize=800&exintro=true&explaintext=true&format=json`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'GPTwiki-Bot/1.0 (gptwiki.net; content aggregation)' },
    });
    if (!res.ok) {
      console.error(`[Seed] fetchRandom ${lang} HTTP ${res.status}`);
      return [];
    }
    const data = await res.json();
    if (!data.query?.pages) {
      console.error(`[Seed] fetchRandom ${lang} no pages in response:`, JSON.stringify(data).substring(0, 200));
      return [];
    }
    const pages = data.query.pages;
    const articles: WikiArticle[] = [];
    for (const page of Object.values(pages) as Array<{
      title: string;
      extract?: string;
      ns?: number;
      thumbnail?: WikiImage;
      original?: WikiImage;
    }>) {
      if (page.extract && page.extract.length >= 80 && !page.title.includes(':')) {
        articles.push({
          title: page.title,
          extract: page.extract,
          thumbnail: page.thumbnail,
          originalimage: page.original,
        });
      }
    }
    return articles;
  } catch (err) {
    console.error(`[Seed] fetchRandom ${lang} error:`, err);
    return [];
  }
}

/**
 * Fetch articles from a specific category with extracts.
 */
async function fetchCategoryBatch(lang: string, category: string, cmcontinue?: string): Promise<{ articles: WikiArticle[]; cmcontinue?: string }> {
  let url = `${WIKI_API(lang)}?action=query&generator=categorymembers&gcmtitle=Category:${encodeURIComponent(category)}&gcmlimit=50&gcmnamespace=0&gcmtype=page&prop=extracts|pageimages&piprop=thumbnail|original&pithumbsize=800&exintro=true&explaintext=true&format=json`;
  if (cmcontinue) url += `&gcmcontinue=${encodeURIComponent(cmcontinue)}`;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'GPTwiki-Bot/1.0 (gptwiki.net)' },
    });
    if (!res.ok) return { articles: [] };
    const data = await res.json();
    const pages = data.query?.pages || {};
    const articles: WikiArticle[] = [];
    for (const page of Object.values(pages) as Array<{ title: string; extract?: string; thumbnail?: WikiImage; original?: WikiImage }>) {
      if (page.extract && page.extract.length >= 80 && !page.title.includes(':')) {
        articles.push({ title: page.title, extract: page.extract, thumbnail: page.thumbnail, originalimage: page.original });
      }
    }
    return { articles, cmcontinue: data.continue?.gcmcontinue };
  } catch {
    return { articles: [] };
  }
}

/**
 * Fetch articles using allpages with extracts - paginated.
 */
async function fetchAllPagesBatch(lang: string, apcontinue?: string): Promise<{ articles: WikiArticle[]; apcontinue?: string }> {
  let url = `${WIKI_API(lang)}?action=query&generator=allpages&gapnamespace=0&gaplimit=50&gapfilterredir=nonredirects&prop=extracts|pageimages&piprop=thumbnail|original&pithumbsize=800&exintro=true&explaintext=true&format=json`;
  if (apcontinue) url += `&gapcontinue=${encodeURIComponent(apcontinue)}`;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'GPTwiki-Bot/1.0 (gptwiki.net)' },
    });
    if (!res.ok) return { articles: [] };
    const data = await res.json();
    const pages = data.query?.pages || {};
    const articles: WikiArticle[] = [];
    for (const page of Object.values(pages) as Array<{ title: string; extract?: string; thumbnail?: WikiImage; original?: WikiImage }>) {
      if (page.extract && page.extract.length >= 80 && !page.title.includes(':')) {
        articles.push({ title: page.title, extract: page.extract, thumbnail: page.thumbnail, originalimage: page.original });
      }
    }
    return { articles, apcontinue: data.continue?.gapcontinue };
  } catch {
    return { articles: [] };
  }
}

/**
 * Store articles to Firestore using batch writes (max 500 per batch).
 */
async function storeArticles(lang: string, articles: WikiArticle[]): Promise<number> {
  let stored = 0;
  const now = Date.now();

  for (let i = 0; i < articles.length; i += 450) {
    const chunk = articles.slice(i, i + 450);
    const batch = db.batch();

    for (const article of chunk) {
      const imageMarkdown = article.thumbnail
        ? `![${article.title}](${article.thumbnail.source})\n\n`
        : '';
      const content = `# ${article.title}\n\n${imageMarkdown}${article.extract}`;
      const summary = article.extract.substring(0, 300);
      const tags = generateTags(article.title, article.extract, lang);
      const question = buildQuestion(lang, article.title);

      const doc: Record<string, unknown> = {
        title: article.title,
        question,
        content,
        summary,
        tags,
        authorId: 'system',
        authorName: 'GPTwiki Bot',
        authorImage: '',
        aiModel: 'claude',
        conversation: [
          { id: 'q1', role: 'user', content: question, timestamp: now },
          { id: 'a1', role: 'assistant', content: summary, timestamp: now },
        ],
        views: Math.floor(Math.random() * 50) + 5,
        createdAt: now - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000),
        updatedAt: now,
        source: `wikipedia-${lang}-rich`,
        language: lang,
      };

      if (article.thumbnail) {
        doc.imageUrl = article.thumbnail.source;
        doc.imageWidth = article.thumbnail.width;
        doc.imageHeight = article.thumbnail.height;
      }
      if (article.originalimage) {
        doc.originalImageUrl = article.originalimage.source;
      }

      batch.set(db.collection('wikis').doc(), doc);
    }

    try {
      await batch.commit();
      stored += chunk.length;
    } catch (err) {
      console.error(`[Seed] ${lang} batch error:`, err);
    }
  }
  return stored;
}

/**
 * POST /api/seed/wikipedia?secret=xxx
 * Body: { lang, count, mode: "random"|"allpages"|"category", apcontinue, category }
 *
 * All modes now use MediaWiki API which returns articles WITH extracts in a single call.
 * This is 10-20x faster than the REST API approach.
 */
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const lang = body.lang || 'en';
  const count = Math.min(body.count || 500, 5000);
  const mode = body.mode || 'random';
  const apcontinue = body.apcontinue || undefined;
  const category = body.category || undefined;

  if (!LANG_CONFIG[lang]) {
    return NextResponse.json({ error: `Unsupported language: ${lang}` }, { status: 400 });
  }

  console.log(`[Seed] ${lang} mode=${mode} count=${count}`);

  const allArticles: WikiArticle[] = [];
  const seen = new Set<string>();
  let nextContinue: string | undefined = apcontinue;

  if (mode === 'random') {
    // Fire many concurrent random batch requests
    // Each returns ~10-15 valid articles, so we need count/10 batches
    const batchesNeeded = Math.ceil(count / 8); // conservative estimate
    const concurrency = 10;

    for (let i = 0; i < batchesNeeded && allArticles.length < count; i += concurrency) {
      const batchCount = Math.min(concurrency, batchesNeeded - i);
      const promises = Array.from({ length: batchCount }, () => fetchRandomBatch(lang));
      const results = await Promise.all(promises);

      for (const batch of results) {
        for (const a of batch) {
          if (!seen.has(a.title)) {
            seen.add(a.title);
            allArticles.push(a);
          }
        }
      }
    }
  } else if (mode === 'allpages') {
    // Paginated allpages traversal
    let cont = apcontinue;
    while (allArticles.length < count) {
      const result = await fetchAllPagesBatch(lang, cont);
      for (const a of result.articles) {
        if (!seen.has(a.title)) {
          seen.add(a.title);
          allArticles.push(a);
        }
      }
      if (!result.apcontinue) break;
      cont = result.apcontinue;
      nextContinue = cont;
    }
  } else if (mode === 'category') {
    // Category-based fetching
    const categories: Record<string, string[]> = {
      en: ['Science', 'History', 'Geography', 'Technology', 'Sports', 'Music', 'Film', 'Literature',
           'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Medicine', 'Philosophy', 'Economics',
           'Engineering', 'Architecture', 'Art', 'Education', 'Law', 'Politics', 'Religion',
           'Astronomy', 'Geology', 'Psychology', 'Sociology', 'Agriculture', 'Computing',
           'Electronics', 'Transport', 'Military', 'Business', 'Food_and_drink', 'Fashion'],
      zh: ['科学', '历史', '地理', '技术', '体育', '音乐', '电影', '文学', '数学', '物理学', '化学', '生物学',
           '医学', '哲学', '经济学', '工程学', '建筑', '艺术', '教育', '法律', '政治', '宗教', '天文学'],
      ja: ['科学', '歴史', '地理学', '技術', 'スポーツ', '音楽', '映画', '文学', '数学', '物理学',
           '化学', '生物学', '医学', '哲学', '経済学', '工学', '建築', '美術', '教育'],
      ko: ['과학', '역사', '지리', '기술', '스포츠', '음악', '영화', '문학', '수학', '물리학'],
      es: ['Ciencia', 'Historia', 'Geografía', 'Tecnología', 'Deporte', 'Música', 'Cine', 'Literatura',
           'Matemáticas', 'Física', 'Química', 'Biología', 'Medicina', 'Filosofía'],
      fr: ['Science', 'Histoire', 'Géographie', 'Technologie', 'Sport', 'Musique', 'Cinéma', 'Littérature',
           'Mathématiques', 'Physique', 'Chimie', 'Biologie', 'Médecine', 'Philosophie'],
      de: ['Wissenschaft', 'Geschichte', 'Geographie', 'Technik', 'Sport', 'Musik', 'Film', 'Literatur',
           'Mathematik', 'Physik', 'Chemie', 'Biologie', 'Medizin', 'Philosophie'],
      pt: ['Ciência', 'História', 'Geografia', 'Tecnologia', 'Esporte', 'Música', 'Cinema', 'Literatura',
           'Matemática', 'Física', 'Química', 'Biologia', 'Medicina', 'Filosofia'],
      ru: ['Наука', 'История', 'География', 'Технология', 'Спорт', 'Музыка', 'Кинематограф', 'Литература',
           'Математика', 'Физика', 'Химия', 'Биология', 'Медицина', 'Философия'],
      it: ['Scienza', 'Storia', 'Geografia', 'Tecnologia', 'Sport', 'Musica', 'Cinema', 'Letteratura',
           'Matematica', 'Fisica', 'Chimica', 'Biologia', 'Medicina', 'Filosofia'],
      ar: ['علوم', 'تاريخ', 'جغرافيا', 'تقنية', 'رياضة', 'موسيقى', 'سينما', 'أدب', 'رياضيات'],
      hi: ['विज्ञान', 'इतिहास', 'भूगोल', 'प्रौद्योगिकी', 'खेल', 'संगीत', 'सिनेमा', 'साहित्य'],
      tr: ['Bilim', 'Tarih', 'Coğrafya', 'Teknoloji', 'Spor', 'Müzik', 'Sinema', 'Edebiyat'],
      vi: ['Khoa_học', 'Lịch_sử', 'Địa_lý', 'Công_nghệ', 'Thể_thao', 'Âm_nhạc', 'Điện_ảnh'],
      th: ['วิทยาศาสตร์', 'ประวัติศาสตร์', 'ภูมิศาสตร์', 'เทคโนโลยี', 'กีฬา', 'ดนตรี'],
    };
    const cats = categories[lang] || categories['en'];
    const cat = category || cats[Math.floor(Math.random() * cats.length)];

    let cont: string | undefined;
    while (allArticles.length < count) {
      const result = await fetchCategoryBatch(lang, cat, cont);
      for (const a of result.articles) {
        if (!seen.has(a.title)) {
          seen.add(a.title);
          allArticles.push(a);
        }
      }
      if (!result.cmcontinue) break;
      cont = result.cmcontinue;
    }
  }

  const toStore = allArticles.slice(0, count);
  const stored = await storeArticles(lang, toStore);

  console.log(`[Seed] ${lang}: fetched=${allArticles.length} stored=${stored}`);

  return NextResponse.json({
    language: lang,
    languageName: LANG_CONFIG[lang].name,
    stored,
    fetched: allArticles.length,
    mode,
    ...(nextContinue ? { apcontinue: nextContinue } : {}),
  });
}

/**
 * GET /api/seed/wikipedia?secret=xxx
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const totalSnap = await db.collection('wikis').count().get();
  const total = totalSnap.data().count;

  const langKeys = Object.keys(LANG_CONFIG);
  const langCounts = await Promise.all(
    langKeys.map(async (lang) => {
      const [plainSnap, richSnap] = await Promise.all([
        db.collection('wikis').where('source', '==', `wikipedia-${lang}`).count().get(),
        db.collection('wikis').where('source', '==', `wikipedia-${lang}-rich`).count().get(),
      ]);
      return { lang, plain: plainSnap.data().count, rich: richSnap.data().count };
    })
  );

  const counts: Record<string, number> = {};
  let totalRich = 0;
  for (const { lang, plain, rich } of langCounts) {
    counts[lang] = plain;
    counts[`${lang}-rich`] = rich;
    totalRich += rich;
  }
  counts['__total_rich'] = totalRich;

  const seedSnap = await db.collection('wikis').where('source', '==', 'seed').count().get();
  counts['seed'] = seedSnap.data().count;
  const userSnap = await db.collection('wikis').where('authorId', '!=', 'system').count().get();
  counts['user-created'] = userSnap.data().count;

  return NextResponse.json({
    total,
    bySource: counts,
    targets: Object.fromEntries(Object.entries(LANG_CONFIG).map(([k, v]) => [k, v.target])),
  });
}
