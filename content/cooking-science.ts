import type { DraftArticle } from './types';
import { cookingScienceEn } from './cooking-science.en';
import { cookingScienceZh } from './cooking-science.zh';
import { cookingScienceJa } from './cooking-science.ja';
import { cookingScienceKo } from './cooking-science.ko';
import { cookingScienceEs } from './cooking-science.es';
import { cookingScienceFr } from './cooking-science.fr';
import { cookingScienceDe } from './cooking-science.de';
import { cookingSciencePt } from './cooking-science.pt';
import { cookingScienceIt } from './cooking-science.it';
import { cookingScienceRu } from './cooking-science.ru';
import { cookingScienceAr } from './cooking-science.ar';
import { cookingScienceHi } from './cooking-science.hi';
import { cookingScienceTr } from './cooking-science.tr';
import { cookingScienceVi } from './cooking-science.vi';
import { cookingScienceTh } from './cooking-science.th';

// Batch: Cooking Science — quality-tier editorial cluster (10 topics × 15 langs).
// Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=cooking-science.
export const cookingScience: DraftArticle[] = [
  ...cookingScienceEn,
  ...cookingScienceZh,
  ...cookingScienceJa,
  ...cookingScienceKo,
  ...cookingScienceEs,
  ...cookingScienceFr,
  ...cookingScienceDe,
  ...cookingSciencePt,
  ...cookingScienceIt,
  ...cookingScienceRu,
  ...cookingScienceAr,
  ...cookingScienceHi,
  ...cookingScienceTr,
  ...cookingScienceVi,
  ...cookingScienceTh,
];

export {
  cookingScienceEn,
  cookingScienceZh,
  cookingScienceJa,
  cookingScienceKo,
  cookingScienceEs,
  cookingScienceFr,
  cookingScienceDe,
  cookingSciencePt,
  cookingScienceIt,
  cookingScienceRu,
  cookingScienceAr,
  cookingScienceHi,
  cookingScienceTr,
  cookingScienceVi,
  cookingScienceTh,
};
