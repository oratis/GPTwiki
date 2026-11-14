import type { ReactNode } from 'react';

/** Shared sizing for article tags, category links and filter counts. */
export const tagBadgeClassName = 'inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-xs font-medium leading-4 text-slate-600';

export default function TagBadge({ children }: { children: ReactNode }) {
  return <span title={typeof children === 'string' ? children : undefined} className={tagBadgeClassName}><span className="truncate">{children}</span></span>;
}
