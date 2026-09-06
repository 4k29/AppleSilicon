'use strict';
/* Live memory-load simulation for Silicon Arena.
   Capacity uses the exact real memory configuration selected in the loadout.
   Usage is game telemetry, not measured real-world unified-memory usage. */
function arenaMemoryCapacity(r){
  const selectedCapacity=Number(r?.selectedMemory||r?.memoryConfiguration||r?.memoryCapacity);
  if(Number.isFinite(selectedCapacity)&&selectedCapacity>0)return selectedCapacity;
  const pending=Number(globalThis.arenaPendingMemory);
  if(Number.isFinite(pending)&&pending>0)return pending;
  const options=typeof arenaMemoryOptions==='function'?arenaMemoryOptions(r?.chip):[];
  const selected=Number(document.getElementById('memoryConfig')?.value);
  if(options.includes(selected))return selected;
  return options.at(-1)||8;
}
function arenaMemoryUsage(r){
  if(!r)return 0;
  const capacity=arenaMemoryCapacity(r);
  const bosses=r.enemies.filter(e=>e.kind==='boss').length;
  const mchips=r.enemies.filter(e=>e.kind==='mchip').length;
  const normal=Math.max(0,r.enemies.length-bosses-mchips);
  const upgradeCount=Object.values(r.upgrades||{}).reduce((sum,n)=>sum+(Number(n)||0),0);
  /* Same arena workload should consume roughly the same amount regardless of
     how much RAM the selected configuration has; larger capacities show more headroom. */
  const base=1.8;
  const workload=
    normal*.045+
    mchips*.12+
    bosses*.72+
    r.bullets.length*.014+
    r.gems.length*.006+
    (r.orbits||0)*.28+
    upgradeCount*.10+
    (r.oc?.75:0)+
    (r.conquered?.55:0);
  return Math.min(capacity*.97,base+workload);
}
function updateArenaMemoryHud(){
  if(!run)return;
  const meter=document.getElementById('memory');
  const text=document.getElementById('memoryText');
  if(!meter||!text)return;
  const capacity=arenaMemoryCapacity(run),used=arenaMemoryUsage(run),ratio=used/capacity;
  meter.max=capacity;
  meter.value=used;
  text.textContent=`${used.toFixed(1)} / ${capacity} GB`;
  text.dataset.pressure=ratio>=.85?'high':ratio>=.65?'medium':'normal';
  meter.setAttribute('aria-label',`ゲーム内メモリ使用量 ${used.toFixed(1)} / ${capacity} GB`);
}
const arenaHudBeforeMemory=hud;
hud=function(){
  arenaHudBeforeMemory();
  updateArenaMemoryHud();
};
