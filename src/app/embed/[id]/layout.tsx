import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  // Embed pages should not surface in search results — they're meant to
  // be consumed via <iframe>, not visited directly.
  robots: { index: false, follow: false },
};

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0 bg-transparent">{children}</body>
    </html>
  );
}
