import type { DraftArticle } from './types';
import { personalFinanceEn } from './personal-finance.en';
import { personalFinanceZh } from './personal-finance.zh';

// Batch: Personal Finance — quality-tier editorial cluster (12 topics × en/zh).
// Not registered in content/index.ts `allDrafts` (legacy seeders full-scan
// titles); seed with scripts/seed-editorial.ts --batch=personal-finance.
export const personalFinance: DraftArticle[] = [...personalFinanceEn, ...personalFinanceZh];

export { personalFinanceEn, personalFinanceZh };
