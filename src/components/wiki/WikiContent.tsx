import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface WikiContentProps {
  content: string;
}

export default function WikiContent({ content }: WikiContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-pink-600 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-blue-500 prose-blockquote:text-gray-600">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
