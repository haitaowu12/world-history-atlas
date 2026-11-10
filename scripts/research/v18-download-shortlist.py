"""Download manually shortlisted source thumbnails; no catalogue admission."""
import json,pathlib,urllib.request,urllib.error,io,hashlib,time
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[2];C=ROOT/'research/v18';out=C/'shortlist-images';out.mkdir(exist_ok=True)
rows=json.loads((C/'portrait-candidates.json').read_text());short=json.loads((C/'portrait-shortlist.json').read_text())['candidateIndices']
for i in short:
 r=rows[i];info=r['file']['imageinfo'][0];url=info.get('thumburl') or info['url'];path=out/(r['recordId']+'.img');receipt=out/(r['recordId']+'.json')
 try:
  if not path.exists():
   prior=C/'people'/(r['recordId']+'.img')
   if prior.exists():data=prior.read_bytes()
   else:
    with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'WorldHistoryAtlas/0.24'}),timeout=40) as response:data=response.read()
    time.sleep(1)
   path.write_bytes(data)
  data=path.read_bytes()
  with Image.open(io.BytesIO(data)) as image:
   image.load();meta={'index':i,'recordId':r['recordId'],'width':image.width,'height':image.height,'format':image.format,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'downloadedFrom':url}
  receipt.write_text(json.dumps(meta,indent=2)+'\n');print('OK',i,r['recordId'],len(data),flush=True)
 except urllib.error.HTTPError as e:
  print('HTTP',i,e.code,dict(e.headers),flush=True)
  if e.code==429: print('Rate limit reached; defer remaining sources.',flush=True);break
 except Exception as e:print('ERROR',i,str(e),flush=True)
