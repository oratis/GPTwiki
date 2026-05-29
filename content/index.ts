import type { DraftArticle } from './types';
import { scienceAndNature } from './science-and-nature';
import { historyAndSociety } from './history-and-society';
import { technologyAndMath } from './technology-and-math';
import { mindHealthEveryday } from './mind-health-everyday';

// All draft batches aggregated. Import { allDrafts } to seed them.
export const allDrafts: DraftArticle[] = [
  ...scienceAndNature,
  ...historyAndSociety,
  ...technologyAndMath,
  ...mindHealthEveryday,
];

export { scienceAndNature, historyAndSociety, technologyAndMath, mindHealthEveryday };
export type { DraftArticle };
