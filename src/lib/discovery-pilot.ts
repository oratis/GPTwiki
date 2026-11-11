import pilot from './discovery-pilot.json';

export const pilotEditions = pilot.flatMap(topic =>
  topic.editions.map(edition => ({ ...edition, reference: topic.reference }))
);

export function findPilotEdition(article: { id: string; title?: string; source?: string; language?: string }) {
  return pilotEditions.find(edition =>
    edition.id === article.id && edition.title === article.title &&
    edition.source === article.source && edition.language === article.language
  );
}
