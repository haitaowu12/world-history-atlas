// One source manifest feeds the map, search, People and editorial audit.
// Structural coverage is not a certification of historical claims or borders.
export function partitionExpansion(records) {
  return {histories:records.filter(r=>r.kind!=='person'),people:records.filter(r=>r.kind==='person')};
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
    if(![1,2,3].includes(r.expansion?.release))errors.push(r.id+': invalid editorial release');
    if(typeof r.expansion?.sourceReview!=='string'||!r.expansion.sourceReview.trim())errors.push(r.id+': source-review disclosure missing');
    for(const id of r.relatedIds||[])if(!ids.has(id)||id===r.id)errors.push(r.id+': broken related entry '+id);
    if(r.timeline&&r.kind!=='polity')errors.push(r.id+': only political overviews may enter the political timeline');
    if(r.kind==='person'&&(!r.name?.en||!r.name?.zh||(r.milestones?.length||0)<2))errors.push(r.id+': incomplete full biography');
    for(const s of r.sources||[])if(!s.evidenceNote?.trim()||!s.checkedAt)errors.push(r.id+': source evidence/date missing');
  }
  for(const s of manifest.workstreams||[])if(!records.some(r=>r.expansion?.workstreams?.includes(s.id))&&s.status!=='review-layer')errors.push(s.id+': empty expansion workstream');
  return errors;
}
