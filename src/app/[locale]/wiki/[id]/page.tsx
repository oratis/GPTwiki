import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Eye, Bot, Clock, Tag, User, Users, BookOpen, ExternalLink, History } from 'lucide-react';
import WikiContent from '@/components/wiki/WikiContent';
import ShareButtons from '@/components/wiki/ShareButtons';
import EmbedCodeButton from '@/components/wiki/EmbedCodeButton';
import ThreadReplyList from '@/components/wiki/ThreadReplyList';
import WikiInteractive from '@/components/wiki/WikiInteractive';
import RelatedWikis from '@/components/wiki/RelatedWikis';
import { getWikiById, getPopularWikiIds, getWikiRevisions, incrementWikiViews } from '@/lib/search';
import { timeAgo } from '@/lib/utils';
import { getModelDisplayName } from '@/lib/models';
import {
  hasLocale,
  supportedLocales,
  getTranslations,
  type Locale,
} from '@/lib/i18n/server';
import { localeHref } from '@/lib/i18n/links';
import {
  mirrorPagesNoindexed,
  isWikipediaSourced as isWikipediaSource,
  extractFaq,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
  serializeJsonLd,
} from '@/lib/seo';

export const revalidate = 3600;
export const dynamicParams = true;

type RouteParams = { locale: string; id: string };

/** Pre-render the top popular wikis at build time, for every locale. */
export async function generateStaticParams(): Promise<Array<{ locale: Locale; id: string }>> {
  // next dev runs this on first navigation to the route, which would block
  // the request on a Firestore scan. Dev renders on demand anyway
  // (dynamicParams = true), so skip it there.
  if (process.env.NODE_ENV === 'development') return [];
  try {
    const ids = await getPopularWikiIds(50);
    const out: Array<{ locale: Locale; id: string }> = [];
    for (const loc of supportedLocales) {
      for (const id of ids) out.push({ locale: loc, id });
    }
    return out;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!hasLocale(locale)) return { title: 'Wiki not found' };

  const wiki = await getWikiById(id).catch(() => null);
  if (!wiki) return { title: 'Wiki not found' };

  const description =
    wiki.summary || (wiki.content?.replace(/[#*`_[\]]/g, '').slice(0, 200) ?? '');
  const canonical = `https://gptwiki.net/${locale}/wiki/${id}`;

  // The OG route runs on the edge and can't read Firestore, so pass the
  // title/subtitle directly instead of an id it would ignore (which made
  // every wiki share the same generic card).
  const ogImage = `/api/og?title=${encodeURIComponent(wiki.title)}&subtitle=${encodeURIComponent(
    description.slice(0, 120)
  )}`;

  // hreflang alternates — same wiki ID across all locales
  const languages: Record<string, string> = {};
  for (const loc of supportedLocales) languages[loc] = `https://gptwiki.net/${loc}/wiki/${id}`;
  languages['x-default'] = `https://gptwiki.net/en/wiki/${id}`;

  // Emergency hedge: if the site gets flagged for scaled-content abuse, the
  // owner can noindex every Wikipedia mirror at once via an env flag, without
  // touching content. Off by default (mirrors stay indexed).
  const robots =
    isWikipediaSourced(wiki) && mirrorPagesNoindexed()
      ? { index: false, follow: true }
      : undefined;

  return {
    title: wiki.title,
    description,
    keywords: wiki.tags,
    alternates: { canonical, languages },
    ...(robots ? { robots } : {}),
    openGraph: {
      type: 'article',
      title: wiki.title,
      description,
      url: canonical,
      siteName: 'GPTwiki',
      locale,
      publishedTime: new Date(wiki.createdAt).toISOString(),
      modifiedTime: new Date(wiki.updatedAt).toISOString(),
      authors: [wiki.authorName],
      tags: wiki.tags,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: wiki.title,
      description,
      images: [ogImage],
    },
  };
}

/** True for articles mirrored from Wikipedia, which require CC BY-SA attribution. */
function isWikipediaSourced(wiki: { source?: string }): boolean {
  return isWikipediaSource(wiki.source);
}

/** Link to the original Wikipedia article in the article's own language. */
function wikipediaOriginalUrl(wiki: { title: string; language?: string }): string {
  const lang = wiki.language || 'en';
  return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(wiki.title.replace(/ /g, '_'))}`;
}

function buildJsonLd(
  wiki: NonNullable<Awaited<ReturnType<typeof getWikiById>>>,
  locale: Locale,
  id: string
) {
  const url = `https://gptwiki.net/${locale}/wiki/${id}`;
  const attribution = isWikipediaSourced(wiki)
    ? {
        license: 'https://creativecommons.org/licenses/by-sa/4.0/',
        isBasedOn: wikipediaOriginalUrl(wiki),
      }
    : {};
  return {
    ...attribution,
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url,
    headline: wiki.title,
    description: wiki.summary,
    keywords: wiki.tags?.join(', '),
    datePublished: new Date(wiki.createdAt).toISOString(),
    dateModified: new Date(wiki.updatedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: wiki.authorName,
      url: `https://gptwiki.net/${locale}/profile/${wiki.authorId}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GPTwiki',
      url: 'https://gptwiki.net',
    },
    image: `https://gptwiki.net/api/og?title=${encodeURIComponent(
      wiki.title
    )}&subtitle=${encodeURIComponent((wiki.summary || '').slice(0, 120))}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: (wiki as { language?: string }).language || locale,
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
  params: Promise<RouteParams>;
}) {
  const { locale, id } = await params;
  if (!hasLocale(locale)) notFound();

  const wiki = await getWikiById(id);
  if (!wiki) notFound();

  // Count one view per page render (not in generateMetadata / API reads).
  void incrementWikiViews(id);

  // Edit history — empty for never-edited wikis, so the query is cheap.
  const revisions = await getWikiRevisions(id).catch(() => []);

  const t = getTranslations(locale);
  const jsonLd = buildJsonLd(wiki, locale, id);
  // Structured data beyond the bare Article: a BreadcrumbList, and FAQPage
  // from the article's own FAQ section (answer engines read it; Google has
  // not shown FAQ rich results for sites like this one since Aug 2023).
  // extractFaq returns [] for mirrors and freeform articles, so FAQPage only
  // appears where it's real.
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, id, wiki.title, {
    home: t('header.brandName'),
    wiki: t('header.browseWiki'),
  });
  const faqJsonLd = buildFaqJsonLd(extractFaq(wiki.content));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
        />
      )}

      <Link
        href={localeHref(locale, '/wiki')}
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('wiki.backToWikis')}
      </Link>

      <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">{wiki.title}</h1>

        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <Link
            href={localeHref(locale, `/profile/${wiki.authorId}`)}
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <User className="h-4 w-4" />
            {wiki.authorName}
          </Link>
          {(wiki.contributors?.length ?? 0) > 0 && (
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {t('wiki.contributors')}:{' '}
              {wiki.contributors!.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && ', '}
                  <Link
                    href={localeHref(locale, `/profile/${c.id}`)}
                    className="hover:text-blue-600"
                  >
                    {c.name}
                  </Link>
                </span>
              ))}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bot className="h-4 w-4" />
            {getModelDisplayName(wiki.aiModel)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {wiki.views} {t('wiki.views')}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {timeAgo(wiki.createdAt, locale)}
          </span>
        </div>

        {wiki.tags?.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {wiki.tags.map((tag) => (
              <Link
                key={tag}
                href={localeHref(locale, `/browse?tag=${encodeURIComponent(tag)}`)}
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
            <p className="text-sm font-medium text-gray-500">{t('wiki.originalQuestion')}</p>
            <p className="mt-1 text-gray-900">{wiki.question}</p>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between gap-3">
          <hr className="flex-1" />
          <div className="flex items-center gap-2">
            <EmbedCodeButton wikiId={id} />
            <ShareButtons
              url={`https://gptwiki.net/${locale}/wiki/${id}`}
              title={wiki.title}
              summary={wiki.summary || wiki.content?.substring(0, 200) || ''}
            />
          </div>
        </div>

        <WikiContent content={wiki.content} />

        {(wiki.sources?.length ?? 0) > 0 && (
          <section className="mt-8 border-t border-gray-100 pt-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <BookOpen className="h-5 w-5 text-gray-500" />
              {t('wiki.references')}
            </h2>
            <ol className="list-decimal space-y-1 pl-5 text-sm">
              {wiki.sources!.map((src, i) => (
                <li key={i} className="text-gray-600">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    {src.title}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        {revisions.length > 0 && (
          <section className="mt-8 border-t border-gray-100 pt-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <History className="h-5 w-5 text-gray-500" />
              {t('wiki.editHistory')}
            </h2>
            <ul className="space-y-1 text-sm text-gray-600">
              {revisions.map((rev) => (
                <li key={rev.id} className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-gray-400" />
                  <Link
                    href={localeHref(locale, `/profile/${rev.editorId}`)}
                    className="font-medium text-gray-700 hover:text-blue-600"
                  >
                    {rev.editorName}
                  </Link>
                  <span className="text-gray-400">·</span>
                  <span>{timeAgo(rev.updatedAt, locale)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {isWikipediaSourced(wiki) && (
          <aside className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600">
            <p>
              {t('wiki.wikipediaAttribution')}{' '}
              <a
                href={wikipediaOriginalUrl(wiki)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                {t('wiki.wikipediaViewOriginal')}
              </a>{' '}
              ·{' '}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                CC BY-SA 4.0
              </a>
            </p>
          </aside>
        )}
      </article>

      <WikiInteractive wiki={wiki} />

      <ThreadReplyList wikiId={wiki.id} threadCount={wiki.threadCount} wikiAuthorId={wiki.authorId} />

      <RelatedWikis currentWikiId={wiki.id} tags={wiki.tags} locale={locale} />
    </div>
  );
}
