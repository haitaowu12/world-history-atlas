// Additive discovery and independently written evidence; frozen imports stay intact.
import {applyChinaReviews} from './china-review.mjs';

export function applySearchUpdate(library, update) {
  if (update?.schemaVersion !== 1) throw Error('Unsupported search update');
  const patches = new Map();
  for (const row of update.rows) {
    const target = library.gazetteer.find(place => place.id === row.id);
    if (!target || patches.has(row.id) || target.name.zh !== row.name ||
        JSON.stringify(target.coord) !== JSON.stringify(row.coord) ||
        target.sourceRecord.path !== row.sourcePointer ||
        !row.aliases.every(alias => typeof alias === 'string' && /^[a-z0-9]+$/.test(alias)))
      throw Error('Search update identity mismatch: '+row.id);
    patches.set(row.id,row);
  }
  return {...library,gazetteer:library.gazetteer.map(place => {
    const patch = patches.get(place.id);
    return patch ? {...place,aliases:[...new Set([...(place.aliases||[]),...patch.aliases])],
      aliasSource:{...update.source,sourcePointer:patch.sourcePointer}} : place;
  })};
}

export function applyReviewedUpdate(events, people, library, update) {
  if (update?.schemaVersion !== 1) throw Error('Unsupported evidence update');
  const reviewed = applyChinaReviews(events,library,{
    schemaVersion:1,reviewedAt:update.checkedAt,eventReviews:update.eventReviews,chronicleReviews:[]
  });
  const supplements = new Map();
  for (const row of update.personSupplements) {
    if (!people.some(person => person.id === row.id) || supplements.has(row.id))
      throw Error('Unknown or duplicate biography supplement: '+row.id);
    supplements.set(row.id,row);
  }
  return {...reviewed,people:people.map(person => {
    const supplement = supplements.get(person.id);
    if (!supplement) return person;
    return {...person,keyFacts:Object.fromEntries(['en','zh'].map(lang=>[lang,
      [...(person.keyFacts?.[lang]||[]),...supplement.keyFacts[lang]]])),
      sources:[...supplement.sources,...person.sources].filter((source,i,all)=>all.findIndex(other=>other.url===source.url)===i),
      sourceSupplement:{checkedAt:update.checkedAt,upstreamLead:update.upstreamCommit}};
  })};
}
