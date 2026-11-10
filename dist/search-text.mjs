// Search convenience only: never use this lossy key to merge historical people
// or rewrite names. Original labels, accents and scripts remain on the records.
export function normalizeSearch(value) {
  return String(value??'').normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase().replace(/\s+/g,' ').trim();
}
