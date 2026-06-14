import type { DraftArticle } from './types';
import { digitalBuyingEn } from './digital-buying.en';
import { digitalBuyingZh } from './digital-buying.zh';
import { digitalBuyingJa } from './digital-buying.ja';
import { digitalBuyingKo } from './digital-buying.ko';
import { digitalBuyingEs } from './digital-buying.es';
import { digitalBuyingFr } from './digital-buying.fr';
import { digitalBuyingDe } from './digital-buying.de';
import { digitalBuyingPt } from './digital-buying.pt';
import { digitalBuyingIt } from './digital-buying.it';
import { digitalBuyingRu } from './digital-buying.ru';
import { digitalBuyingAr } from './digital-buying.ar';
import { digitalBuyingHi } from './digital-buying.hi';
import { digitalBuyingTr } from './digital-buying.tr';
import { digitalBuyingVi } from './digital-buying.vi';
import { digitalBuyingTh } from './digital-buying.th';

// Batch: Digital Buying Decisions — quality-tier editorial cluster
// (10 topics × 15 langs). Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=digital-buying.
export const digitalBuying: DraftArticle[] = [
  ...digitalBuyingEn,
  ...digitalBuyingZh,
  ...digitalBuyingJa,
  ...digitalBuyingKo,
  ...digitalBuyingEs,
  ...digitalBuyingFr,
  ...digitalBuyingDe,
  ...digitalBuyingPt,
  ...digitalBuyingIt,
  ...digitalBuyingRu,
  ...digitalBuyingAr,
  ...digitalBuyingHi,
  ...digitalBuyingTr,
  ...digitalBuyingVi,
  ...digitalBuyingTh,
];

export {
  digitalBuyingEn,
  digitalBuyingZh,
  digitalBuyingJa,
  digitalBuyingKo,
  digitalBuyingEs,
  digitalBuyingFr,
  digitalBuyingDe,
  digitalBuyingPt,
  digitalBuyingIt,
  digitalBuyingRu,
  digitalBuyingAr,
  digitalBuyingHi,
  digitalBuyingTr,
  digitalBuyingVi,
  digitalBuyingTh,
};
