import type { DraftArticle } from './types';
import { digitalSecurityEn } from './digital-security.en';
import { digitalSecurityZh } from './digital-security.zh';

// Batch: Digital Privacy & Security — quality-tier editorial cluster
// (9 topics × en/zh). Not registered in content/index.ts `allDrafts`
// (legacy seeders full-scan titles); seed with
// scripts/seed-editorial.ts --batch=digital-security.
export const digitalSecurity: DraftArticle[] = [...digitalSecurityEn, ...digitalSecurityZh];

export { digitalSecurityEn, digitalSecurityZh };
