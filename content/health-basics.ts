import type { DraftArticle } from './types';
import { healthBasicsEn } from './health-basics.en';
import { healthBasicsZh } from './health-basics.zh';

// Batch: Health & Nutrition Basics — quality-tier editorial cluster
// (10 topics × en/zh). General health education, not medical advice. Not in
// content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=health-basics.
export const healthBasics: DraftArticle[] = [...healthBasicsEn, ...healthBasicsZh];

export { healthBasicsEn, healthBasicsZh };
