import type { DraftArticle } from './types';
import { aiInPracticeEn } from './ai-in-practice.en';
import { aiInPracticeZh } from './ai-in-practice.zh';
import { aiInPracticeJa } from './ai-in-practice.ja';
import { aiInPracticeKo } from './ai-in-practice.ko';
import { aiInPracticeEs } from './ai-in-practice.es';
import { aiInPracticeFr } from './ai-in-practice.fr';
import { aiInPracticeDe } from './ai-in-practice.de';

// Batch: AI in Practice — quality-tier editorial cluster (10 topics × en/zh).
// Deliberately NOT registered in content/index.ts `allDrafts`: the legacy
// seeders (src/app/api/seed, scripts/seed-drafts.ts) de-dup by reading every
// existing title, which is unusable at the current corpus size. Seed this
// batch with scripts/seed-editorial.ts instead.
export const aiInPractice: DraftArticle[] = [
  ...aiInPracticeEn,
  ...aiInPracticeZh,
  ...aiInPracticeJa,
  ...aiInPracticeKo,
  ...aiInPracticeEs,
  ...aiInPracticeFr,
  ...aiInPracticeDe,
];

export {
  aiInPracticeEn,
  aiInPracticeZh,
  aiInPracticeJa,
  aiInPracticeKo,
  aiInPracticeEs,
  aiInPracticeFr,
  aiInPracticeDe,
};
