import type { DraftArticle } from './types';
import { digitalSecurityEn } from './digital-security.en';
import { digitalSecurityZh } from './digital-security.zh';
import { digitalSecurityJa } from './digital-security.ja';
import { digitalSecurityKo } from './digital-security.ko';
import { digitalSecurityEs } from './digital-security.es';
import { digitalSecurityFr } from './digital-security.fr';
import { digitalSecurityDe } from './digital-security.de';
import { digitalSecurityPt } from './digital-security.pt';
import { digitalSecurityIt } from './digital-security.it';
import { digitalSecurityRu } from './digital-security.ru';
import { digitalSecurityAr } from './digital-security.ar';
import { digitalSecurityHi } from './digital-security.hi';
import { digitalSecurityTr } from './digital-security.tr';
import { digitalSecurityVi } from './digital-security.vi';
import { digitalSecurityTh } from './digital-security.th';

// Batch: Digital Privacy & Security — quality-tier editorial cluster
// (9 topics × 15 langs). Not registered in content/index.ts `allDrafts`
// (legacy seeders full-scan titles); seed with
// scripts/seed-editorial.ts --batch=digital-security.
export const digitalSecurity: DraftArticle[] = [
  ...digitalSecurityEn,
  ...digitalSecurityZh,
  ...digitalSecurityJa,
  ...digitalSecurityKo,
  ...digitalSecurityEs,
  ...digitalSecurityFr,
  ...digitalSecurityDe,
  ...digitalSecurityPt,
  ...digitalSecurityIt,
  ...digitalSecurityRu,
  ...digitalSecurityAr,
  ...digitalSecurityHi,
  ...digitalSecurityTr,
  ...digitalSecurityVi,
  ...digitalSecurityTh,
];

export {
  digitalSecurityEn,
  digitalSecurityZh,
  digitalSecurityJa,
  digitalSecurityKo,
  digitalSecurityEs,
  digitalSecurityFr,
  digitalSecurityDe,
  digitalSecurityPt,
  digitalSecurityIt,
  digitalSecurityRu,
  digitalSecurityAr,
  digitalSecurityHi,
  digitalSecurityTr,
  digitalSecurityVi,
  digitalSecurityTh,
};
