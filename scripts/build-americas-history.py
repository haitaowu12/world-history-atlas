"""Build dated administrative reference from two pinned, independently licensed archives.

Usage: python build-americas-history.py /path/to/input-directory
Build-only dependencies: pyogrio0.13.0, shapely2.2.0, pyproj3.8.0.
No network calls. Do not substitute modern province shapes for these source geometries.
"""
import collections
import hashlib
import json
from pathlib import Path
import re
import sys
import tempfile
import zipfile

import pyogrio
import pyproj
import shapely
from shapely.geometry import mapping, shape, Polygon, MultiPolygon, GeometryCollection
from shapely.ops import transform, unary_union

ROOT=Path(__file__).resolve().parent.parent
DATA=ROOT/'dist/data'
PINS={
 'USA':('US_AtlasHCB_StateTerr_Gen01.zip','db6f124d913bdda718fbf4153d5b1abe569cb9b60cb2a4d73b25afb5a258c457'),
 'CAN':('territorial_evolution_territoriale.gdb.zip','99eb89f444af9dd4dcd36227ad1413eae28d274cc23493f452b4d64dc25dc926')}
SOURCES={
 'USA':{'title':'U.S. Historical States and Territories · generalized .01 degrees','publisher':'Atlas of Historical County Boundaries, Newberry Library',
  'url':'https://publications.newberry.org/ahcb/pages/United_States.html','download':'https://publications.newberry.org/ahcb/downloads/gis/US_AtlasHCB_StateTerr_Gen01.zip',
  'license':'Retained packaged CC BY-NC-SA 2.5 notice; current Newberry public-reuse terms also recorded','licenseURL':'https://creativecommons.org/licenses/by-nc-sa/2.5/',
  'checkedAt':'2026-10-25','datasetVersion':'Newberry US generalized .01 degree distribution, pinned by archive SHA256'},
 'CAN':{'title':'Territorial Evolution of Canada, 1867 to 2003','publisher':'Natural Resources Canada, Canada Centre for Mapping and Earth Observation',
  'url':'https://app.geo.ca/en-ca/map-browser/record/e88ce995-b69a-4595-a752-bb06b061b5a3',
  'download':'https://download-telecharger.services.geo.ca/pub/nrcan_rncan/Geographical-maps_Carte-geographique/territorial_evolution_territoriale/territorial_evolution_territoriale.gdb.zip',
  'license':'Open Government Licence – Canada 2.0','licenseURL':'https://open.canada.ca/en/open-government-licence-canada',
  'checkedAt':'2026-10-25','datasetVersion':'NRCan2017 catalog release, pinned by archive SHA256'}}
NOTE={'en':'A dated administrative reference, including recorded claims. It does not map military fronts, uniform occupation, Indigenous sovereignty or all competing jurisdictions. Source dates and representative names remain inspectable.',
      'zh':'有年代依据的行政参照，包含来源记录的主张；不表示战线、均匀占领、原住民族主权或全部竞争管辖。保留来源年代与代表名称供查阅。'}

def dumps(value): return json.dumps(value,ensure_ascii=False,separators=(',',':'))
def digest(value): return hashlib.sha256(value).hexdigest()
def polygonal(g):
 if isinstance(g,Polygon): return g
 if isinstance(g,MultiPolygon): return g
 if isinstance(g,GeometryCollection): return unary_union([x for x in g.geoms if isinstance(x,(Polygon,MultiPolygon))])
 raise ValueError('Unexpected non-polygon geometry')
def clean(g,tolerance):
 g=polygonal(shapely.make_valid(g))
 g=polygonal(shapely.make_valid(g.simplify(tolerance,preserve_topology=True)))
 g=shapely.set_precision(g,0.0001)
 return shapely.orient_polygons(g,exterior_cw=True)
def rows(src,layer=None):
 meta,_,geoms,columns=pyogrio.raw.read(src,layer=layer)
 return meta,[{**dict(zip(meta['fields'],values)),'geometry':shapely.from_wkb(wkb),'sourceRow':i} for i,(values,wkb) in enumerate(zip(zip(*columns),geoms))]
def bilingual_names():
 result={}
 metadata=json.loads((DATA/'regional-reference.json').read_text())
 for country in metadata['countries']:
  if country['code'] not in ['USA','CAN']:continue
  for layer in country['layers']:
   for f in json.loads((DATA/layer['file']).read_text())['features']:
    p=f['properties']; result[p['name']['en']]=p['name']['zh']
 return result

def build(input_dir):
 names=bilingual_names()
 names.update({'District of Columbia':'哥伦比亚特区','Northwest Territories':'西北领地','North-Western Territory':'西北地区',"Rupert's Land":'鲁珀特地',
 'Arctic Islands':'北极群岛','Newfoundland':'纽芬兰','Newfoundland and Labrador':'纽芬兰与拉布拉多','Yukon Territory':'育空领地','Yukon':'育空',
 'Indian Territory':'印第安领地','Gadsden Purchase':'加兹登购地','Mexican Cession':'墨西哥割让地','Louisiana Purchase':'路易斯安那购地',
 'Oregon Country':'俄勒冈地区','Vermont Republic':'佛蒙特共和国','Texas Republic':'得克萨斯共和国','Deseret':'德撒律主张区',
 'Unorg. Fed. Terr.':'未建制联邦领地','Uncert. Bound. Area':'边界未定地区','District of Keewatin':'基瓦廷区','District of Franklin':'富兰克林区',
 'District of Mackenzie':'麦肯齐区','Disputed area':'争议地区'})
 def translated(name):
  if name in names:return names[name]
  for suffix,zh in [(' Territory','领地'),(' Department','部'),(' District','区'),(' Annexation','兼并地'),(' Terr.','领地')]:
   if name.endswith(suffix):return names.get(name[:-len(suffix)],name[:-len(suffix)])+zh
  if name.startswith('District of '):return names.get(name[12:],name[12:])+'区'
  return name # Truthful source-name fallback, never an invented translation.
 index={'schemaVersion':1,'role':'dated-administrative-reference','annualConvention':'December31',
  'checkedAt':'2026-10-26','scope':NOTE,'sources':SOURCES,'countries':{},'chronologyReviews':[{'sourceRow':40,'sourceName':'Florida Unorg. FT','sourceStartKey':18190222,'effectiveStartKey':18210222,'checkedAt':'2026-10-26','evidence':'https://avalon.law.yale.edu/19th_century/sp1819.asp','note':'Article VII and editorial footnote1 distinguish1819 signature from1821 ratification exchange; possession followed separately. Earlier West Florida source units are unchanged.'}],'method':{
   'USA':'Source START_N/END_N, sampled at December31. Gadsden signing-date start deferred to1854; Florida Unorg. FT signing-date start deferred to1821 ratification exchange for transfer interpretation. Other-type and Oregon joint-occupation units do not become US federal extent.',
   'CAN':'Use explicit HISTO snapshot year, not broad START_TIME/END_TIME values. Select latest snapshot within1867–2003; each is a dated contextual reference until the next source stage, not an annual survey.',
   'geometry':'Reproject NRCan EPSG3978 to EPSG4326; topology-preserving simplification .04 degrees (Canada)/.02 degrees (US); round .0001 degrees; normalize D3 ring winding; retain individual source units; share display colors by parent without merging identities.',
   'limits':'Canada stages omit some intermediate administrative changes; US source administrative frames do not reproduce Civil War fronts or establish Indigenous title.'}}
 with tempfile.TemporaryDirectory(prefix='atlas-americas-') as tmp:
  for code,(filename,sha) in PINS.items():
   src=input_dir/filename; raw=src.read_bytes()
   if digest(raw)!=sha:raise ValueError('Unrecognized input archive '+filename)
   target=Path(tmp)/code;target.mkdir()
   with zipfile.ZipFile(src) as archive:
    if any(name.startswith('/') or '..' in Path(name).parts for name in archive.namelist()):raise ValueError('Unsafe archive path')
    archive.extractall(target)
   path=next(target.rglob('*.shp' if code=='USA' else '*.gdb'))
   meta,records=rows(path,None if code=='USA' else 'political_divisions_politique_1867_2003')
   project=pyproj.Transformer.from_crs(meta['crs'],'EPSG:4326',always_xy=True).transform
   for r in records:
    r['geometry']=clean(transform(project,r['geometry']) if code=='CAN' else r['geometry'],.04 if code=='CAN' else .02)
    if code=='USA':
     r['effectiveStart']=int(r['START_N']);r['effectiveEnd']=int(r['END_N'])
     if r['NAME']=='Gadsden Purchase':r['effectiveStart']=18540630
     if r['NAME']=='Florida Unorg. FT' and int(r['START_N'])==18190222:r['effectiveStart']=18210222
     r['parent']='USA'
     if r['NAME']=='Oregon Country':r['parent']='oregon-joint'
     if r['TERR_TYPE']=='Other':r['parent']='usa-claim'
     if r['NAME']=='Texas Republic':r['parent']='texas-republic'
     if r['NAME']=='Vermont Republic':r['parent']='vermont-republic'
    else:
     r['snapshot']=int(r['HISTO']);r['parent']='CAN' if r['Period_Group'].startswith('Canada') else 'british-north-america'
     if r['PROV_NAME']=='Newfoundland' and r['parent']!='CAN':r['parent']='newfoundland'
     if r['PROV_NAME']=='Disputed area':r['parent']='canada-claim'
   first,last=(1783,2000) if code=='USA' else (1867,2003)
   phase_sets=[];previous=None;shared={}
   for year in range(first,last+1):
    snap=max(r['snapshot'] for r in records if r['snapshot']<=year) if code=='CAN' else None
    active=[r for r in records if (r['effectiveStart']<=year*10000+1231<=r['effectiveEnd'])] if code=='USA' else [r for r in records if r['snapshot']==snap]
    identity=tuple(r['sourceRow'] for r in active)
    if identity!=previous:phase_sets.append({'start':year,'end':year,'rows':active});previous=identity
    else:phase_sets[-1]['end']=year
   phases=[];duplicates=[]
   for phase in phase_sets:
    start,end,active=phase['start'],phase['end'],phase['rows'];unique={}
    for r in active:
     key=(r['NAME'] if code=='USA' else r['PROV_NAME'],r['parent'],shapely.to_wkb(r['geometry']))
     if key in unique:duplicates.append({'year':start,'sourceRow':r['sourceRow'],'duplicateOf':unique[key]['sourceRow']})
     else:unique[key]=r
    active=list(unique.values());features=[];groups=collections.defaultdict(list)
    def feature(g,id,name,parent,role,extra=None):
     point=max(g.geoms,key=lambda p:p.area).representative_point() if isinstance(g,MultiPolygon) else g.representative_point()
     props={'id':id,'name':name,'polityId':'americas-'+parent.lower(),'code':parent,'countryReference':code,
      'sourceDataset':'newberry-ahcb' if code=='USA' else 'nrcan-territorial-evolution','sourceYear':start,'year':start,
      'start':start,'end':end,'role':role,'kind':'polity','labelPoint':[round(point.x,4),round(point.y,4)],
      'contextValidity':{'start':start,'end':end,'backwardReviewed':False,'note':NOTE},
      'note':NOTE,'sources':[{k:v for k,v in SOURCES[code].items() if k in ['title','url','publisher','checkedAt']}],
      'license':SOURCES[code]['license'],'attribution':SOURCES[code]['publisher'],**(extra or {})}
     return {'type':'Feature','properties':props,'geometry':mapping(shapely.orient_polygons(g,exterior_cw=True))}
    for r in active:
     name=r['NAME'] if code=='USA' else r['PROV_NAME'];parent=r['parent'];groups[parent].append(r['geometry'])
     extra={'parent':parent,'sourceRow':r['sourceRow'],'sourceName':name,
       'sourceType':r['TERR_TYPE'] if code=='USA' else r['Period_Group'],'sourcePeriod':{'start':str(r['START_DATE']) if code=='USA' else r['HISTO'],'end':str(r['END_DATE']) if code=='USA' else r['HISTO']}}
     if code=='USA':extra.update({'sourceId':r['ID'],'sourceVersion':int(r['VERSION']),'sourceCitation':r['CITATION'],'sourceStartKey':int(r['START_N']),'sourceEndKey':int(r['END_N']),'effectiveStartKey':r['effectiveStart']})
     extra['claim']=parent in ['usa-claim','canada-claim','oregon-joint'];extra['country']=code
     unit=feature(r['geometry'],f'americas-{code.lower()}-division-{r["sourceRow"]}',{'en':name,'zh':translated(name)},parent,'division',extra)
     features.append(unit);shared[r['sourceRow']]=unit
    phase_features=features if code=='CAN' else []
    parts=[];chunk=[]
    for f in phase_features:
     if len(dumps({'type':'FeatureCollection','features':chunk+[f]}).encode())>340000 and chunk:parts.append(chunk);chunk=[]
     chunk.append(f)
    if chunk:parts.append(chunk)
    files=[]
    for n,part in enumerate(parts):
     filename=f'americas-history-{code.lower()}-{start}-{n+1:02}.geojson';raw=(dumps({'type':'FeatureCollection','features':part})+'\n').encode()
     if len(raw)>=450000:raise ValueError('Oversize feature '+filename)
     (DATA/filename).write_bytes(raw);files.append({'file':filename,'bytes':len(raw),'sha256':digest(raw),'count':len(part)})
    phases.append({'id':f'{code.lower()}-{start}','start':start,'end':end,'sourceYear':start,'files':files,'divisions':len(active),'sourceRows':[r['sourceRow'] for r in active],'parentGroups':len(groups)})
   shared_files=[]
   if code=='USA':
    parts=[];chunk=[]
    for f in shared.values():
     if len(dumps({'type':'FeatureCollection','features':chunk+[f]}).encode())>340000 and chunk:parts.append(chunk);chunk=[]
     chunk.append(f)
    if chunk:parts.append(chunk)
    for n,part in enumerate(parts):
     filename=f'americas-units-usa-{n+1:02}.geojson';raw=(dumps({'type':'FeatureCollection','features':part})+'\n').encode()
     (DATA/filename).write_bytes(raw);shared_files.append({'file':filename,'bytes':len(raw),'sha256':digest(raw),'count':len(part)})
   index['countries'][code]={'sharedFiles':shared_files,'yearEndRowsUsed':len(shared),'start':first,'end':last,'archive':PINS[code][0],'archiveSHA256':sha,'inputRows':len(records),'duplicates':duplicates,'phases':phases}
 (DATA/'americas-history.json').write_text(json.dumps(index,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({code:{'phases':len(c['phases']),'files':sum(len(p['files']) for p in c['phases']),'bytes':sum(f['bytes'] for p in c['phases'] for f in p['files'])+sum(f['bytes'] for f in c['sharedFiles']),'duplicates':len(c['duplicates'])} for code,c in index['countries'].items()},indent=2))

if __name__=='__main__':build(Path(sys.argv[1]))
