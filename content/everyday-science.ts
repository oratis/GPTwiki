import type { DraftArticle } from './types';
import { everydayScienceEn } from './everyday-science.en';
import { everydayScienceZh } from './everyday-science.zh';
import { everydayScienceJa } from './everyday-science.ja';
import { everydayScienceKo } from './everyday-science.ko';
import { everydayScienceEs } from './everyday-science.es';
import { everydayScienceFr } from './everyday-science.fr';
import { everydayScienceDe } from './everyday-science.de';
import { everydaySciencePt } from './everyday-science.pt';
import { everydayScienceIt } from './everyday-science.it';
import { everydayScienceRu } from './everyday-science.ru';
import { everydayScienceAr } from './everyday-science.ar';
import { everydayScienceHi } from './everyday-science.hi';
import { everydayScienceTr } from './everyday-science.tr';
import { everydayScienceVi } from './everyday-science.vi';
import { everydayScienceTh } from './everyday-science.th';

// Batch: Everyday Science — quality-tier editorial cluster (10 topics × 15 langs).
// Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=everyday-science.
export const everydayScience: DraftArticle[] = [
  ...everydayScienceEn,
  ...everydayScienceZh,
  ...everydayScienceJa,
  ...everydayScienceKo,
  ...everydayScienceEs,
  ...everydayScienceFr,
  ...everydayScienceDe,
  ...everydaySciencePt,
  ...everydayScienceIt,
  ...everydayScienceRu,
  ...everydayScienceAr,
  ...everydayScienceHi,
  ...everydayScienceTr,
  ...everydayScienceVi,
  ...everydayScienceTh,
];

export {
  everydayScienceEn,
  everydayScienceZh,
  everydayScienceJa,
  everydayScienceKo,
  everydayScienceEs,
  everydayScienceFr,
  everydayScienceDe,
  everydaySciencePt,
  everydayScienceIt,
  everydayScienceRu,
  everydayScienceAr,
  everydayScienceHi,
  everydayScienceTr,
  everydayScienceVi,
  everydayScienceTh,
};
