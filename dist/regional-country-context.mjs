import {historicalContextFeatures} from './atlas-model.mjs';
import {CSHAPES_RANGE} from './cshapes-history.mjs';

// Annual country coding is not exhaustive coverage of earlier African states.
// Opt-in, finite reviewed regional references stay underneath annual units;
// this must never implicitly prolong every expired historical outline.
export function composeCountryPeriodContext(annual,historical,year){
 if(year<CSHAPES_RANGE.start||year>CSHAPES_RANGE.end)return annual;
 const eligible=historicalContextFeatures(historical.filter(f=>
  f.properties.sourceDataset==='historical-basemaps-regional-continuity'&&
  f.properties.countryPeriodSupplement===true),year);
 return eligible.length?[...eligible,...annual]:annual;
}
