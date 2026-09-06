(function(){
'use strict';
if(!globalThis.ChipArt)return;
const baseHtml=ChipArt.html,baseDraw=ChipArt.draw;
const esc=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));

ChipArt.html=function(name,className='',eager=false){
  if(ChipArt.baseName(name)!=='A18 Pro')return baseHtml(name,className,eager);
  const a=ChipArt.asset(name);
  if(!a)return baseHtml(name,className,eager);
  return `<span class="official-chip ${esc(className)} a18-pro-art" role="img" aria-label="A18 Pro Apple公式画像"><span class="art-fallback">A18 Pro</span><img class="a18-pro-contain" src="${esc(a.url)}" alt="" aria-hidden="true" draggable="false" loading="${eager?'eager':'lazy'}" decoding="async" referrerpolicy="no-referrer" onload="this.parentElement.classList.add('art-ready')" onerror="this.hidden=true"></span>`;
};

ChipArt.draw=function(ctx,name,x,y,size){
  if(ChipArt.baseName(name)!=='A18 Pro')return baseDraw(ctx,name,x,y,size);
  const img=ChipArt.prepare(name);
  if(!img||!img.complete||!img.naturalWidth||!img.naturalHeight)return false;
  const scale=Math.min(size/img.naturalWidth,size/img.naturalHeight);
  const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
  ctx.save();
  ctx.fillStyle='#050505';
  ctx.fillRect(x,y,size,size);
  ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,x+(size-w)/2,y+(size-h)/2,w,h);
  ctx.restore();
  return true;
};
})();
