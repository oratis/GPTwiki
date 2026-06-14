import type { DraftArticle } from './types';
import { careersWorkEn } from './careers-work.en';
import { careersWorkZh } from './careers-work.zh';
import { careersWorkJa } from './careers-work.ja';
import { careersWorkKo } from './careers-work.ko';
import { careersWorkEs } from './careers-work.es';
import { careersWorkFr } from './careers-work.fr';
import { careersWorkDe } from './careers-work.de';
import { careersWorkPt } from './careers-work.pt';
import { careersWorkIt } from './careers-work.it';
import { careersWorkRu } from './careers-work.ru';
import { careersWorkAr } from './careers-work.ar';
import { careersWorkHi } from './careers-work.hi';
import { careersWorkTr } from './careers-work.tr';
import { careersWorkVi } from './careers-work.vi';
import { careersWorkTh } from './careers-work.th';

// Batch: Careers & Job-Hunting — quality-tier editorial cluster (10 topics × 15 langs).
// Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=careers-work.
export const careersWork: DraftArticle[] = [
  ...careersWorkEn,
  ...careersWorkZh,
  ...careersWorkJa,
  ...careersWorkKo,
  ...careersWorkEs,
  ...careersWorkFr,
  ...careersWorkDe,
  ...careersWorkPt,
  ...careersWorkIt,
  ...careersWorkRu,
  ...careersWorkAr,
  ...careersWorkHi,
  ...careersWorkTr,
  ...careersWorkVi,
  ...careersWorkTh,
];

export {
  careersWorkEn,
  careersWorkZh,
  careersWorkJa,
  careersWorkKo,
  careersWorkEs,
  careersWorkFr,
  careersWorkDe,
  careersWorkPt,
  careersWorkIt,
  careersWorkRu,
  careersWorkAr,
  careersWorkHi,
  careersWorkTr,
  careersWorkVi,
  careersWorkTh,
};
