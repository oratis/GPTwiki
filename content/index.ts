import type { DraftArticle } from './types';
import { scienceAndNature } from './science-and-nature';
import { historyAndSociety } from './history-and-society';
import { technologyAndMath } from './technology-and-math';
import { mindHealthEveryday } from './mind-health-everyday';
import { spaceAndAstronomy } from './space-and-astronomy';
import { artsLanguageCulture } from './arts-language-culture';
import { howThingsWork } from './how-things-work';

// All draft batches aggregated. Import { allDrafts } to seed them.
export const allDrafts: DraftArticle[] = [
  ...scienceAndNature,
  ...historyAndSociety,
  ...technologyAndMath,
  ...mindHealthEveryday,
  ...spaceAndAstronomy,
  ...artsLanguageCulture,
  ...howThingsWork,
];

export {
  scienceAndNature,
  historyAndSociety,
  technologyAndMath,
  mindHealthEveryday,
  spaceAndAstronomy,
  artsLanguageCulture,
  howThingsWork,
};
export type { DraftArticle };
