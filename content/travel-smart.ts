import type { DraftArticle } from './types';
import { travelSmartEn } from './travel-smart.en';
import { travelSmartZh } from './travel-smart.zh';

// Batch: Travel Smart — quality-tier editorial cluster (10 topics × en/zh).
// Practical travel decisions. Not in content/index.ts `allDrafts`;
// seed with scripts/seed-editorial.ts --batch=travel-smart.
export const travelSmart: DraftArticle[] = [...travelSmartEn, ...travelSmartZh];

export { travelSmartEn, travelSmartZh };
