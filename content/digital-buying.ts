import type { DraftArticle } from './types';
import { digitalBuyingEn } from './digital-buying.en';
import { digitalBuyingZh } from './digital-buying.zh';

// Batch: Digital Buying Decisions — quality-tier editorial cluster
// (10 topics × en/zh). Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=digital-buying.
export const digitalBuying: DraftArticle[] = [...digitalBuyingEn, ...digitalBuyingZh];

export { digitalBuyingEn, digitalBuyingZh };
