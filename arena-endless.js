'use strict';
/* Endless-mode extension for Silicon Arena.
   Keeps the first three bosses intact, then adds recurring M-chip bosses and
   mixes M-series enemies into the normal waves after the arena is secured. */
const ENDLESS_BOSS_INTERVAL=45;
const ENDLESS_M_CHIPS=['M1','M1 Pro','M1 Max','M2','M2 Pro','M2 Max','M2 Ultra','M3','M3 Pro','M3 Max','M3 Ultra','M4','M4 Pro','M4 Max','M5','M5 Pro','M5 Max'];
const ENDLESS_BOSSES=['M4 Max','M5 Max','M5 Ultra','M6','M1 Ultra','M2 Ultra','M3 Ultra'];

function endlessRepresentative(name){
  return chips.filter(c=>c.chip===name&&c.bench&&c.bench.single>0&&c.bench.multi>0&&c.bench.metal>0)
    .sort((a,b)=>(b.gpu||0)-(a.gpu||0))[0]||null;
}
function endlessPool(){
  const elapsed=Math.max(0,run.t-(run.conquestAt||run.t));
  const count=Math.min(ENDLESS_M_CHIPS.length,4+Math.floor(elapsed/28));
  return ENDLESS_M_CHIPS.slice(0,count).filter(name=>endlessRepresentative(name)&&ChipArt.asset(name));
}
function spawnEndlessM(){
  const r=run,difficulty=mode==='hard'?1.35:1,stage=Math.floor(r.t/30);
  const pool=endlessPool();
  if(!pool.length)return false;
  const name=(r.endlessMSpawned||0)===0&&pool.includes('M1')?'M1':pool[Math.floor(Math.random()*pool.length)];
  const chip=endlessRepresentative(name);
  if(!chip)return false;
  const side=Math.floor(rand(0,4));
  const x=side===0?-25:side===1?W+25:rand(0,W),y=side===2?-25:side===3?H+25:rand(0,H);
  const single=Math.max(1,chip.bench.single/baseline.bench.single);
  const multi=Math.max(1,chip.bench.multi/baseline.bench.multi);
  const hp=(58+stage*22)*(1+.42*Math.log2(multi))*difficulty;
  const speed=(48+stage*7)*(1+.12*Math.log2(single));
  const damage=Math.min(14,5+Math.floor(3*Math.log2(multi)));
  r.enemies.push({id:Math.random(),x,y,kind:'mchip',hp,maxHp:hp,r:17,speed,damage,shotDamage:0,shotInterval:99,shoot:99,flash:0,name,orbitCd:0});
  r.endlessMSpawned=(r.endlessMSpawned||0)+1;
  return true;
}
function spawnEndlessBoss(){
  const r=run,difficulty=mode==='hard'?1.35:1,index=Math.max(0,r.spawnedBosses-3);
  const name=ENDLESS_BOSSES[index%ENDLESS_BOSSES.length];
  const side=Math.floor(rand(0,4));
  const x=side===0?-32:side===1?W+32:rand(0,W),y=side===2?-32:side===3?H+32:rand(0,H);
  const hp=380*(1+r.spawnedBosses*.38)*difficulty;
  const speed=Math.min(54,30+r.spawnedBosses*2);
  const damage=Math.min(40,25+Math.floor(index/2)*2);
  r.enemies.push({id:Math.random(),x,y,kind:'boss',hp,maxHp:hp,r:30,speed,damage,shotDamage:0,shotInterval:99,shoot:99,flash:0,name,orbitCd:0});
  r.spawnedBosses++;
  announce(name+' / ENDLESS BOSS');
  return true;
}

const arenaBaseSpawn=spawn;
spawn=function(boss=false){
  if(boss&&run?.conquered)return spawnEndlessBoss();
  if(!boss&&run?.conquered){
    const forceFirst=(run.endlessMSpawned||0)===0;
    if(forceFirst||Math.random()<.38){if(spawnEndlessM())return;}
  }
  return arenaBaseSpawn(boss);
};

const arenaBaseConquer=conquer;
conquer=function(){
  const already=run?.conquered;
  arenaBaseConquer();
  if(run&&!already&&run.conquered){
    run.conquestAt=run.t;
    run.endlessMSpawned=0;
    run.nextEndlessBossAt=run.t+30;
    for(const name of [...ENDLESS_M_CHIPS,...ENDLESS_BOSSES])ChipArt.prepare(name);
  }
};

const arenaBaseUpdate=update;
update=function(dt){
  arenaBaseUpdate(dt);
  if(state!=='running'||!run?.conquered)return;
  if(!Number.isFinite(run.nextEndlessBossAt))run.nextEndlessBossAt=run.t+30;
  const bossAlive=run.enemies.some(e=>e.kind==='boss');
  if(run.t>=run.nextEndlessBossAt&&!bossAlive){
    spawn(true);
    run.nextEndlessBossAt=run.t+ENDLESS_BOSS_INTERVAL;
  }
};
