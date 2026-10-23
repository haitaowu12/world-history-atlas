import {readFileSync} from 'node:fs';

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
