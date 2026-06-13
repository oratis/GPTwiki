import type { DraftArticle } from './types';
import { devPracticesEn } from './dev-practices.en';
import { devPracticesZh } from './dev-practices.zh';

// Batch: Programming & Development — quality-tier editorial cluster
// (10 topics × en/zh). Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=dev-practices.
export const devPractices: DraftArticle[] = [...devPracticesEn, ...devPracticesZh];

export { devPracticesEn, devPracticesZh };
