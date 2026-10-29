#!/usr/bin/env python3
"""Extract dated, CC-BY map regions. Dependencies: Pillow, numpy, OpenCV, pyproj, shapely.

The georeferencing parameters are a best-fit spherical Lambert azimuthal
projection; they do not make the historical frontier an accurate survey.
See docs/CHINA_MAP_GAPS_2026_10_28.md for controls, residuals and limits.
"""
import hashlib
import json
import math
from pathlib import Path
import cv2
import numpy as np
from PIL import Image
from pyproj import CRS, Transformer
from shapely import make_valid
from shapely.geometry import Polygon, MultiPolygon, mapping
from shapely.geometry.polygon import orient
from shapely.ops import transform, unary_union

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'references/china-song-1141/ian-kiu-1141-original-2007.png'
SOURCE_SHA = 'e8530c4c9203ae3f9c779db718782b2df647b5e106f34a2ca934560455aa4eb4'
if hashlib.sha256(SOURCE.read_bytes()).hexdigest() != SOURCE_SHA:
    raise SystemExit('The inspected 2007 map does not match the source checksum')

# Spherical LAEA, then a fitted scale and rotation. Model fitted against the
# 2007 blank-map coastline and selected contemporary reference borders, not
# against positions of the historical frontiers.
lon0, lat0, scale, theta, center_x, center_y = (112.509496, 38.3451071, 702.105207, -.102830343, 354.219467, 324.911305)
radius = 6371000
projection = CRS.from_proj4(f'+proj=laea +lat_0={lat0} +lon_0={lon0} +R={radius} +units=m')
forward = Transformer.from_crs(4326, projection, always_xy=True)
inverse = Transformer.from_crs(projection, 4326, always_xy=True)
ref_x, ref_y = forward.transform(110, 30)
cos, sin = math.cos(theta), math.sin(theta)
def unproject(x, y, z=None):
    u, v = (x-center_x)/scale, (y-center_y)/scale
    return inverse.transform(ref_x+radius*(cos*u+sin*v), ref_y+radius*(sin*u-cos*v))

def polygons(g):
    if g.geom_type == 'Polygon': return [g]
    return [p for child in getattr(g, 'geoms', []) for p in polygons(child)]
def geometry(mask):
    # Source uses flat colors; closing fills text holes and tiny anti-aliasing
    # interruptions. No modern-state boundary is used as a historical border.
    mask = cv2.morphologyEx(mask.astype('uint8'), cv2.MORPH_CLOSE, np.ones((3,3), np.uint8))
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    pieces = []
    for contour in contours:
        if cv2.contourArea(contour) < 50: continue
        coords = [(float(x),float(y)) for x,y in contour[:,0,:]]
        if len(coords) < 3: continue
        pieces.extend(polygons(make_valid(Polygon(coords))))
    if not pieces: raise ValueError('The source color did not yield an outline')
    placed = make_valid(transform(unproject, unary_union(pieces)))
    return mapping(MultiPolygon([orient(p.simplify(.008, preserve_topology=True), sign=-1) for p in polygons(placed) if p.area > .001]))

image = np.asarray(Image.open(SOURCE).convert('RGB')).astype(int)
r,g,b = image[:,:,0],image[:,:,1],image[:,:,2]
areas = [
    ('song', 'Southern Song', '南宋', (r-g>25)&(g-b>25)&(r>180), '#ce9967', False),
    ('jin-jurchen', 'Jurchen Jin', '金朝', (g-r>50)&(b-g>15)&(g>140), '#82a8ce', True),
    ('western-xia', 'Western Xia', '西夏', (g-r>20)&(g-b>35)&(g>150), '#a2ba83', False),
]
source_page = 'https://commons.wikimedia.org/wiki/File:Jinn_and_Sung_Dynasties_1141.png'
archive_url = 'https://upload.wikimedia.org/wikipedia/commons/archive/e/e5/20181119022251%21Jinn_and_Sung_Dynasties_1141.png'
study_url = 'https://brill.com/view/journals/tpao/112/1-2/article-p163_6.xml'
cambridge_url = 'https://www.cambridge.org/core/books/abs/middle-imperial-china-9001350/song-in-a-multipolar-world/734109916CAD14A419B6FD1C4F720946'
sources = [
 {'title':'Jinn and Sung Dynasties 1141, original 2007 version','url':source_page,'publisher':'Ian Kiu / Wikimedia Commons','checkedAt':'2026-10-28','evidenceNote':'Ian Kiu’s CC BY 3.0 map, based on Albert Herrmann’s 1935 atlas. The original 2007 version was extracted, georegistered, and generalized. The later replacement versions were not used.','evidenceNoteZh':'Ian Kiu依据Albert Herrmann 1935年历史地图集绘制，采用CC BY 3.0许可。本图提取2007年原版并进行地理配准和概括，未使用后来的替换版本。'},
 {'title':'Frontier Walls, Trenches, and Forts in Mid-Jin Politics, 1161–1208','url':study_url,'publisher':"T’oung Pao / Brill",'checkedAt':'2026-10-28','evidenceNote':'Documents the 1165 Song–Jin peace and cautions that a precise northern Jin border is not evidenced. It does not establish the map vertices.','evidenceNoteZh':'记述1165年宋金和议，并指出金朝北部缺少精确边界证据；并未核实本图的边界顶点。'},
 {'title':'Song in a Multipolar World','url':cambridge_url,'publisher':'Cambridge University Press','checkedAt':'2026-10-28','evidenceNote':'Explains the sequence from Northern Song to Southern Song, the Jurchen Jin and the Mongol conquest; it does not validate the drawn border.','evidenceNoteZh':'概述北宋、南宋、女真金朝与蒙古征服的先后顺序；不验证绘制的边界。'},
]
features=[]
for polity,en,zh,mask,color,clipped in areas:
    gjson=geometry(mask)
    for phase,start,end in [('early',1141,1160),('later',1165,1204 if polity=='western-xia' else 1205)]:
        en_note='Approximate 1141 outline adapted from Ian Kiu’s map after a 1935 historical atlas, shown as a fixed dated reference; it is not an annual reconstruction. Boundaries and influence could change within the display period. Geographic registration and the small source image add uncertainty.'
        zh_note='依据Ian Kiu参考1935年历史地图集绘制的1141年概略轮廓，作为固定年代参照，并非逐年复原。显示期间边界与影响范围可能变化；地理配准和原图分辨率带来不确定性。'
        if clipped:
            en_note+=' The source image cuts off the northeastern part of Jin, and northern frontiers were not precise fixed lines.'
            zh_note+=' 原图截断金朝东北部，北方边疆也并非精确固定的界线。'
        note={'en':en_note,'zh':zh_note}
        props={'id':f'kiu-1141-{polity}-{phase}','polityId':polity,'year':1141,'sourceYear':1141,'name':{'en':en,'zh':zh},'kind':'polity','color':color,
         'sourceDataset':'kiu-song-jin-1141','license':'CC-BY-3.0','licenseURL':'https://creativecommons.org/licenses/by/3.0/','sourceAuthor':'Ian Kiu','geometrySource':archive_url,'sourceSha256':SOURCE_SHA,'attribution':'Ian Kiu, Jinn and Sung Dynasties 1141 (2007), CC BY 3.0; traced and geographically registered by World History Atlas',
         'sourceExtentClipped':clipped,'review':'dated-illustration-and-geographic-registration','note':note,'sources':sources,
         'displayDistinctFrom':[x[0] for x in areas if x[0]!=polity],
         'contextValidity':{'start':start,'end':end,'backwardReviewed':False,'reviewedAt':'2026-10-28','evidence':[source_page,study_url,cambridge_url],'note':note}}
        features.append({'type':'Feature','properties':props,'geometry':gjson})
out={'type':'FeatureCollection','name':'Song, Jin and Western Xia: 1141 map reference','license':'CC-BY-3.0','features':features}
data=(json.dumps(out,ensure_ascii=False,separators=(',',':'))+'\n').encode()
if len(data)>=450000: raise ValueError('Output exceeds the atlas transport budget')
path=ROOT/'dist/data/china-open-song-jin-1141-v18.geojson';path.write_bytes(data)
print(path.name,len(features),len(data),hashlib.sha256(data).hexdigest())
