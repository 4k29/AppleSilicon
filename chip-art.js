/* Apple official chip artwork shared by the comparison page and both games.
   Images are loaded directly from Apple. Multi-chip hero images are not edited;
   only the visible source rectangle is selected for each model. */
(function(root){
'use strict';
const catalog={};
const add=(name,url,source,crop=null)=>{catalog[name]={url,source,crop};};

add('M1','https://www.apple.com/newsroom/images/product/mac/standard/Apple_new-m1-chip-graphic_11102020_big.jpg.large.jpg','https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/');
// Apple’s official M1 Pro / M1 Max hero contains the two finished black chip packages side by side.
// Crop the package itself (not the enlarged die shots used elsewhere in the Newsroom article).
add('M1 Pro','https://www.apple.com/newsroom/images/product/mac/standard/Apple_M1-Pro-M1-Max_Chips_10182021_big.jpg.large.jpg','https://www.apple.com/newsroom/2021/10/introducing-m1-pro-and-m1-max-the-most-powerful-chips-apple-has-ever-built/',{x:.124,y:.224,w:.359,h:.552});
add('M1 Max','https://www.apple.com/newsroom/images/product/mac/standard/Apple_M1-Pro-M1-Max_Chips_10182021_big.jpg.large.jpg','https://www.apple.com/newsroom/2021/10/introducing-m1-pro-and-m1-max-the-most-powerful-chips-apple-has-ever-built/',{x:.516,y:.224,w:.359,h:.552});
add('M1 Ultra','https://www.apple.com/newsroom/images/product/mac/standard/Apple-M1-Ultra-hero-220308_big.jpg.large.jpg','https://www.apple.com/newsroom/2022/03/apple-unveils-m1-ultra-the-worlds-most-powerful-chip-for-a-personal-computer/');

add('M2','https://www.apple.com/newsroom/images/live-action/wwdc-2022/Apple-WWDC22-M2-chip-hero-220606_big.jpg.large.jpg','https://www.apple.com/newsroom/2022/06/apple-unveils-m2-with-breakthrough-performance-and-capabilities/');
add('M2 Pro','https://www.apple.com/newsroom/images/product/mac/standard/Apple-M2-chips-hero-230117_big.jpg.large.jpg','https://www.apple.com/newsroom/2023/01/apple-unveils-m2-pro-and-m2-max-next-generation-chips-for-next-level-workflows/',{x:.1143,y:.1706,w:.3704,h:.6588});
add('M2 Max','https://www.apple.com/newsroom/images/product/mac/standard/Apple-M2-chips-hero-230117_big.jpg.large.jpg','https://www.apple.com/newsroom/2023/01/apple-unveils-m2-pro-and-m2-max-next-generation-chips-for-next-level-workflows/',{x:.5143,y:.1706,w:.3724,h:.6588});
add('M2 Ultra','https://www.apple.com/newsroom/images/live-action/wwdc-2023/Apple-WWDC23-M2-Ultra-chip-230605_big.jpg.large.jpg','https://www.apple.com/newsroom/2023/06/apple-introduces-m2-ultra/');

add('M3','https://www.apple.com/newsroom/images/2023/10/Apple-unveils-M3-M3-Pro-and-M3-Max/article/Apple-M3-chip-series-231030_big.jpg.large.jpg','https://www.apple.com/newsroom/2023/10/apple-unveils-m3-m3-pro-and-m3-max-the-most-advanced-chips-for-a-personal-computer/',{x:.0531,y:.2523,w:.2786,h:.4955});
add('M3 Pro','https://www.apple.com/newsroom/images/2023/10/Apple-unveils-M3-M3-Pro-and-M3-Max/article/Apple-M3-chip-series-231030_big.jpg.large.jpg','https://www.apple.com/newsroom/2023/10/apple-unveils-m3-m3-pro-and-m3-max-the-most-advanced-chips-for-a-personal-computer/',{x:.3612,y:.2523,w:.2776,h:.4955});
add('M3 Max','https://www.apple.com/newsroom/images/2023/10/Apple-unveils-M3-M3-Pro-and-M3-Max/article/Apple-M3-chip-series-231030_big.jpg.large.jpg','https://www.apple.com/newsroom/2023/10/apple-unveils-m3-m3-pro-and-m3-max-the-most-advanced-chips-for-a-personal-computer/',{x:.6673,y:.2523,w:.2786,h:.4955});
add('M3 Ultra','https://www.apple.com/newsroom/images/2025/03/apple-reveals-m3-ultra-taking-apple-silicon-to-a-new-extreme/article/Apple-M3-Ultra-hero-250305_big.jpg.large.jpg','https://www.apple.com/newsroom/2025/03/apple-reveals-m3-ultra-taking-apple-silicon-to-a-new-extreme/');

add('M4','https://www.apple.com/newsroom/images/2024/10/apple-introduces-m4-pro-and-m4-max/article/Apple-M4-chip-series-hero_big.jpg.large.jpg','https://www.apple.com/newsroom/2024/10/apple-introduces-m4-pro-and-m4-max/',{x:.05,y:.2468,w:.2857,h:.5082});
add('M4 Pro','https://www.apple.com/newsroom/images/2024/10/apple-introduces-m4-pro-and-m4-max/article/Apple-M4-chip-series-hero_big.jpg.large.jpg','https://www.apple.com/newsroom/2024/10/apple-introduces-m4-pro-and-m4-max/',{x:.3561,y:.2468,w:.2867,h:.5082});
add('M4 Max','https://www.apple.com/newsroom/images/2024/10/apple-introduces-m4-pro-and-m4-max/article/Apple-M4-chip-series-hero_big.jpg.large.jpg','https://www.apple.com/newsroom/2024/10/apple-introduces-m4-pro-and-m4-max/',{x:.6633,y:.2468,w:.2867,h:.5082});

add('M5','https://www.apple.com/newsroom/images/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/article/Apple-M5-hero-251015_inline.jpg.large.jpg','https://www.apple.com/newsroom/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/');
add('M5 Pro','https://www.apple.com/newsroom/images/2026/03/apple-debuts-m5-pro-and-m5-max-to-supercharge-the-most-demanding-pro-workflows/article/Apple-M5-Pro-M5-Max-chips-260303_big.jpg.large.jpg','https://www.apple.com/newsroom/2026/03/apple-debuts-m5-pro-and-m5-max-to-supercharge-the-most-demanding-pro-workflows/',{x:.1459,y:.2069,w:.3276,h:.5826});
add('M5 Max','https://www.apple.com/newsroom/images/2026/03/apple-debuts-m5-pro-and-m5-max-to-supercharge-the-most-demanding-pro-workflows/article/Apple-M5-Pro-M5-Max-chips-260303_big.jpg.large.jpg','https://www.apple.com/newsroom/2026/03/apple-debuts-m5-pro-and-m5-max-to-supercharge-the-most-demanding-pro-workflows/',{x:.5418,y:.2069,w:.3286,h:.5826});
add('M6','https://www.apple.com/newsroom/images/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/article/Apple-M6-and-M5-Ultra-hero-260825_big.jpg.large.jpg','https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/',{x:.10,y:.16,w:.38,h:.68});
add('M5 Ultra','https://www.apple.com/newsroom/images/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/article/Apple-M6-and-M5-Ultra-hero-260825_big.jpg.large.jpg','https://www.apple.com/newsroom/2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute/',{x:.52,y:.16,w:.38,h:.68});

add('A18 Pro','https://www.apple.com/v/iphone-16-pro/c/images/overview/highlights/chip_endframe__d9ww29ytvb0i_large_2x.jpg','https://www.apple.com/jp/newsroom/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/');
add('A19','https://images.apple.com/v/iphone-17/h/images/overview/contextual_compare/slides/chip/chip__cass6fbvu9iu_large.jpg','https://www.apple.com/iphone-17/');
add('A19 Pro','https://www.apple.com/v/iphone/home/cj/images/overview/consider/chip__fh5j5on49p2e_large.jpg','https://www.apple.com/iphone/');

const esc=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
function baseName(name){const raw=String(name).trim();if(catalog[raw])return raw;const stripped=raw.replace(/\s+×\d+$/,'');return catalog[stripped]?stripped:raw;}
function asset(name){return catalog[baseName(name)]||null;}
function cropVars(c){return c?`--img-w:${100/c.w}%;--img-h:${100/c.h}%;--img-x:${-c.x/c.w*100}%;--img-y:${-c.y/c.h*100}%`:'';}
function html(name,className='',eager=false){const a=asset(name);if(!a)return `<span class="official-chip ${esc(className)}" role="img" aria-label="${esc(name)}"><span class="art-fallback">${esc(name)}</span></span>`;const cls=a.crop?'crop-art':'full-art';return `<span class="official-chip ${esc(className)}" role="img" aria-label="${esc(name)} Apple公式画像"><span class="art-fallback">${esc(name)}</span><img class="${cls}" src="${esc(a.url)}" alt="" aria-hidden="true" draggable="false" loading="${eager?'eager':'lazy'}" decoding="async" referrerpolicy="no-referrer"${a.crop?` style="${cropVars(a.crop)}"`:''} onload="this.parentElement.classList.add('art-ready')" onerror="this.hidden=true"></span>`;}
function element(name,className='',eager=false){const wrap=document.createElement('span');wrap.innerHTML=html(name,className,eager);return wrap.firstElementChild;}
const cache=new Map();
function prepare(name){const a=asset(name);if(!a)return null;if(!cache.has(a.url)){const img=new Image();img.referrerPolicy='no-referrer';img.decoding='async';img.src=a.url;cache.set(a.url,img);}return cache.get(a.url);}
function sourceRect(img,a){if(a.crop)return{x:a.crop.x*img.naturalWidth,y:a.crop.y*img.naturalHeight,w:a.crop.w*img.naturalWidth,h:a.crop.h*img.naturalHeight};const side=Math.min(img.naturalWidth,img.naturalHeight);return{x:(img.naturalWidth-side)/2,y:(img.naturalHeight-side)/2,w:side,h:side};}
function draw(ctx,name,x,y,size){const a=asset(name),img=prepare(name);if(!a||!img||!img.complete||!img.naturalWidth)return false;const c=sourceRect(img,a);ctx.drawImage(img,c.x,c.y,c.w,c.h,x,y,size,size);return true;}
root.ChipArt={catalog,html,element,prepare,draw,asset,baseName,sourceRect};
})(globalThis);
