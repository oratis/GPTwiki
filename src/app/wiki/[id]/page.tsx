import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Eye, Bot, Clock, Tag, User } from 'lucide-react';
import WikiContent from '@/components/wiki/WikiContent';
import ShareButtons from '@/components/wiki/ShareButtons';
import ThreadReplyList from '@/components/wiki/ThreadReplyList';
import WikiInteractive from '@/components/wiki/WikiInteractive';
import RelatedWikis from '@/components/wiki/RelatedWikis';
import { getWikiById, getPopularWikis } from '@/lib/search';
import { timeAgo } from '@/lib/utils';
import { getModelDisplayName } from '@/lib/models';

// ISR: revalidate once per hour. Individual pages can also be invalidated
// via router.refresh() after an author continues the conversation.
export const revalidate = 3600;
// Keep pre-rendered pages fresh forever; new IDs fall back to dynamic SSR
// on first request and then get cached.
export const dynamicParams = true;

/** Pre-render the top popular wikis at build time. */
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  try {
    const popular = await getPopularWikis(50);
    return popular.map((w) => ({ id: w.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const wiki = await getWikiById(id).catch(() => null);
  if (!wiki) {
    return { title: 'Wiki not found | GPTwiki' };
  }

  const description =
    wiki.summary || (wiki.content?.replace(/[#*`_[\]]/g, '').slice(0, 200) ?? '');
  const url = `https://gptwiki.net/wiki/${id}`;

  return {
    title: `${wiki.title} | GPTwiki`,
    description,
    keywords: wiki.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: wiki.title,
      description,
      url,
      siteName: 'GPTwiki',
      publishedTime: new Date(wiki.createdAt).toISOString(),
      modifiedTime: new Date(wiki.updatedAt).toISOString(),
      authors: [wiki.authorName],
      tags: wiki.tags,
      images: [`/api/og?id=${id}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: wiki.title,
      description,
      images: [`/api/og?id=${id}`],
    },
  };
}

function buildJsonLd(
  wiki: NonNullable<Awaited<ReturnType<typeof getWikiById>>>,
  id: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://gptwiki.net/wiki/${id}`,
    headline: wiki.title,
    description: wiki.summary,
    keywords: wiki.tags?.join(', '),
    datePublished: new Date(wiki.createdAt).toISOString(),
    dateModified: new Date(wiki.updatedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: wiki.authorName,
      url: `https://gptwiki.net/profile/${wiki.authorId}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GPTwiki',
      url: 'https://gptwiki.net',
    },
    image: `https://gptwiki.net/api/og?id=${id}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://gptwiki.net/wiki/${id}` },
    inLanguage: (wiki as { language?: string }).language || 'en',
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/ReadAction',
      userInteractionCount: wiki.views,
    },
  };
}

export default async function WikiDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const wiki = await getWikiById(id);
  if (!wiki) notFound();

  const jsonLd = buildJsonLd(wiki, id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        // JSON-LD is plain data, no user-controlled HTML inside.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/wiki"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to wikis
      </Link>

      <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">{wiki.title}</h1>

        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <Link
            href={`/profile/${wiki.authorId}`}
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <User className="h-4 w-4" />
            {wiki.authorName}
          </Link>
          <span className="flex items-center gap-1">
            <Bot className="h-4 w-4" />
            {getModelDisplayName(wiki.aiModel)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {wiki.views} views
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {timeAgo(wiki.createdAt)}
          </span>
        </div>

        {wiki.tags?.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {wiki.tags.map((tag) => (
              <Link
                key={tag}
                href={`/browse?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            ))}
          </div>
        )}

        {wiki.question && (
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">Original Question</p>
            <p className="mt-1 text-gray-900">{wiki.question}</p>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <hr className="flex-1" />
          <div className="ml-4">
            <ShareButtons
              url={`https://gptwiki.net/wiki/${id}`}
              title={wiki.title}
              summary={wiki.summary || wiki.content?.substring(0, 200) || ''}
            />
          </div>
        </div>

        <WikiContent content={wiki.content} />
      </article>

      {/* Client island: conversation toggle + continue chat */}
      <WikiInteractive wiki={wiki} />

      {/* Thread replies (existing client component) */}
      <ThreadReplyList wikiId={wiki.id} threadCount={wiki.threadCount} />

      {/* Server-rendered related wikis — great SEO internal links */}
      <RelatedWikis currentWikiId={wiki.id} tags={wiki.tags} />
    </div>
  );
}
