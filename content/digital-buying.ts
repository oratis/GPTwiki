import type { DraftArticle } from './types';
import { digitalBuyingEn } from './digital-buying.en';
import { digitalBuyingZh } from './digital-buying.zh';
import { digitalBuyingJa } from './digital-buying.ja';
import { digitalBuyingKo } from './digital-buying.ko';
import { digitalBuyingEs } from './digital-buying.es';
import { digitalBuyingFr } from './digital-buying.fr';
import { digitalBuyingDe } from './digital-buying.de';

// Batch: Digital Buying Decisions — quality-tier editorial cluster
// (10 topics × 7 langs). Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=digital-buying.
export const digitalBuying: DraftArticle[] = [
  ...digitalBuyingEn,
  ...digitalBuyingZh,
  ...digitalBuyingJa,
  ...digitalBuyingKo,
  ...digitalBuyingEs,
  ...digitalBuyingFr,
  ...digitalBuyingDe,
];

export {
  digitalBuyingEn,
  digitalBuyingZh,
  digitalBuyingJa,
  digitalBuyingKo,
  digitalBuyingEs,
  digitalBuyingFr,
  digitalBuyingDe,
};
