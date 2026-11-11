import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {imageDimensions} from '../scripts/lib/image-dimensions.mjs';
const read=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');
const primary='https://world-history-atlas-guide.web.app/';
test('canonical and social metadata identify the existing Firebase primary',()=>{
 const html=read('dist/index.html');
 assert.equal((html.match(/<link rel="canonical"/g)||[]).length,1);
 assert.ok(html.includes(`<link rel="canonical" href="${primary}">`));
 assert.ok(html.includes(`<meta property="og:url" content="${primary}">`));
 assert.ok(html.includes(`<meta property="og:image" content="${primary}assets/atlas-preview.jpg">`));
 assert.doesNotMatch(html,/world-history-atlas-tony\.techiesea\.chatgpt\.site/);
 const image=fs.readFileSync(new URL('../dist/assets/atlas-preview.jpg',import.meta.url));
 const dimensions=imageDimensions(image);assert.ok(dimensions.width>=600);assert.ok(dimensions.height>0);
});
test('discovery files describe the actual document, not invented hash-route pages',()=>{
 const robots=read('dist/robots.txt'),sitemap=read('dist/sitemap.xml');
 assert.match(robots,/User-agent: \*\nAllow: \//);assert.ok(robots.includes('Sitemap: '+primary+'sitemap.xml'));
 assert.ok(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
 assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]),[primary]);
 assert.doesNotMatch(sitemap,/#|<lastmod>|<priority>/);
});
test('the legacy mirror publisher preserves the primary canonical identity without activating a deployment',()=>{
 const source=read('scripts/publish-pages.py');
 assert.ok(source.includes(`PRIMARY_URL = '${primary}'`));assert.ok(source.includes('primary_site_url=PRIMARY_URL'));
 assert.match(source,/mirror retains the primary site's canonical/);assert.doesNotMatch(source,/GPT_URL|gpt_site_url/);
 assert.ok(source.includes('Expected the primary canonical URL'));
});
