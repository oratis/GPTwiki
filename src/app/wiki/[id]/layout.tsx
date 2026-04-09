import type { Metadata } from 'next';
import { db } from '@/lib/firebase';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const doc = await db.collection('wikis').doc(id).get();
    if (!doc.exists) return {};
    const data = doc.data()!;

    const title = data.title;
    const description = (data.summary || data.content?.substring(0, 160) || '').substring(0, 160);

    return {
      title,
      description,
      openGraph: {
        title: `${title} | GPTwiki`,
        description,
        url: `https://gptwiki.net/wiki/${id}`,
        type: 'article',
        publishedTime: new Date(data.createdAt).toISOString(),
        authors: [data.authorName || 'GPTwiki Bot'],
        tags: data.tags,
        images: [{
          url: `https://gptwiki.net/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
          alt: title,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | GPTwiki`,
        description,
        images: [`https://gptwiki.net/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`],
      },
      other: {
        'article:published_time': new Date(data.createdAt).toISOString(),
        'article:author': data.authorName || 'GPTwiki Bot',
      },
    };
  } catch {
    return {};
  }
}

export default async function WikiLayout({ params, children }: Props) {
  const { id } = await params;

  let jsonLd = null;
  try {
    const doc = await db.collection('wikis').doc(id).get();
    if (doc.exists) {
      const data = doc.data()!;
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: (data.summary || '').substring(0, 160),
        datePublished: new Date(data.createdAt).toISOString(),
        dateModified: new Date(data.updatedAt || data.createdAt).toISOString(),
        author: { '@type': 'Person', name: data.authorName || 'GPTwiki Bot' },
        publisher: { '@type': 'Organization', name: 'GPTwiki', url: 'https://gptwiki.net' },
        mainEntityOfPage: `https://gptwiki.net/wiki/${id}`,
        keywords: data.tags?.join(', '),
        inLanguage: data.language || 'en',
      };
    }
  } catch { /* ignore */ }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
