// The points are representative sites of dated events. They do not depict
// fronts or attribute wartime control to the surrounding country.
export const warYears = [1937,1938,1939,1940,1941,1942,1943,1944,1945];
const events = [
 ['pearl-harbor',1941,1941,-157.95,21.35,'Pearl Harbor','珍珠港','Japan attacked the US Pacific Fleet in Hawaii in December 1941.','1941年12月，日本袭击了驻夏威夷的美国太平洋舰队。'],
 ['midway',1942,1942,-177.37,28.21,'Midway','中途岛','US naval forces defeated a Japanese fleet near Midway in 1942.','1942年，美军在中途岛附近击败日本舰队。'],
 ['el-alamein',1942,1942,28.95,30.83,'El Alamein','阿拉曼','The British victory in late October 1942 forced Axis troops to retreat west from Egypt.','1942年10月下旬，英军的胜利迫使轴心国军队从埃及向西撤退。'],
 ['stalingrad',1942,1943,44.51,48.71,'Stalingrad','斯大林格勒','Axis forces reached Stalingrad in 1942. The Soviet counteroffensive encircled the German Sixth Army, which surrendered in February 1943.','轴心国军队于1942年抵达斯大林格勒。苏军反攻包围了德国第六集团军，该军于1943年2月投降。'],
 ['tunisia',1943,1943,10.18,36.81,'Axis surrender in Tunisia','轴心国军队在突尼斯投降','Axis forces in North Africa surrendered in Tunisia in May 1943. Tunis is a representative point.','北非的轴心国军队于1943年5月在突尼斯投降。图中以突尼斯市为代表地点。'],
 ['kursk',1943,1943,36.19,51.73,'Kursk','库尔斯克','The Soviet defense blunted the German offensive around Kursk in July 1943.','1943年7月，苏军在库尔斯克周边挫败德军攻势。'],
 ['normandy',1944,1944,-0.87,49.37,'Normandy landings','诺曼底登陆','Allied forces landed on the Normandy coast on June 6, 1944. The point represents one part of the landing area.','1944年6月6日，盟军在诺曼底海岸登陆。图中点位代表其中一段登陆海岸。']
];
export const warMapFollowup = {
 schemaVersion:1,
 sources:{'ushmm-war-theaters':{title:'World War II: In Depth',publisher:'United States Holocaust Memorial Museum',url:'https://encyclopedia.ushmm.org/content/en/article/world-war-ii-in-depth'}},
 records:events.map(([id,start,end,lon,lat,en,zh,summaryEn,summaryZh])=>({id:'ww2-theater-'+id,start,end,location:{lon,lat},render:'place-reference',eventPoint:true,title:{en,zh},summary:{en:summaryEn,zh:summaryZh},sourceIds:['ushmm-war-theaters'],relatedIds:['second-world-war']}))
};

// For annexed Baltic states, use the last separate CShapes units as dated
// geographic references. The 1941 and 1944 changes require finer-grained maps.
const balticUnits = [
 ['estonia','Estonia','爱沙尼亚','cshapes-366-1918-11-11'],
 ['latvia','Latvia','拉脱维亚','cshapes-367-1918-11-18'],
 ['lithuania','Lithuania','立陶宛','cshapes-368-1939-10-01']
];
for (const [id,en,zh,referenceFeatureId] of balticUnits) {
 const reference={render:'country-reference',referenceFeatureId,sourceIds:['ushmm-war-theaters'],relatedIds:['second-world-war']};
 warMapFollowup.records.push({
  ...reference,id:'ww2-soviet-'+id,authority:'soviet',start:1940,end:1940,
  title:{en:'Soviet occupation of '+en,zh:'苏联占领'+zh},
  summary:{en:'The Soviet Union occupied the Baltic states in June 1940 and annexed them in August. The hatch uses the last separate CShapes reference for '+en+'.',zh:'苏联于1940年6月占领波罗的海三国，并于8月将其并入苏联。斜线采用 CShapes 最后一份单独的'+zh+'范围。'}
 },{
  ...reference,id:'ww2-german-'+id,authority:'germany',start:1942,end:1943,
  title:{en:'German occupation of '+en,zh:'德国占领'+zh},
  summary:{en:'German forces overran the Baltic states in 1941. This map highlights '+en+' using its last separate CShapes reference, without drawing the boundaries of the German occupation administration.',zh:'德军于1941年占领波罗的海三国。地图以 CShapes 最后一份单独的'+zh+'范围标示占领背景；德国占领当局的行政边界另有分区。'}
 });
}
warMapFollowup.records.push({
 id:'ww2-japanese-philippines',render:'country-reference',gwcode:840,authority:'japan',start:1942,end:1943,
 title:{en:'Japanese occupation of the Philippines',zh:'日本占领菲律宾'},
 summary:{en:'Japanese forces took the Philippines in 1942. The hatch uses the contemporary CShapes reference for the archipelago. It summarizes the occupation while local resistance and effective control varied across the islands.',zh:'日军于1942年占领菲律宾。斜线采用 CShapes 的同期群岛范围，概括占领背景；各岛的抵抗与实际控制情况有所不同。'},
 sourceIds:['ushmm-war-theaters'],relatedIds:['second-world-war']
});
