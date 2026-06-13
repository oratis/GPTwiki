import type { DraftArticle } from './types';
import { devPracticesEn } from './dev-practices.en';
import { devPracticesZh } from './dev-practices.zh';
import { devPracticesJa } from './dev-practices.ja';
import { devPracticesKo } from './dev-practices.ko';
import { devPracticesEs } from './dev-practices.es';
import { devPracticesFr } from './dev-practices.fr';
import { devPracticesDe } from './dev-practices.de';
import { devPracticesPt } from './dev-practices.pt';
import { devPracticesIt } from './dev-practices.it';
import { devPracticesRu } from './dev-practices.ru';
import { devPracticesAr } from './dev-practices.ar';
import { devPracticesHi } from './dev-practices.hi';
import { devPracticesTr } from './dev-practices.tr';
import { devPracticesVi } from './dev-practices.vi';
import { devPracticesTh } from './dev-practices.th';

// Batch: Programming & Development — quality-tier editorial cluster
// (9 topics × 15 langs). Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=dev-practices.
export const devPractices: DraftArticle[] = [
  ...devPracticesEn,
  ...devPracticesZh,
  ...devPracticesJa,
  ...devPracticesKo,
  ...devPracticesEs,
  ...devPracticesFr,
  ...devPracticesDe,
  ...devPracticesPt,
  ...devPracticesIt,
  ...devPracticesRu,
  ...devPracticesAr,
  ...devPracticesHi,
  ...devPracticesTr,
  ...devPracticesVi,
  ...devPracticesTh,
];

export {
  devPracticesEn,
  devPracticesZh,
  devPracticesJa,
  devPracticesKo,
  devPracticesEs,
  devPracticesFr,
  devPracticesDe,
  devPracticesPt,
  devPracticesIt,
  devPracticesRu,
  devPracticesAr,
  devPracticesHi,
  devPracticesTr,
  devPracticesVi,
  devPracticesTh,
};
