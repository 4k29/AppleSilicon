'use strict';
/* Real configuration selector for Silicon Arena.
   CPU/GPU variants come from the chip dropdown; unified-memory options come
   directly from each configuration's `memory` array in the comparison data. */
function arenaMemoryOptions(chip){
  return [...new Set((Array.isArray(chip?.memory)?chip.memory:[]).map(Number).filter(n=>Number.isFinite(n)&&n>0))].sort((a,b)=>a-b);
}
function arenaSelectedMemory(chip=selected()){
  const options=arenaMemoryOptions(chip);
  const selectEl=document.getElementById('memoryConfig');
  const value=Number(selectEl?.value);
  return options.includes(value)?value:(options.at(-1)||8);
}
function syncArenaMemoryOptions(){
  const chip=selected?.();
  const selectEl=document.getElementById('memoryConfig');
  if(!chip||!selectEl)return;
  const options=arenaMemoryOptions(chip),previous=Number(selectEl.value);
  selectEl.replaceChildren();
  for(const value of options){
    const option=document.createElement('option');
    option.value=String(value);
    option.textContent=`${value} GB`;
    selectEl.append(option);
  }
  selectEl.value=String(options.includes(previous)?previous:(options.at(-1)||8));
  selectEl.disabled=options.length<=1;
}

const arenaBaseSpecForConfig=spec;
spec=function(c){
  const result=arenaBaseSpecForConfig(c);
  const memory=arenaSelectedMemory(c);
  result.shield=Math.min(60,Math.max(0,Math.round(12*Math.log2(Math.max(1,memory)/16))));
  return result;
};

const arenaBasePreviewForConfig=preview;
preview=function(){
  syncArenaMemoryOptions();
  arenaBasePreviewForConfig();
  const note=document.createElement('p');
  note.className='ratios config-note';
  note.textContent=`選択構成：${selected().cpu} CPU / ${selected().gpu} GPU / ${arenaSelectedMemory()}GB unified memory`;
  $('stats').append(note);
};

const arenaBaseStartForConfig=start;
start=function(){
  const memory=arenaSelectedMemory();
  arenaBaseStartForConfig();
  if(run){
    run.memoryCapacity=memory;
    run.memoryConfiguration=memory;
    hud();
  }
};

const arenaBaseBestKeyForConfig=bestKey;
bestKey=function(){return `${arenaBaseBestKeyForConfig()}-mem${arenaSelectedMemory()}`;};

const chipSelectForConfig=document.getElementById('chip');
const memorySelectForConfig=document.getElementById('memoryConfig');
chipSelectForConfig?.addEventListener('change',()=>preview());
memorySelectForConfig?.addEventListener('change',()=>{preview();showBest();});
