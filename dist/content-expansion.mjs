// One source manifest feeds the map, search, People and editorial audit.
// Structural coverage is not a certification of historical claims or borders.
export const CONTENT_MANIFEST = 'content-expansion-v13.json';

export function partitionExpansion(records) {
  return {histories:records.filter(r=>r.kind!=='person'),people:records.filter(r=>r.kind==='person')};
}

// Source-only follow-ups preserve released narrative files and the prior review scope.
export function applyEvidenceReviews(records,reviews=[]) {
  const byId=new Map(records.map(r=>[r.id,r])),seen=new Set();
  for(const review of reviews) {
    const row=byId.get(review.recordId);
    if(!row||seen.has(review.recordId))throw Error('Unknown or duplicate evidence-review target '+review.recordId);
    seen.add(review.recordId);
    if(!review.checkedAt||!review.note?.en||!review.note?.zh||!review.reviewLimit?.en||!review.reviewLimit?.zh||!review.sources?.length)throw Error(review.recordId+': incomplete evidence follow-up');
    const urls=new Set(row.sources.map(s=>s.url));
    for(const source of review.sources) {
      let url;try{url=new URL(source.url);}catch{throw Error(review.recordId+': invalid follow-up source URL');}
      if(url.protocol!=='https:'||url.username||url.password||urls.has(source.url)||!source.title||!source.publisher||!source.evidenceNote||!source.checkedAt||!source.retrieval)throw Error(review.recordId+': invalid or duplicate follow-up source');
      urls.add(source.url);
    }
    byId.set(row.id,{...row,sources:[...row.sources,...review.sources],
      expansion:{...row.expansion,reviewLimit:review.reviewLimit},
      evidenceReviews:[...(row.evidenceReviews||[]),{checkedAt:review.checkedAt,note:review.note,previousReviewLimit:row.expansion?.reviewLimit,addedSourceURLs:review.sources.map(s=>s.url)}]});
  }
  return records.map(r=>byId.get(r.id));
}

export function expansionCoverage(records, workstreams=[]) {
  return workstreams.map(stream=>{
    const rows=records.filter(r=>r.expansion?.workstreams?.includes(stream.id));
    return {...stream,recordIds:rows.map(r=>r.id),records:rows.length,
      biographies:rows.filter(r=>r.kind==='person').length,
      politicalOverviews:rows.filter(r=>r.kind==='polity').length,
      sourceURLs:[...new Set(rows.flatMap(r=>r.sources.map(s=>s.url)))]};
  });
}

export function auditExpansion(records, manifest, allRecords=records) {
  const errors=[], ids=new Set(allRecords.map(r=>r.id));
  const streams=new Set((manifest.workstreams||[]).map(s=>s.id));
  for(const r of records) {
    if(!r.expansion?.workstreams?.length||r.expansion.workstreams.some(id=>!streams.has(id)))errors.push(r.id+': unknown or missing content workstream');
    if(![1,2,3,4,5,6,7].includes(r.expansion?.release))errors.push(r.id+': invalid editorial release');
    if(typeof r.expansion?.sourceReview!=='string'||!r.expansion.sourceReview.trim())errors.push(r.id+': source-review disclosure missing');
    for(const id of r.relatedIds||[])if(!ids.has(id)||id===r.id)errors.push(r.id+': broken related entry '+id);
    if(r.timeline&&r.kind!=='polity')errors.push(r.id+': only political overviews may enter the political timeline');
    if(r.kind==='person'&&(!r.name?.en||!r.name?.zh||(r.milestones?.length||0)<2))errors.push(r.id+': incomplete full biography');
    for(const s of r.sources||[])if(!s.evidenceNote?.trim()||!s.checkedAt)errors.push(r.id+': source evidence/date missing');
    if(r.expansion?.release>=4) {
      const edition=({4:'v10',5:'v11',6:'v12',7:'v13'})[r.expansion.release];
      if(r.expansion.edition!==edition)errors.push(r.id+': missing '+edition.toUpperCase()+' edition');
      if((r.relatedIds?.length||0)<2)errors.push(r.id+': current entry needs connected reading');
      if(!r.expansion.reviewLimit?.en||!r.expansion.reviewLimit?.zh)errors.push(r.id+': missing bilingual review scope');
      if((r.sources||[]).some(s=>!s.retrieval))errors.push(r.id+': missing source access disclosure');
      if(r.kind==='person') {
        if((r.milestones?.length||0)<3)errors.push(r.id+': current biography needs at least three supported milestones');
        for(const [i,m] of (r.milestones||[]).entries()) {
          if(m.year<r.start||m.year>r.end||(i>0&&m.year<r.milestones[i-1].year))errors.push(r.id+': biography milestones outside focus or out of order');
          if(!m.location?.label)errors.push(r.id+': milestone place meaning missing');
        }
      }
    }
  }
  for(const s of manifest.workstreams||[])if(!records.some(r=>r.expansion?.workstreams?.includes(s.id))&&s.status!=='review-layer')errors.push(s.id+': empty expansion workstream');
  return errors;
}
