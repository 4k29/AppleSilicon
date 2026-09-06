const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(require('path').join(__dirname,'index.html'),'utf8'),data=html.match(/<script[^>]*id="chip-data"[^>]*>([\s\S]*?)<\/script>/)[1];
const context2d=new Proxy({},{get:()=>()=>{}});class El{constructor(){this.value='';this.dataset={};this.children=[];this.firstChild={textContent:''};this.attrs={};this.hidden=false;}append(...a){this.children.push(...a)}replaceChildren(){this.children=[]}addEventListener(){}focus(){}setAttribute(k,v){this.attrs[k]=v}querySelector(){return this.children[0]||new El()}getBoundingClientRect(){return{width:390,height:480,left:0,top:0}}getContext(){return context2d}matches(){return false}}
const els={},modes=['normal','hard'].map(mode=>{const e=new El();e.dataset.mode=mode;return e});const sandbox={console,Intl,Math,Set,Number,devicePixelRatio:2,matchMedia:()=>({matches:false}),requestAnimationFrame:()=>1,document:{getElementById:id=>els[id]??=new El(),createElement:()=>new El(),querySelectorAll:()=>modes,addEventListener(){}},window:{addEventListener(){}},localStorage:{getItem(){return null},setItem(){}},DOMParser:class{parseFromString(){return{getElementById:()=>({textContent:data})}}},fetch:async()=>({ok:true,text:async()=>html})};sandbox.Image=class{constructor(){this.complete=true;this.naturalWidth=1960;this.naturalHeight=1102;}};vm.createContext(sandbox);vm.runInContext(fs.readFileSync(require('path').join(__dirname,'chip-art.js'),'utf8'),sandbox);vm.runInContext(fs.readFileSync(require('path').join(__dirname,'game.js'),'utf8'),sandbox);
setImmediate(()=>{vm.runInContext(`
function check(x,msg){if(!x)throw Error(msg)}
check(chips.length===27,'data count');
check(enemyModels.a18.name==='A18 Pro'&&enemyModels.a19.name==='A19 Pro','enemy labels');
for(const k of ['single','multi','metal'])check(enemyModels.a19.ratios[k]>enemyModels.a18.ratios[k],'A19 stronger '+k);
start();spawn();check(run.enemies[0].name==='A18 Pro','normal enemy');run.t=20;for(let i=0;i<50;i++)spawn();check(run.enemies.some(e=>e.name==='A19 Pro'),'strong enemy');for(const e of run.enemies){check(Number.isFinite(e.damage)&&e.damage>0,'contact damage');check(Number.isFinite(e.shotDamage)&&e.shotDamage>0,'shot damage');}
for(const c of chips){const s=spec(c);check(s.interval>0&&s.shots>=1&&s.shots<=6&&s.damage>0&&s.shield>=0,'stats')}
start();check(state==='running','start');draw();
const oldY=run.y;keys.add('arrowup');update(.03);check(run.y<oldY,'movement');keys.clear();
pointer={sx:0,sy:0,x:42,y:0};const oldX=run.x;update(.03);check(run.x>oldX,'touch move');pointer=null;
dash();check(run.dashCd>0&&run.invuln>0,'dash');const cooldown=run.dashCd;dash();check(run.dashCd===cooldown,'dash gate');
oc();check(run.oc,'OC on');for(let i=0;i<120;i++)update(.03);check(run.locked&&!run.oc,'thermal limit');for(let i=0;i<125;i++){run.invuln=10;update(.03)}check(!run.locked,'cooldown');
pause();check(state==='paused','pause');resume();check(state==='running','resume');
run.xp=run.need;levelUp();check(state==='upgrade'&&$('choices').children.length===3,'upgrade');resume();
for(const u of upgrades)u.apply(run);check(run.orbits===1&&run.pierce===1,'upgrades apply');draw();
start();run.enemies=[];spawn(true);check(run.enemies[0].kind==='boss','boss spawn');run.enemies[0].hp=0;update(.01);check(run.bosses===1&&run.gems.some(g=>g.value===15),'boss reward');
start();run.hp=0;update(.01);check(state==='ended','loss');
start();run.bosses=3;update(.01);check(state==='ended'&&$('dialogTitle').textContent==='アリーナ制圧。','win');
start();run.t=150;update(.01);check(state==='ended','time limit');home();check(state==='setup'&&run===null,'home');
for(let test=0;test<3;test++){start();for(let i=0;i<5000&&state!=='ended';i++){if(state==='upgrade'){upgrades[i%upgrades.length].apply(run);resume();}run.invuln=2;pointer={sx:0,sy:0,x:Math.cos(i*.02)*42,y:Math.sin(i*.02)*42};update(.03);if(i%20===0)draw();check(Number.isFinite(run.hp)&&Number.isFinite(run.x),'finite state');}check(run.spawnedBosses===3,'three bosses in long run');check(run.enemies.length<=66&&run.bullets.length<=240&&run.hostile.length<=240&&run.gems.length<=160,'entity caps');console.log('simulation',test,Math.floor(run.t)+'s',run.kills+' kills',run.level+' levels',state);}
console.log('PASS: 27 chip stats, keyboard/touch, dash, OC overheat/cooling, pause, upgrades, boss reward, win/loss, timeout, replay, long simulations');
`,sandbox)});
