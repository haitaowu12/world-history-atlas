// Read encoded dimensions without decoding or modifying historical source bytes.
export function imageDimensions(bytes) {
 const b=Buffer.from(bytes);
 if(b.length>=24&&b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return {width:b.readUInt32BE(16),height:b.readUInt32BE(20),format:'png'};
 if(b.length>=12&&b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP'){
  const type=b.toString('ascii',12,16);
  if(type==='VP8X'&&b.length>=30)return {width:1+b.readUIntLE(24,3),height:1+b.readUIntLE(27,3),format:'webp'};
  if(type==='VP8L'&&b.length>=25&&b[20]===0x2f){const bits=b.readUInt32LE(21);return {width:(bits&0x3fff)+1,height:((bits>>>14)&0x3fff)+1,format:'webp'};}
  if(type==='VP8 '&&b.length>=30&&b[23]===0x9d&&b[24]===1&&b[25]===0x2a)return {width:b.readUInt16LE(26)&0x3fff,height:b.readUInt16LE(28)&0x3fff,format:'webp'};
 }
 if(b[0]===0xff&&b[1]===0xd8){
  let offset=2;
  while(offset+4<=b.length){
   if(b[offset++]!==0xff)throw Error('Malformed JPEG marker');
   while(b[offset]===0xff)offset++;
   const marker=b[offset++];
   if(marker===0xd9||marker===0xda)break;
   if(marker===0x01||(marker>=0xd0&&marker<=0xd7))continue;
   const length=b.readUInt16BE(offset);
   if(length<2||offset+length>b.length)throw Error('Truncated JPEG segment');
   if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)){
    if(length<7)throw Error('Truncated JPEG frame');
    return {height:b.readUInt16BE(offset+3),width:b.readUInt16BE(offset+5),format:'jpeg'};
   }
   offset+=length;
  }
 }
 throw Error('Unsupported or malformed image header');
}
