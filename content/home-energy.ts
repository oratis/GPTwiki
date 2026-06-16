import type { DraftArticle } from './types';
import { homeEnergyEn } from './home-energy.en';
import { homeEnergyZh } from './home-energy.zh';

// Batch: Home & Energy — quality-tier editorial cluster (10 topics × en/zh).
// Big home-and-energy purchase decisions. Not in content/index.ts `allDrafts`;
// seed with scripts/seed-editorial.ts --batch=home-energy.
export const homeEnergy: DraftArticle[] = [...homeEnergyEn, ...homeEnergyZh];

export { homeEnergyEn, homeEnergyZh };
