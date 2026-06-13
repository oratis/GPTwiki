import type { DraftArticle } from './types';
import { aiInPracticeEn } from './ai-in-practice.en';
import { aiInPracticeZh } from './ai-in-practice.zh';
import { aiInPracticeJa } from './ai-in-practice.ja';

// Batch: AI in Practice — quality-tier editorial cluster (10 topics × en/zh).
// Deliberately NOT registered in content/index.ts `allDrafts`: the legacy
// seeders (src/app/api/seed, scripts/seed-drafts.ts) de-dup by reading every
// existing title, which is unusable at the current corpus size. Seed this
// batch with scripts/seed-editorial.ts instead.
export const aiInPractice: DraftArticle[] = [...aiInPracticeEn, ...aiInPracticeZh, ...aiInPracticeJa];

export { aiInPracticeEn, aiInPracticeZh, aiInPracticeJa };
