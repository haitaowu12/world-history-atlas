// Keep the pinned import immutable. Reviewed claims are a separate, inspectable layer.
const PERIOD_READINGS = {
  zhanguo:['zhou-dynasty'], qin:['qin-unification'],
  xihan:['han-dynasty'], donghan:['han-dynasty'],
  sanguo:['western-jin-dynasty'], xijin:['western-jin-dynasty'],
  dongjin:['eastern-jin-dynasty','northern-wei-dynasty'],
  nanbei:['northern-wei-dynasty','liu-song-dynasty','southern-qi-dynasty','liang-dynasty','chen-dynasty'],
  sui:['sui-reunification','grand-canal-network'], tang:['tang-dynasty'],
  beisong:['northern-song','liao-dynasty','jurchen-jin-dynasty','western-xia-dynasty'],
  nansong:['southern-song','jurchen-jin-dynasty','western-xia-dynasty'], yuan:['yuan-dynasty'],
  ming:['ming-dynasty'], qing:['qing-dynasty'],
  roc:['xinhai-revolution'], prc:['prc-proclamation','prc-political-period']
};

export function linkChinaContext(events, atlasRecords) {
  const available = new Set(atlasRecords.map(r => r.id));
  const atlasById = new Map(atlasRecords.map(r=>[r.id,r]));
  return events.map(record => ({...record, relatedIds:[...new Set([
    ...(record.relatedIds || []),
    ...(record.provenance?.periodIds || [record.provenance?.periodId]).flatMap(id => PERIOD_READINGS[id] || [])
      .filter(id=>{const target=atlasById.get(id);return target&&record.start<=target.end&&record.end>=target.start;})
  ])].filter(id => id !== record.id && available.has(id))}));
}

function sourcesWithReview(original, additions) {
  const result = [...(additions || []), ...(original || [])];
  return result.filter((source,index) => result.findIndex(s => s.url === source.url) === index);
}

export function applyChinaReviews(events, library, reviews) {
  if (reviews?.schemaVersion !== 1) throw new Error('Unsupported China review schema.');
  const eventIndex = new Map(events.map(r => [r.id,r]));
  const eventReviews = new Map();
  for (const review of reviews.eventReviews || []) {
    if (!eventIndex.has(review.id) || eventReviews.has(review.id)) throw new Error('Unknown or duplicate reviewed event: '+review.id);
    if (review.patch?.id || review.patch?.provenance || review.patch?.sources) throw new Error('Review cannot replace source identity: '+review.id);
    eventReviews.set(review.id,review);
  }
  const updatedEvents = events.map(record => {
    const review = eventReviews.get(record.id);
    if (!review) return record;
    return {...record,...structuredClone(review.patch || {}),sources:sourcesWithReview(record.sources,review.sources),
      provenance:{...record.provenance,status:'reviewed',reviewedAt:reviews.reviewedAt,
        reviewScope:review.note,note:review.note,
        originalText:record.provenance?.originalText || {title:record.title,summary:record.summary},
        originalRecord:{start:record.start,end:record.end,location:record.location,dateNote:record.dateNote},
        reviewSources:review.sources}};
  });
  const reviewKeys = new Set(), stopReviews = new Map();
  for (const review of reviews.chronicleReviews || []) {
    const journey = (library.journeys || []).find(j => j.id === review.journeyId);
    const key = review.journeyId+'/'+review.stopId;
    if (!journey?.stops.some(s => s.id === review.stopId) || reviewKeys.has(key)) throw new Error('Unknown or duplicate reviewed chronicle stop: '+key);
    if (review.patch?.id || review.patch?.personalPresenceVerified || review.patch?.sourceIndex) throw new Error('Review cannot replace source identity or assert presence: '+key);
    reviewKeys.add(key);stopReviews.set(key,review);
  }
  const updatedLibrary = {...library,journeys:(library.journeys || []).map(journey => ({...journey,
    stops:journey.stops.map(stop => {
      const review = stopReviews.get(journey.id+'/'+stop.id);
      if (!review) return stop;
      return {...stop,...structuredClone(review.patch || {}),
        review:{status:'annotated',reviewedAt:reviews.reviewedAt,note:review.note,sources:review.sources,
          original:{year:stop.year,title:stop.title,description:stop.description,quotation:stop.quotation}}};
    })
  }))};
  return {events:updatedEvents,library:updatedLibrary};
}
