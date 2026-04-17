import Image from 'next/image';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface WikiContentProps {
  content: string;
}

/**
 * Custom img renderer that routes markdown `![alt](url)` through
 * next/image so Seedream 2K hero images (currently the biggest bytes on
 * the page) get lazy-loading, responsive srcsets, WebP encoding, and the
 * automatic Next.js image optimizer CDN.
 *
 * We use `fill` + a responsive wrapper because the intrinsic dimensions
 * aren't known from markdown alone; a fixed aspect ratio keeps layout
 * stable and avoids CLS.
 */
const components: Components = {
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null;
    return (
      <span className="not-prose my-6 block">
        <span className="relative block w-full overflow-hidden rounded-xl bg-gray-100" style={{ aspectRatio: '16 / 9' }}>
          <Image
            src={src}
            alt={alt || ''}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
            // First image on the page (hero) gets eager priority,
            // but we can't detect position here without a plugin; leave
            // lazy as default to be safe — Next will still inline blur.
          />
        </span>
        {alt ? (
          <span className="mt-2 block text-center text-sm italic text-gray-500">{alt}</span>
        ) : null}
      </span>
    );
  },
};

export default function WikiContent({ content }: WikiContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-pink-600 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-blue-500 prose-blockquote:text-gray-600">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
