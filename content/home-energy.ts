import type { DraftArticle } from './types';
import { homeEnergyEn } from './home-energy.en';
import { homeEnergyZh } from './home-energy.zh';
import { homeEnergyJa } from './home-energy.ja';
import { homeEnergyKo } from './home-energy.ko';
import { homeEnergyEs } from './home-energy.es';
import { homeEnergyFr } from './home-energy.fr';
import { homeEnergyDe } from './home-energy.de';
import { homeEnergyPt } from './home-energy.pt';
import { homeEnergyIt } from './home-energy.it';
import { homeEnergyRu } from './home-energy.ru';
import { homeEnergyAr } from './home-energy.ar';
import { homeEnergyHi } from './home-energy.hi';
import { homeEnergyTr } from './home-energy.tr';
import { homeEnergyVi } from './home-energy.vi';
import { homeEnergyTh } from './home-energy.th';

// Batch: Home & Energy — quality-tier editorial cluster (10 topics × 15 langs).
// Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=home-energy.
export const homeEnergy: DraftArticle[] = [
  ...homeEnergyEn,
  ...homeEnergyZh,
  ...homeEnergyJa,
  ...homeEnergyKo,
  ...homeEnergyEs,
  ...homeEnergyFr,
  ...homeEnergyDe,
  ...homeEnergyPt,
  ...homeEnergyIt,
  ...homeEnergyRu,
  ...homeEnergyAr,
  ...homeEnergyHi,
  ...homeEnergyTr,
  ...homeEnergyVi,
  ...homeEnergyTh,
];

export {
  homeEnergyEn,
  homeEnergyZh,
  homeEnergyJa,
  homeEnergyKo,
  homeEnergyEs,
  homeEnergyFr,
  homeEnergyDe,
  homeEnergyPt,
  homeEnergyIt,
  homeEnergyRu,
  homeEnergyAr,
  homeEnergyHi,
  homeEnergyTr,
  homeEnergyVi,
  homeEnergyTh,
};
