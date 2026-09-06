/* Apple product artwork. Source and display segment are shared by every page.
   The original raster files are loaded from the credited publisher; no logos
   are recreated and no chip name is substituted on another chip's artwork. */
(function(root){
'use strict';
const catalog={};
function family(names,url,source){names.forEach((name,index)=>{catalog[name]={url,source,columns:names.length,index};});}
function single(name,url,source){catalog[name]={url,source,columns:1,index:0};}

/* M1 family: use a dedicated Apple image for each chip. The M1 family lineup
   artwork places the four packages at very different vertical positions, so
   splitting that hero image into four equal columns produced incorrect/blank
   crops in the comparison, Arena and especially the first 2048 tiles. */
single('M1','https://www.apple.com/newsroom/images/product/mac/standard/Apple_new-m1-chip-graphic_11102020_big.jpg.large.jpg','https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/');
single('M1 Pro','https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_M1-Pro_10182021_big_carousel.jpg.large.jpg','https://www.apple.com/newsroom/2021/10/apple-unveils-game-changing-macbook-pro/');
single('M1 Max','https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_M1-Max_10182021_big_carousel.jpg.large.jpg','https://www.apple.com/newsroom/2021/10/apple-unveils-game-changing-macbook-pro/');
single('M1 Ultra','https://www.apple.com/newsroom/images/product/mac/standard/Apple-M1-Ultra-hero-220308_big.jpg.large.jpg','https://www.apple.com/newsroom/2022/03/apple-unveils-m1-ultra-the-worlds-most-powerful-chip-for-a-personal-computer/');

single('M2','https://www.apple.com/newsroom/images/live-action/wwdc-2022/Apple-WWDC22-M2-chip-hero-220606_big.jpg.large.jpg','https://www.apple.com/newsroom/2022/06/apple-unveils-m2-with-breakthrough-performance-and-capabilities/');
family(['M2 Pro','M2 Max'],'https://www.apple.com/newsroom/images/product/mac/standard/Apple-M2-chips-hero-230117_big.jpg.large.jpg','https://www.apple.com/newsroom/2023/01/apple-unveils-m2-pro-and-m2-max-next-generation-chips-for-next-level-workflows/');
single('M2 Ultra','https://www.apple.com/newsroom/images/live-action/wwdc-2023/standard/m2/Apple-WWDC23-M2-Ultra-chip-230605_big.jpg.large.jpg','https://www.apple.com/newsroom/2023/06/apple-introduces-m2-ultra/');
family(['M3','M3 Pro','M3 Max'],'https://www.apple.com/newsroom/images/2023/10/Apple-unveils-M3-M3-Pro-and-M3-Max/article/Apple-M3-chip-series-231030_big.jpg.large.jpg','https://www.apple.com/newsroom/2023/10/apple-unveils-m3-m3-pro-and-m3-max-the-most-advanced-chips-for-a-personal-computer/');
single('M3 Ultra','https://www.apple.com/newsroom/images/2025/03/apple-reveals-m3-ultra-taking-apple-silicon-to-a-new-extreme/article/Apple-M3-Ultra-hero-250305_big.jpg.large.jpg','https://www.apple.com/newsroom/2025/03/apple-reveals-m3-ultra-taking-apple-silicon-to-a-new-extreme/');
family(['M4','M4 Pro','M4 Max'],'https://www.apple.com/newsroom/images/2024/10/apple-introduces-m4-pro-and-m4-max/article/Apple-M4-chip-series-hero_big.jpg.large.jpg','https://www.apple.com/newsroom/2024/10/apple-introduces-m4-pro-and-m4-max/');
single('M5','https://www.apple.com/newsroom/images/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/article/Apple-M5-hero-251015_inline.jpg.large.jpg','https://www.apple.com/newsroom/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/');
family(['M5 Pro','M5 Max'],'https://www.apple.com/newsroom/images/2026/03/apple-debuts-m5-pro-and-m5-max-to-supercharge-the-most-demanding-pro-workflows/article/Apple-M5-Pro-M5-Max-chips-260303_big.jpg.large.jpg','https://www.apple.com/newsroom/2026/03/apple-debuts-m5-pro-and-m5-max-to-supercharge-the-most-demanding-pro-workflows/');
family(['M6','M5 Ultra'],'https://www.apple.com/newsroom/images/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/article/Apple-M6-and-M5-Ultra-hero-260825_big.jpg.large.jpg','https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/');

family(['A18 Pro'],'https://eshop.orange.be/media/wysiwyg/BA/Apple/iphone_16_pro/iphone-16-pro-chip.png','https://eshop.orange.be/fr/appareils/smartphones-gsm/apple-iphone-16-pro-max');
family(['A19'],'https://theapplewiki.com/images/applewiki/2/29/Apple_A19.png','https://theapplewiki.com/wiki/File:Apple_A19.png');
family(['A19 Pro'],'https://i.nextmedia.com.au/News/apple_a19_pro.jpg','https://www.itnews.com.au/news/apple-adds-mercenary-spyware-protection-to-new-a19-chip-620190');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function html(name,className='',eager=false){const a=catalog[name];return `<span class="official-chip ${esc(className)}" role="img" aria-label="${esc(name)}${a?' 製品画像':''}"><span class="art-fallback">${esc(name)}</span>${a?`<img src="${esc(a.url)}" alt="" aria-hidden="true" draggable="false" loading="${eager?'eager':'lazy'}" decoding="async" referrerpolicy="no-referrer" style="width:${a.columns*100}%;left:${-a.index*100}%" onload="this.parentElement.classList.add('art-ready')" onerror="this.hidden=true">`:''}</span>`;}
function element(name,className='',eager=false){const wrap=document.createElement('span');wrap.innerHTML=html(name,className,eager);return wrap.firstElementChild;}
const cache=new Map();
function prepare(name){const a=catalog[name];if(!a)return null;if(!cache.has(a.url)){const img=new Image();img.referrerPolicy='no-referrer';img.decoding='async';img.src=a.url;cache.set(a.url,img);}return cache.get(a.url);}
function crop(width,height,columns,index){const cell=width/columns,size=Math.min(cell,height);return{x:index*cell+(cell-size)/2,y:(height-size)/2,size};}
function draw(ctx,name,x,y,size){const a=catalog[name],img=prepare(name);if(!a||!img||!img.complete||!img.naturalWidth)return false;const c=crop(img.naturalWidth,img.naturalHeight,a.columns,a.index);ctx.drawImage(img,c.x,c.y,c.size,c.size,x,y,size,size);return true;}
root.ChipArt={catalog,html,element,prepare,draw,crop};
})(globalThis);
