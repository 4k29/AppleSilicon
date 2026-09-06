/* Shared stylized chip face used by the comparison page and both games.
   No external chip images are loaded: every chip is rendered consistently as
   a black package with an Apple glyph and the chip model name. */
(function(root){
'use strict';
const known=['M1','M1 Pro','M1 Max','M1 Ultra','M2','M2 Pro','M2 Max','M2 Ultra','M3','M3 Pro','M3 Max','M3 Ultra','M4','M4 Pro','M4 Max','M5','M5 Pro','M5 Max','M5 Ultra','M6','A18 Pro','A19','A19 Pro'];
const catalog=Object.fromEntries(known.map(name=>[name,{name}]));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function parts(name){const tokens=String(name).trim().split(/\s+/);return{model:tokens.shift()||'',variant:tokens.join(' ')}};
function html(name,className='',eager=false){const p=parts(name);return `<span class="official-chip text-chip ${esc(className)}" role="img" aria-label="${esc(name)}"><span class="chip-face"><span class="chip-main"><span class="chip-apple"></span>${esc(p.model)}</span>${p.variant?`<span class="chip-variant">${esc(p.variant)}</span>`:''}</span></span>`;}
function element(name,className='',eager=false){const wrap=document.createElement('span');wrap.innerHTML=html(name,className,eager);return wrap.firstElementChild;}
function prepare(){return true;}
function rounded(ctx,x,y,w,h,r){ctx.beginPath();if(typeof ctx.roundRect==='function')ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);}
function draw(ctx,name,x,y,size){const p=parts(name),hasVariant=Boolean(p.variant),r=Math.max(2,size*.11);ctx.save();ctx.fillStyle='#050505';rounded(ctx,x,y,size,size,r);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.13)';ctx.lineWidth=Math.max(.7,size*.025);rounded(ctx,x+.5,y+.5,size-1,size-1,Math.max(1,r-.5));ctx.stroke();ctx.fillStyle='#f5f5f7';ctx.textAlign='center';ctx.textBaseline='middle';const main=`${p.model}`;ctx.font=`600 ${size*(hasVariant?.29:.31)}px -apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif`;ctx.fillText(main,x+size/2,y+size*(hasVariant?.43:.51),size*.84);if(hasVariant){ctx.fillStyle='rgba(245,245,247,.78)';ctx.font=`550 ${size*.125}px -apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif`;ctx.fillText(p.variant,x+size/2,y+size*.67,size*.76);}ctx.restore();return true;}
root.ChipArt={catalog,html,element,prepare,draw,parts};
})(globalThis);
