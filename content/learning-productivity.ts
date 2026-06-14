import type { DraftArticle } from './types';
import { learningProductivityEn } from './learning-productivity.en';
import { learningProductivityZh } from './learning-productivity.zh';

// Batch: Learning & Productivity — quality-tier editorial cluster (10 topics × en/zh).
// New topic vertical (evidence-based study + focus habits). Not in
// content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=learning-productivity.
export const learningProductivity: DraftArticle[] = [
  ...learningProductivityEn,
  ...learningProductivityZh,
];

export { learningProductivityEn, learningProductivityZh };
