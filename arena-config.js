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

/* The chosen memory must exist before the base start() builds run/spec/HUD.
   Keep it on globalThis during that short window so every extension reads the
   exact same capacity from the first frame. */
globalThis.arenaPendingMemory=0;
const arenaBaseSpecForConfig=spec;
spec=function(c){
  const result=arenaBaseSpecForConfig(c);
  const pending=Number(globalThis.arenaPendingMemory);
  const memory=Number.isFinite(pending)&&pending>0?pending:arenaSelectedMemory(c);
  result.shield=Math.min(60,Math.max(0,Math.round(12*Math.log2(Math.max(1,memory)/16))));
  result.memoryCapacity=memory;
  return result;
};

const arenaBasePreviewForConfig=preview;
preview=function(){
  syncArenaMemoryOptions();
  arenaBasePreviewForConfig();
  const c=selected(),memory=arenaSelectedMemory(c);
  const note=document.createElement('p');
  note.className='ratios config-note';
  note.textContent=`選択構成：${c.cpu} CPU / ${c.gpu} GPU / ${memory}GB unified memory`;
  $('stats').append(note);
};

const arenaBaseStartForConfig=start;
start=function(){
  const memory=arenaSelectedMemory();
  globalThis.arenaPendingMemory=memory;
  try{
    arenaBaseStartForConfig();
    if(run){
      run.memoryCapacity=memory;
      run.memoryConfiguration=memory;
      run.selectedMemory=memory;
    }
  }finally{
    globalThis.arenaPendingMemory=0;
  }
  if(run)hud();
};

/* game.js registered the original start function before this extension loaded.
   Replace that listener so tapping the actual UI button uses the configured memory. */
const startButtonForConfig=document.getElementById('start');
startButtonForConfig?.removeEventListener('click',arenaBaseStartForConfig);
startButtonForConfig?.addEventListener('click',start);

const arenaBaseBestKeyForConfig=bestKey;
bestKey=function(){return `${arenaBaseBestKeyForConfig()}-mem${run?.selectedMemory||arenaSelectedMemory()}`;};

const chipSelectForConfig=document.getElementById('chip');
const memorySelectForConfig=document.getElementById('memoryConfig');
chipSelectForConfig?.addEventListener('change',()=>preview());
memorySelectForConfig?.addEventListener('change',()=>{preview();showBest();});
