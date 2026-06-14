import type { DraftArticle } from './types';
import { healthBasicsEn } from './health-basics.en';
import { healthBasicsZh } from './health-basics.zh';
import { healthBasicsJa } from './health-basics.ja';
import { healthBasicsKo } from './health-basics.ko';
import { healthBasicsEs } from './health-basics.es';
import { healthBasicsFr } from './health-basics.fr';
import { healthBasicsDe } from './health-basics.de';
import { healthBasicsPt } from './health-basics.pt';
import { healthBasicsIt } from './health-basics.it';
import { healthBasicsRu } from './health-basics.ru';
import { healthBasicsAr } from './health-basics.ar';
import { healthBasicsHi } from './health-basics.hi';
import { healthBasicsTr } from './health-basics.tr';
import { healthBasicsVi } from './health-basics.vi';
import { healthBasicsTh } from './health-basics.th';

// Batch: Health & Nutrition Basics — quality-tier editorial cluster
// (9 topics × 15 langs). General health education, not medical advice. Not in
// content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=health-basics.
export const healthBasics: DraftArticle[] = [
  ...healthBasicsEn,
  ...healthBasicsZh,
  ...healthBasicsJa,
  ...healthBasicsKo,
  ...healthBasicsEs,
  ...healthBasicsFr,
  ...healthBasicsDe,
  ...healthBasicsPt,
  ...healthBasicsIt,
  ...healthBasicsRu,
  ...healthBasicsAr,
  ...healthBasicsHi,
  ...healthBasicsTr,
  ...healthBasicsVi,
  ...healthBasicsTh,
];

export {
  healthBasicsEn,
  healthBasicsZh,
  healthBasicsJa,
  healthBasicsKo,
  healthBasicsEs,
  healthBasicsFr,
  healthBasicsDe,
  healthBasicsPt,
  healthBasicsIt,
  healthBasicsRu,
  healthBasicsAr,
  healthBasicsHi,
  healthBasicsTr,
  healthBasicsVi,
  healthBasicsTh,
};
