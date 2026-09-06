/* Shared chip artwork inspired by the proportions of Apple's official M1 hero.
   Every model uses the same black package, large Apple mark + model number,
   metallic face treatment and a restrained luminous edge. */
(function(root){
'use strict';
const known=['M1','M1 Pro','M1 Max','M1 Ultra','M2','M2 Pro','M2 Max','M2 Ultra','M3','M3 Pro','M3 Max','M3 Ultra','M4','M4 Pro','M4 Max','M5','M5 Pro','M5 Max','M5 Ultra','M6','A18 Pro','A19','A19 Pro'];
const catalog=Object.fromEntries(known.map(name=>[name,{name}]));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
function parts(name){const tokens=String(name).trim().split(/\s+/);return{model:tokens.shift()||'',variant:tokens.join(' ')}};
function html(name,className='',eager=false){const p=parts(name);return `<span class="official-chip m1-style ${esc(className)}" role="img" aria-label="${esc(name)}"><span class="chip-face"><span class="chip-mark"><span class="chip-apple"></span><span class="chip-model">${esc(p.model)}</span></span>${p.variant?`<span class="chip-variant">${esc(p.variant)}</span>`:''}</span></span>`;}
function element(name,className='',eager=false){const wrap=document.createElement('span');wrap.innerHTML=html(name,className,eager);return wrap.firstElementChild;}
function prepare(){return true;}
function rounded(ctx,x,y,w,h,r){ctx.beginPath();if(typeof ctx.roundRect==='function')ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);}
function metallic(ctx,x,y,size){if(typeof ctx.createLinearGradient!=='function')return '#e7e8ea';const g=ctx.createLinearGradient(x,y,x+size,y+size);if(!g||typeof g.addColorStop!=='function')return '#e7e8ea';g.addColorStop(0,'#f8f8f9');g.addColorStop(.28,'#b9bcc2');g.addColorStop(.53,'#ffffff');g.addColorStop(.76,'#a5a8ae');g.addColorStop(1,'#eceef1');return g;}
function draw(ctx,name,x,y,size){const p=parts(name),hasVariant=Boolean(p.variant),r=Math.max(1.5,size*.035);ctx.save();ctx.fillStyle='#030303';rounded(ctx,x,y,size,size,r);ctx.fill();
ctx.strokeStyle='rgba(222,226,234,.34)';ctx.lineWidth=Math.max(.65,size*.014);rounded(ctx,x+.5,y+.5,size-1,size-1,Math.max(1,r-.5));ctx.stroke();
ctx.fillStyle=metallic(ctx,x,y,size);ctx.textAlign='center';ctx.textBaseline='middle';const main=`${p.model}`;ctx.font=`600 ${size*(hasVariant?.315:.34)}px -apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif`;ctx.fillText(main,x+size*.5,y+size*(hasVariant?.445:.505),size*.82);
if(hasVariant){ctx.fillStyle='rgba(224,226,231,.88)';ctx.font=`600 ${size*.112}px -apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif`;ctx.fillText(p.variant.toUpperCase(),x+size*.5,y+size*.655,size*.63);}ctx.restore();return true;}
root.ChipArt={catalog,html,element,prepare,draw,parts};
})(globalThis);
