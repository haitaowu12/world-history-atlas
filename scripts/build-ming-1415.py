#!/usr/bin/env python3
"""Extract the yellow 1415 source illustration; see the accompanying audit."""
import hashlib,json,math
from pathlib import Path
import cv2
import numpy as np
from PIL import Image
from pyproj import CRS,Transformer
from shapely import make_valid
from shapely.geometry import Polygon,MultiPolygon,mapping
from shapely.geometry.polygon import orient
from shapely.ops import transform,unary_union
ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'references/china-ming-1415/herrmann-ming-1415.jpg'
sha='b37627340c49d28ffba1a45b7c75e87e0dda408a6b5e0ead59c7e82faadb3180'
if hashlib.sha256(source.read_bytes()).hexdigest()!=sha: raise SystemExit('The inspected map does not match its source checksum')
# Fit to the printed city marks of Beijing, Kaifeng, Xi'an and Nanjing and
# the centers of Hainan and Taiwan; see audit for independent coastline review.
lon0,lat0,scale,theta,cx,cy=(73.1081128,43.6738324,1630.52518,.117505917,916.468931,1244.67437)
radius=6371000
crs=CRS.from_proj4(f'+proj=laea +lat_0={lat0} +lon_0={lon0} +R={radius} +units=m')
forward=Transformer.from_crs(4326,crs,always_xy=True); inverse=Transformer.from_crs(crs,4326,always_xy=True)
rx,ry=forward.transform(110,30);co,si=math.cos(theta),math.sin(theta)
def unproject(x,y,z=None):
 u,v=(x-cx)/scale,(y-cy)/scale
 return inverse.transform(rx+radius*(co*u+si*v),ry+radius*(si*u-co*v))
def polygons(g):
 if g.geom_type=='Polygon': return [g]
 return [p for child in getattr(g,'geoms',[]) for p in polygons(child)]
image=np.asarray(Image.open(source).convert('RGB')); hsv=cv2.cvtColor(image,cv2.COLOR_RGB2HSV)
r,g=image[:,:,0].astype(int),image[:,:,1].astype(int)
mask=((hsv[:,:,0]>=18)&(hsv[:,:,0]<=32)&(hsv[:,:,1]>=80)&(hsv[:,:,2]>=90)&(r>=g+3)).astype('uint8')*255
# Exclude the differently scaled inset, legend and unrelated yellow islands.
mask[:370]=0;mask[1700:]=0;mask[:,:300]=0;mask[:,1250:]=0
mask=cv2.morphologyEx(mask,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
contours,_=cv2.findContours(mask,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
contours=sorted(contours,key=cv2.contourArea,reverse=True)
# Source's mainland and separately colored Hainan island, never Sumatra.
if len(contours)<2 or cv2.contourArea(contours[0])<300000 or cv2.boundingRect(contours[1])[:2]!=(960,1525):
 raise ValueError('Unexpected source color segmentation')
parts=[]
for contour in contours[:2]:
 coords=[(float(x),float(y)) for x,y in contour[:,0,:]]
 parts.extend(polygons(make_valid(Polygon(coords))))
placed=make_valid(transform(unproject,unary_union(parts)))
geom=mapping(MultiPolygon([orient(p.simplify(.015,preserve_topology=True),sign=-1) for p in polygons(placed) if p.area>.001]))
page='https://commons.wikimedia.org/wiki/File:Map_of_Ming_Chinese_empire_1415.jpg'
columbia='https://afe.easia.columbia.edu/timelines/vietnam_timeline.htm'
met='https://www.metmuseum.org/essays/ming-dynasty-1368-1644'
note={'en':'Approximate 1415 outline traced from a 1935 historical atlas, shown as a fixed reference through 1417, not an annual reconstruction. It includes the Ming occupation of northern Đại Việt; resistance and local control varied. The older map combines core administration and frontier claims, and its far-northeastern area is cut off by the map inset.','zh':'依据1935年历史地图集提取的1415年概略轮廓，作为固定年代参照显示至1417年，并非逐年复原。图中包括明朝对大越北部的占领；抵抗与地方控制程度并不相同。旧地图混合了核心行政区与边疆主张，其东北远部被图中插图遮断。'}
sources=[{'title':'Map of Ming Chinese empire 1415, Historical and Commercial Atlas of China, map 38','url':page,'publisher':'Albert Herrmann and Georg Westermann / Wikimedia Commons','checkedAt':'2026-10-28','evidenceNote':'Commons classifies this 1935 source as public domain in the US through non-renewal and as PD-old-70; territorial limits and the scanned inset remain visible limitations.','evidenceNoteZh':'维基共享资源将该1935年地图标为美国未续展的公共领域作品及作者逝世70年以上作品；地区版权差异和原图插图遮断范围仍须注意。'},
 {'title':'Vietnam — Timeline of Historical Periods','url':columbia,'publisher':'Columbia University, Asia for Educators','checkedAt':'2026-10-28','evidenceNote':'Lists Ming occupation of Đại Việt in 1407–1427 and resistance beginning in 1418; it does not establish individual map vertices.','evidenceNoteZh':'列出1407–1427年明朝占领大越及1418年开始的抵抗；不验证地图边界顶点。'},
 {'title':'Ming Dynasty (1368–1644)','url':met,'publisher':'The Metropolitan Museum of Art','checkedAt':'2026-10-28','evidenceNote':'Provides the overall Ming chronology, not a survey of this boundary.','evidenceNoteZh':'提供明朝总体年代，并非该边界的测绘。'}]
p={'id':'herrmann-1415-ming','polityId':'ming','year':1415,'sourceYear':1415,'name':{'en':'Ming dynasty · 1415 reference','zh':'明朝 · 1415年参考图'},'kind':'polity','color':'#ceab79','sourceDataset':'herrmann-ming-1415','license':'Public-Domain-US','sourceAuthor':'Albert Herrmann and Georg Westermann','geometrySource':page,'sourceSha256':sha,'attribution':'Albert Herrmann and Georg Westermann, Historical and Commercial Atlas of China (1935), map 38; adapted by World History Atlas','sourceExtentClipped':True,'review':'historical-atlas-illustration-and-geographic-registration','note':note,'sources':sources,'contextValidity':{'start':1415,'end':1417,'backwardReviewed':False,'reviewedAt':'2026-10-28','evidence':[page,columbia,met],'note':note}}
out={'type':'FeatureCollection','name':'Ming 1415 historical-atlas reference','license':'Public-Domain-US','features':[{'type':'Feature','properties':p,'geometry':geom}]}
blob=(json.dumps(out,ensure_ascii=False,separators=(',',':'))+'\n').encode()
if len(blob)>=450000:raise ValueError('Output exceeds the atlas transport budget')
path=ROOT/'dist/data/china-open-ming-1415-v18.geojson';path.write_bytes(blob)
print(path.name,len(blob),hashlib.sha256(blob).hexdigest())
