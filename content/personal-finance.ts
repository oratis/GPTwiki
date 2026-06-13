import type { DraftArticle } from './types';
import { personalFinanceEn } from './personal-finance.en';
import { personalFinanceZh } from './personal-finance.zh';
import { personalFinanceJa } from './personal-finance.ja';
import { personalFinanceKo } from './personal-finance.ko';
import { personalFinanceEs } from './personal-finance.es';
import { personalFinanceFr } from './personal-finance.fr';
import { personalFinanceDe } from './personal-finance.de';

// Batch: Personal Finance — quality-tier editorial cluster (12 topics × 7 langs).
// Not registered in content/index.ts `allDrafts` (legacy seeders full-scan
// titles); seed with scripts/seed-editorial.ts --batch=personal-finance.
export const personalFinance: DraftArticle[] = [
  ...personalFinanceEn,
  ...personalFinanceZh,
  ...personalFinanceJa,
  ...personalFinanceKo,
  ...personalFinanceEs,
  ...personalFinanceFr,
  ...personalFinanceDe,
];

export {
  personalFinanceEn,
  personalFinanceZh,
  personalFinanceJa,
  personalFinanceKo,
  personalFinanceEs,
  personalFinanceFr,
  personalFinanceDe,
};
