import type { DraftArticle } from './types';
import { cookingScienceEn } from './cooking-science.en';
import { cookingScienceZh } from './cooking-science.zh';

// Batch: Cooking Science — quality-tier editorial cluster (10 topics × en/zh).
// The science behind everyday cooking. Not in content/index.ts `allDrafts`;
// seed with scripts/seed-editorial.ts --batch=cooking-science.
export const cookingScience: DraftArticle[] = [...cookingScienceEn, ...cookingScienceZh];

export { cookingScienceEn, cookingScienceZh };
