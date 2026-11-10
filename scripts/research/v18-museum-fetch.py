"""Fetch published Met object metadata for a reviewed candidate-ID inventory.

This script discovers no subjects and grants no image admission. Curated recipes
must separately establish entry relevance, bilingual interpretation and rights.
It saves source bytes and decodes supplied small-image bytes without editing them.
"""
import concurrent.futures, datetime, hashlib, io, json, pathlib, sys
from urllib.request import Request, urlopen
from PIL import Image

ids_file, cache_dir = map(pathlib.Path, sys.argv[1:3])
cache_dir.mkdir(parents=True, exist_ok=True)
ids = json.loads(ids_file.read_text())
if isinstance(ids, dict): ids = list(ids)

def get_bytes(url):
    with urlopen(Request(url, headers={'User-Agent':'WorldHistoryAtlas/0.24 research'}), timeout=30) as response:
        return response.read()

def fetch(object_id):
    key = str(object_id)
    metadata_file = cache_dir / (key + '.json')
    try:
        if metadata_file.exists():
            data = json.loads(metadata_file.read_text())
        else:
            url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + key
            data = json.loads(get_bytes(url))
            metadata_file.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
        result = {'objectID': object_id, 'title': data.get('title'), 'date': data.get('objectDate'),
                  'culture': data.get('culture'), 'period': data.get('period'),
                  'artist': data.get('artistDisplayName'), 'medium': data.get('medium'),
                  'publicDomain': data.get('isPublicDomain'), 'sourceUrl': data.get('objectURL')}
        image_url = data.get('primaryImageSmall')
        if data.get('isPublicDomain') is True and image_url:
            image_file = cache_dir / (key + '.jpg')
            if not image_file.exists():
                image_file.write_bytes(get_bytes(image_url))
            payload = image_file.read_bytes()
            with Image.open(io.BytesIO(payload)) as image:
                image.load()
                result.update(width=image.width, height=image.height, format=image.format,
                              bytes=len(payload), sha256=hashlib.sha256(payload).hexdigest(),
                              downloadedFrom=image_url)
        else:
            result['held'] = 'No public-domain small image supplied by object API'
        (cache_dir / (key + '-receipt.json')).write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
        return result
    except Exception as error:
        return {'objectID': object_id, 'error': str(error)}

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(fetch, ids))
(cache_dir / 'index.json').write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'candidates': len(results), 'downloaded': sum('sha256' in row for row in results),
                  'held': [row for row in results if 'held' in row or 'error' in row]}, ensure_ascii=False))
