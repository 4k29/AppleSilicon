'use strict';
/* Strength-scaled CORE rewards for Silicon Arena.
   CORE value, size and color are derived from the defeated chip's relative strength. */
const ARENA_CORE_COLORS=['#8be8dd','#74b9ff','#a78bfa','#f08bd7','#ffd166'];

function arenaCoreRepresentative(name){
  return chips.filter(c=>c.chip===name&&c.bench&&c.bench.single>0&&c.bench.multi>0&&c.bench.metal>0)
    .sort((a,b)=>(b.gpu||0)-(a.gpu||0))[0]||null;
}
function arenaCoreStrength(name){
  if(name==='A18 Pro')return 1;
  if(name==='A19 Pro'){
    const r=enemyModels?.a19?.ratios;
    if(r)return Math.cbrt(Math.max(.01,r.single*r.multi*r.metal));
    return 1.35;
  }
  const chip=arenaCoreRepresentative(name);
  if(!chip||!baseline)return 1;
  const single=Math.max(.01,chip.bench.single/baseline.bench.single);
  const multi=Math.max(.01,chip.bench.multi/baseline.bench.multi);
  const metal=Math.max(.01,chip.bench.metal/baseline.bench.metal);
  return 2.25*Math.cbrt(single*multi*metal);
}
function arenaCoreTier(strength){
  if(strength<1.2)return 0;
  if(strength<2.0)return 1;
  if(strength<3.5)return 2;
  if(strength<5.5)return 3;
  return 4;
}
function arenaCoreNormalValue(strength){
  return Math.max(1,Math.round(1+Math.log2(Math.max(1,strength))*2.2));
}
function arenaDecorateCore(g,strength,source){
  const tier=arenaCoreTier(strength);
  g.coreStrength=strength;
  g.coreTier=tier;
  g.coreColor=ARENA_CORE_COLORS[tier];
  g.coreSize=[6,8,10,12,14][tier];
  g.sourceChip=source;
}
function arenaScaleBossCores(created,strength){
  const current=created.reduce((sum,g)=>sum+(Number(g.value)||0),0);
  if(current<=0)return;
  const factor=Math.min(1.85,1+Math.log2(Math.max(1,strength))*.18);
  const target=Math.max(current,Math.round(current*factor));
  let assigned=0;
  for(let i=0;i<created.length;i++){
    const g=created[i];
    const value=i===created.length-1?target-assigned:Math.max(1,Math.round(target*(g.value/current)));
    g.value=value;
    assigned+=value;
  }
  if(assigned!==target)created[created.length-1].value+=target-assigned;
}

const arenaKillBeforeCoreScaling=kill;
kill=function(e){
  const start=run?.gems?.length||0;
  arenaKillBeforeCoreScaling(e);
  if(!run||!e)return;
  const created=run.gems.slice(start);
  if(!created.length)return;
  const strength=arenaCoreStrength(e.name);
  if(e.kind==='boss')arenaScaleBossCores(created,strength);
  else created[0].value=arenaCoreNormalValue(strength);
  for(const g of created)arenaDecorateCore(g,strength,e.name);
};

/* game.js draws COREs as 6px cyan diamonds. Intercept only those draw calls so
   each existing CORE is rendered at its strength-derived size and color while
   preserving the original draw order beneath enemies and the player. */
const arenaDrawBeforeCoreStyling=draw;
draw=function(){
  if(!run)return arenaDrawBeforeCoreStyling();
  const originalFillRect=ctx.fillRect;
  let gemIndex=0;
  ctx.fillRect=function(x,y,w,h){
    if(x===-3&&y===-3&&w===6&&h===6&&gemIndex<run.gems.length){
      const g=run.gems[gemIndex++],size=Number(g.coreSize)||6;
      const previous=ctx.fillStyle;
      ctx.fillStyle=g.coreColor||'#8be8dd';
      originalFillRect.call(ctx,-size/2,-size/2,size,size);
      ctx.fillStyle=previous;
      return;
    }
    return originalFillRect.call(ctx,x,y,w,h);
  };
  try{arenaDrawBeforeCoreStyling();}
  finally{ctx.fillRect=originalFillRect;}
};
