"""Batch Commons discovery. Results remain candidates until editorial admission."""
import json,pathlib,urllib.request,urllib.parse,urllib.error,time,html
ROOT=pathlib.Path(__file__).resolve().parents[2]; CACHE=ROOT/'research/v18'; CACHE.mkdir(exist_ok=True,parents=True)
records=json.loads((CACHE/'inventory.json').read_text());people=[r for r in records if r['kind']=='person']
# Identity disambiguation, reviewed against atlas biography names and dates.
overrides={'person-ibn-sina':'Avicenna','person-gandhi':'Mahatma Gandhi','person-br-ambedkar':'B. R. Ambedkar','person-tahirih':'Táhirih','person-ida-b-wells':'Ida B. Wells','person-pachacuti':'Pachacuti','person-rigoberta-menchu':'Rigoberta Menchú','person-alexander-great':'Alexander the Great','person-julius-caesar':'Julius Caesar','china-person-liuyu':'Emperor Wu of Liu Song','china-person-luxun':'Lu Xun (Eastern Wu)','china-person-fujian':'Fu Jian (337–385)','china-person-lijing':'Li Jing (Tang dynasty)','china-person-liyu-nt':'Li Yu (Southern Tang)','person-eddie-mabo':'Eddie Mabo','person-njinga':'Nzinga of Ndongo and Matamba','person-seondeok':'Queen Seondeok of Silla','person-kartini':'Kartini','person-mary-ann-shadd':'Mary Ann Shadd','person-marie-curie':'Marie Curie'}
def api(host,**params):
 url='https://'+host+'/w/api.php?'+urllib.parse.urlencode({'format':'json',**params})
 with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'WorldHistoryAtlas/0.24 source-review'}),timeout=45) as f:return json.load(f)
def key(s):return s.replace('_',' ').casefold()
lookup={r['id']:overrides.get(r['id'],r.get('name',r['title'])['en']) for r in people};titles=list(dict.fromkeys(lookup.values()));pages={}
for i in range(0,len(titles),25):
 path=CACHE/f'wiki-pages-{i//25}.json'
 if path.exists():d=json.loads(path.read_text())
 else:
  d=api('en.wikipedia.org',action='query',titles='|'.join(titles[i:i+25]),redirects=1,prop='pageimages|pageprops',piprop='name',pilicense='free');path.write_text(json.dumps(d,ensure_ascii=False,indent=2));time.sleep(2)
 q=d['query'];ps={key(p['title']):p for p in q['pages'].values()};ren={key(x['from']):key(x['to']) for x in q.get('normalized',[])+q.get('redirects',[])}
 for title in titles[i:i+25]:
  k=key(title)
  for _ in range(5):k=ren.get(k,k)
  pages[title]=ps.get(k,{})
 print('Pages',i+25,flush=True)
filenames=list(dict.fromkeys(p['pageimage'] for p in pages.values() if p.get('pageimage')));files={}
for i in range(0,len(filenames),20):
 path=CACHE/f'commons-files-{i//20}.json'
 if path.exists():d=json.loads(path.read_text())
 else:
  d=api('commons.wikimedia.org',action='query',titles='|'.join('File:'+x for x in filenames[i:i+20]),prop='imageinfo',iiprop='url|size|extmetadata',iiurlwidth=600);path.write_text(json.dumps(d,ensure_ascii=False,indent=2));time.sleep(3)
 for p in d.get('query',{}).get('pages',{}).values():files[key(p['title'])]=p
 print('Files',i+20,flush=True)
rows=[{'recordId':r['id'],'title':lookup[r['id']],'page':pages[lookup[r['id']]],'file':files.get(key('File:'+pages[lookup[r['id']]].get('pageimage','')),{})} for r in people]
(CACHE/'portrait-candidates.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
print('Done',len(rows),sum(bool(r['file'].get('imageinfo')) for r in rows))
