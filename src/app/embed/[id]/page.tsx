import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BookOpen, Eye, Bot } from 'lucide-react';
import { getWikiById, getPopularWikis } from '@/lib/search';
import { getModelDisplayName } from '@/lib/models';

export const revalidate = 3600;

// Pre-render the same top 50 popular wikis for embed cards.
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  try {
    const popular = await getPopularWikis(50);
    return popular.map((w) => ({ id: w.id }));
  } catch {
    return [];
  }
}

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const wiki = await getWikiById(id);
  if (!wiki) notFound();

  // Pull the first image URL out of the markdown for the card preview
  const imageMatch = wiki.content.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/);
  const imageUrl = wiki.imageUrl || imageMatch?.[1] || null;

  const targetUrl = `https://gptwiki.net/en/wiki/${id}`;
  const description = wiki.summary || wiki.content.replace(/[#*`_[\]!()]/g, '').slice(0, 180);

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full min-h-[140px] w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white font-sans text-gray-900 shadow-sm transition-all hover:border-blue-300 hover:shadow-md sm:flex-row"
    >
      {imageUrl && (
        <div className="relative h-40 w-full flex-shrink-0 overflow-hidden bg-gray-100 sm:h-auto sm:w-48">
          <Image
            src={imageUrl}
            alt={wiki.title}
            fill
            sizes="(max-width: 640px) 100vw, 192px"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-blue-600">
            <BookOpen className="h-3 w-3" />
            GPTwiki
          </div>
          <h3 className="mb-1 line-clamp-2 text-base font-semibold leading-snug group-hover:text-blue-600">
            {wiki.title}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {wiki.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Bot className="h-3 w-3" />
            {getModelDisplayName(wiki.aiModel)}
          </span>
          {wiki.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
