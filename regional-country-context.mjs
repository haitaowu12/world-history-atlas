import {historicalContextFeatures} from './atlas-model.mjs?v=30';
import {CSHAPES_RANGE} from './cshapes-history.mjs';

// Annual country coding is not exhaustive coverage of earlier African states.
// Opt-in, finite reviewed regional references stay underneath annual units;
// this must never implicitly prolong every expired historical outline.
export function composeCountryPeriodContext(annual,historical,year){
 if(year<CSHAPES_RANGE.start||year>CSHAPES_RANGE.end)return annual;
 const permitted=new Set(['historical-basemaps-regional-continuity','hiribarren-borno-regional-context']);
 const eligible=historicalContextFeatures(historical.filter(f=>
  permitted.has(f.properties.sourceDataset)&&f.properties.countryPeriodSupplement===true),year);
 if(!eligible.length)return annual;
 // Certain reviewed regional references explicitly expose overlap with annual
 // administrative units, rather than letting the latter hide local history.
 const underneath=eligible.filter(f=>!f.properties.displayAboveAnnual),overlap=eligible.filter(f=>f.properties.displayAboveAnnual);
 return [...underneath,...annual,...overlap];
}
