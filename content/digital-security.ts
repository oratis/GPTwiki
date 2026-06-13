import type { DraftArticle } from './types';
import { digitalSecurityEn } from './digital-security.en';
import { digitalSecurityZh } from './digital-security.zh';
import { digitalSecurityJa } from './digital-security.ja';
import { digitalSecurityKo } from './digital-security.ko';
import { digitalSecurityEs } from './digital-security.es';
import { digitalSecurityFr } from './digital-security.fr';
import { digitalSecurityDe } from './digital-security.de';

// Batch: Digital Privacy & Security — quality-tier editorial cluster
// (9 topics × en/zh). Not registered in content/index.ts `allDrafts`
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
];

export {
  digitalSecurityEn,
  digitalSecurityZh,
  digitalSecurityJa,
  digitalSecurityKo,
  digitalSecurityEs,
  digitalSecurityFr,
  digitalSecurityDe,
};
