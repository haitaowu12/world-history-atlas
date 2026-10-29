import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const read = file => JSON.parse(readFileSync(new URL(`../dist/data/${file}`, import.meta.url), 'utf8'));
const collection = layers => ({
  type: 'FeatureCollection',
  features: layers.flatMap(layer => read(layer.file).features),
});

// Geometry files may be split into transport-sized chunks. Tests discover all
// parts through the same public manifests instead of relying on one filename.
export const historicalMetadata = read('map-snapshots.json');
export const historicalCollection = collection(historicalMetadata.layers);
export const contemporaryMetadata = read('contemporary-world.json');
export const contemporaryCollection = collection(contemporaryMetadata.layers.filter(layer => layer.role === 'countries'));
export const disputedLines = collection(contemporaryMetadata.layers.filter(layer => layer.role === 'disputed-lines'));
export const disputedAreas = collection(contemporaryMetadata.layers.filter(layer => layer.role === 'disputed-areas'));

// The narrative baselines predate the rights review. Compare against the
// archived manifest while explicitly allowing only the reviewed replacement.
export function assertHistoricalManifestBeforeBoundaryReview(expectedDigest, assert) {
  const previousBytes=readFileSync(new URL('../docs/MAP_SNAPSHOTS_BEFORE_BOUNDARY_RIGHTS_2026_10_28.json',import.meta.url));
  assert.equal(createHash('sha256').update(previousBytes).digest('hex'),expectedDigest);
  const previous=JSON.parse(previousBytes);
  for(const layer of previous.layers){
    if(layer.file==='territories-jiangshan.geojson'){
      assert.ok(!historicalMetadata.layers.some(current=>current.file===layer.file));
    } else {
      assert.deepEqual(historicalMetadata.layers.find(current=>current.file===layer.file),layer);
    }
  }
  const removed=new Set(['1200-southern-song','1200-jin-jurchen','1600-ming']);
  const added=new Set(historicalCollection.features.filter(f=>['historical-basemaps-china-review','remsen-warring-250','kiu-song-jin-1141','herrmann-ming-1415'].includes(f.properties.sourceDataset)).map(f=>f.properties.id));
  for(const old of previous.snapshots){
    const current=historicalMetadata.snapshots.find(s=>s.year===old.year);assert.ok(current);
    const priorIds=old.featureIds.filter(id=>!removed.has(id));
    assert.deepEqual(current.featureIds.filter(id=>!added.has(id)),priorIds);
  }
}
