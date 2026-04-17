/**
 * Layout for wiki/[id] routes.
 *
 * All metadata (title, OG, Twitter) and JSON-LD live in `page.tsx` now —
 * page's generateMetadata takes precedence anyway, and co-locating it avoids
 * double database fetches and duplicate schema.org Article emissions.
 */
export default function WikiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
