import type { DraftArticle } from './types';
import { devPracticesEn } from './dev-practices.en';
import { devPracticesZh } from './dev-practices.zh';
import { devPracticesJa } from './dev-practices.ja';
import { devPracticesKo } from './dev-practices.ko';
import { devPracticesEs } from './dev-practices.es';
import { devPracticesFr } from './dev-practices.fr';
import { devPracticesDe } from './dev-practices.de';

// Batch: Programming & Development — quality-tier editorial cluster
// (9 topics × 7 langs). Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=dev-practices.
export const devPractices: DraftArticle[] = [
  ...devPracticesEn,
  ...devPracticesZh,
  ...devPracticesJa,
  ...devPracticesKo,
  ...devPracticesEs,
  ...devPracticesFr,
  ...devPracticesDe,
];

export {
  devPracticesEn,
  devPracticesZh,
  devPracticesJa,
  devPracticesKo,
  devPracticesEs,
  devPracticesFr,
  devPracticesDe,
};
