import type { DraftArticle } from './types';
import { learningProductivityEn } from './learning-productivity.en';
import { learningProductivityZh } from './learning-productivity.zh';
import { learningProductivityJa } from './learning-productivity.ja';
import { learningProductivityKo } from './learning-productivity.ko';
import { learningProductivityEs } from './learning-productivity.es';
import { learningProductivityFr } from './learning-productivity.fr';
import { learningProductivityDe } from './learning-productivity.de';
import { learningProductivityPt } from './learning-productivity.pt';
import { learningProductivityIt } from './learning-productivity.it';
import { learningProductivityRu } from './learning-productivity.ru';
import { learningProductivityAr } from './learning-productivity.ar';
import { learningProductivityHi } from './learning-productivity.hi';
import { learningProductivityTr } from './learning-productivity.tr';
import { learningProductivityVi } from './learning-productivity.vi';
import { learningProductivityTh } from './learning-productivity.th';

// Batch: Learning & Productivity — quality-tier editorial cluster (10 topics × 15 langs).
// Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=learning-productivity.
export const learningProductivity: DraftArticle[] = [
  ...learningProductivityEn,
  ...learningProductivityZh,
  ...learningProductivityJa,
  ...learningProductivityKo,
  ...learningProductivityEs,
  ...learningProductivityFr,
  ...learningProductivityDe,
  ...learningProductivityPt,
  ...learningProductivityIt,
  ...learningProductivityRu,
  ...learningProductivityAr,
  ...learningProductivityHi,
  ...learningProductivityTr,
  ...learningProductivityVi,
  ...learningProductivityTh,
];

export {
  learningProductivityEn,
  learningProductivityZh,
  learningProductivityJa,
  learningProductivityKo,
  learningProductivityEs,
  learningProductivityFr,
  learningProductivityDe,
  learningProductivityPt,
  learningProductivityIt,
  learningProductivityRu,
  learningProductivityAr,
  learningProductivityHi,
  learningProductivityTr,
  learningProductivityVi,
  learningProductivityTh,
};
