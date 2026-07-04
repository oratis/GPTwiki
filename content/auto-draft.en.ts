import type { DraftArticle } from './types';

// Draft carrier for scripts/auto-author.ts — OVERWRITTEN on each run. Empty
// until the first run. Registered as the `auto-draft` batch in
// scripts/seed-editorial.ts; seed AFTER human review:
//   npx tsx scripts/seed-editorial.ts --batch=auto-draft --no-images --apply
export const autoDraftEn: DraftArticle[] = [];
