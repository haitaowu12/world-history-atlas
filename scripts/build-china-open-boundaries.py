#!/usr/bin/env python3
"""Build the reviewed, separately licensed China reference layers.

Run with the dependencies listed in the accompanying review. The creator-released
CC0 SVG is retained in references/china-open-boundaries. No Jiangshan or
untraced Historical Basemaps polygons are read or written by this builder.
"""
import hashlib
import json
import math
import xml.etree.ElementTree as ET
from pathlib import Path

import numpy as np
from pyproj import CRS, Transformer
from shapely import make_valid
from shapely.geometry import Polygon, mapping
from shapely.geometry.polygon import orient
from shapely.ops import transform, unary_union
from svgpathtools import parse_path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'dist' / 'data'
SVG = ROOT / 'references' / 'china-open-boundaries' / 'Warring_States_c._250_BC.svg'
SVG_SHA = '736b1fe6313cfe8733f93c2c8e86471cc881583989a75da2502e3baecfadc304'
def sha(blob):
    return hashlib.sha256(blob).hexdigest()
if sha(SVG.read_bytes()) != SVG_SHA:
    raise SystemExit('Warring States SVG does not match the inspected source')
MET_ZHOU = 'https://www.metmuseum.org/essays/shang-and-zhou-dynasties-the-bronze-age-of-china'
DATE = '2026-10-28'

def evidence(title, url, publisher, en, zh):
    return {'title': title, 'url': url, 'publisher': publisher, 'checkedAt': DATE,
            'evidenceNote': en, 'evidenceNoteZh': zh}

def polygonal(g):
    if g.geom_type == 'Polygon':
        return [g]
    if hasattr(g, 'geoms'):
        return [part for child in g.geoms for part in polygonal(child)]
    return []

def geojson(g):
    parts = [orient(p, sign=-1) for p in polygonal(make_valid(g)) if p.area > 1e-8]
    if not parts:
        raise ValueError('No usable polygon components')
    from shapely.geometry import MultiPolygon
    return mapping(MultiPolygon(parts))

def entry(id_, polity, year, name, note, sources, geometry, start, end, dataset, license_):
    return {'type': 'Feature', 'properties': {
        'id': id_, 'polityId': polity, 'year': year, 'sourceYear': year,
        'name': {'en': name[0], 'zh': name[1]}, 'kind': 'polity',
        'sourceDataset': dataset, 'license': license_, 'color': '#b38861',
        'review': 'dated-approximation-and-source-rights', 'note': note, 'sources': sources,
        'contextValidity': {'start': start, 'end': end, 'backwardReviewed': start < year,
                            'reviewedAt': DATE, 'evidence': [s['url'] for s in sources], 'note': note},
    }, 'geometry': geometry}

# The author's Albers projection is documented on the file page. Source SVG
# pixels are registered with Luoyang and independent Natural Earth coastline
# vertices; see the audit for residuals and the approximate nature of the fit.
proj = CRS.from_proj4('+proj=aea +lat_0=30 +lon_0=110 +lat_1=25 +lat_2=37 +datum=WGS84 +units=m')
forward = Transformer.from_crs(4326, proj, always_xy=True)
inverse = Transformer.from_crs(proj, 4326, always_xy=True)
anchor = forward.transform(112.454, 34.619)
scale, tx, ty = 0.000398628901, 524.09223906, 478.51934274
def unproject(x, y, z=None):
    return inverse.transform((x-tx)/scale+anchor[0], (ty-y)/scale+anchor[1])

STATES = [
    ('#f5ab3a', 'qin-warring', 'Qin', '秦'),
    ('#e85bbf', 'zhao-warring', 'Zhao', '赵'),
    ('#83608e', 'yan-warring', 'Yan', '燕'),
    ('#00adbc', 'chu-warring', 'Chu', '楚'),
    ('#dfe0df', 'han-warring', 'Han', '韩'),
    ('#44c27d', 'qi-warring', 'Qi', '齐'),
    ('#c35356', 'wei-warring', 'Wei', '魏'),
]
root = ET.parse(SVG).getroot()
paths = list(root[2])
if len(paths) != len(STATES):
    raise ValueError('Unexpected SVG state group')
open_features = []
for path, (color, polity, en, zh) in zip(paths, STATES):
    if path.get('fill', '').lower() != color:
        raise ValueError('Unexpected SVG fill for ' + en)
    pieces = []
    for sub in parse_path(path.get('d')).continuous_subpaths():
        points = []
        for seg in sub:
            n = max(1, min(40, int(seg.length(error=.1)/4)+1))
            for t in np.linspace(0, 1, n, endpoint=False):
                point = seg.point(t)
                points.append((point.real, point.imag))
        if len(points) < 3:
            continue
        points.append(points[0])
        g = make_valid(Polygon(points))
        if g.area > 1:
            pieces.extend(polygonal(g))
    if not pieces:
        raise ValueError('No source polygon for ' + en)
    geometry = geojson(transform(unproject, unary_union(pieces)))
    note = {
        'en': 'Approximate outline from Ian Remsen’s c. 250 BCE map, displayed through 231 BCE as a fixed dated reference. Boundaries changed within this interval; it is not an annual reconstruction. Projection registration and source generalization add geographic uncertainty.',
        'zh': '依据Ian Remsen约公元前250年的地图绘制，作为固定年代参照显示至公元前231年。此期间边界曾变化，并非逐年复原；投影配准及来源概括增加了地理不确定性。',
    }
    src = evidence('Warring States c. 250 BC', 'https://commons.wikimedia.org/wiki/File:Warring_States_c._250_BC.svg',
                   'Ian Remsen / Wikimedia Commons',
                   'Creator identifies this as their CC0 work, cites Natural Earth and Cambridge History of China vol. 1 p. 39, and documents the Albers projection. The atlas extracted and georegistered the color paths.',
                   '作者将作品标为CC0，列明Natural Earth、剑桥中国史第一卷第39页及阿尔伯斯投影；本图提取彩色路径并进行地理配准。')
    hist = evidence('Shang and Zhou Dynasties', MET_ZHOU, 'The Metropolitan Museum of Art',
                    'Describes seven competing states and Qin unification in 221 BCE; it does not verify the polygon vertices.',
                    '记述战国七雄及秦于公元前221年统一；不验证多边形顶点。')
    feat = entry('cc0--250-'+polity, polity, -250, (en, zh), note, [src, hist], geometry,
                 -250, -231, 'remsen-warring-250', 'CC0-1.0')
    feat['properties'].update({'geometrySource': src['url'], 'sourceAuthor': 'Ian Remsen', 'sourceSha256': SVG_SHA, 'sourceYearApproximate': True, 'color': color, 'attribution': 'Ian Remsen, Warring States c. 250 BC; CC0 1.0'})
    open_features.append(feat)

def write(filename, name, license_, features):
    collection = {'type': 'FeatureCollection', 'name': name, 'license': license_, 'features': features}
    blob = (json.dumps(collection, ensure_ascii=False, separators=(',', ':'))+'\n').encode()
    if len(blob) >= 450000:
        raise ValueError('Output exceeds the atlas transport budget: '+filename)
    (DATA / filename).write_bytes(blob)
    print(filename, len(features), len(blob), sha(blob))

write('china-open-warring-v17.geojson', 'Warring States c. 250 BCE', 'CC0-1.0', open_features)
