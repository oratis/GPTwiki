import type { DraftArticle } from './types';
import { personalFinanceEn } from './personal-finance.en';
import { personalFinanceZh } from './personal-finance.zh';
import { personalFinanceJa } from './personal-finance.ja';
import { personalFinanceKo } from './personal-finance.ko';
import { personalFinanceEs } from './personal-finance.es';
import { personalFinanceFr } from './personal-finance.fr';
import { personalFinanceDe } from './personal-finance.de';
import { personalFinancePt } from './personal-finance.pt';
import { personalFinanceIt } from './personal-finance.it';
import { personalFinanceRu } from './personal-finance.ru';
import { personalFinanceAr } from './personal-finance.ar';
import { personalFinanceHi } from './personal-finance.hi';
import { personalFinanceTr } from './personal-finance.tr';
import { personalFinanceVi } from './personal-finance.vi';
import { personalFinanceTh } from './personal-finance.th';

// Batch: Personal Finance — quality-tier editorial cluster (12 topics × 15 langs).
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
  ...personalFinancePt,
  ...personalFinanceIt,
  ...personalFinanceRu,
  ...personalFinanceAr,
  ...personalFinanceHi,
  ...personalFinanceTr,
  ...personalFinanceVi,
  ...personalFinanceTh,
];

export {
  personalFinanceEn,
  personalFinanceZh,
  personalFinanceJa,
  personalFinanceKo,
  personalFinanceEs,
  personalFinanceFr,
  personalFinanceDe,
  personalFinancePt,
  personalFinanceIt,
  personalFinanceRu,
  personalFinanceAr,
  personalFinanceHi,
  personalFinanceTr,
  personalFinanceVi,
  personalFinanceTh,
};
