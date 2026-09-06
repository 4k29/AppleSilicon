'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const rules=require('./2048-engine.js');
function row(values,dir='left'){return rules.slide([...values,...Array(12).fill(0)],dir);}
assert.deepEqual(row([1,1,1,1]).board.slice(0,4),[2,2,0,0]);
assert.equal(row([1,1,1,1]).gained,8);
assert.deepEqual(row([1,1,2,0]).board.slice(0,4),[2,2,0,0]);
assert.deepEqual(row([1,1,1,0],'right').board.slice(0,4),[0,0,1,2]);
assert.equal(row([1,2,3,4]).changed,false);
assert.deepEqual(rules.slide([1,0,0,0,1,0,0,0,2,0,0,0,2,0,0,0],'down').board,[0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0]);
assert.equal(rules.canMove([1,2,1,2,2,1,2,1,1,2,1,2,2,1,2,1]),false);
assert.equal(rules.canMove([1,1,1,2,2,1,2,1,1,2,1,2,2,1,2,1]),true);
assert.equal(rules.spawn(Array(16).fill(1)).index,-1);
assert.equal(rules.spawn(Array(16).fill(0),()=>0).board[0],1);
assert.equal(rules.spawn(Array(16).fill(0),()=>.99).board[15],2);
let seed=219;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
for(let t=0;t<1000;t++){const b=Array.from({length:16},()=>Math.floor(random()*7));for(const d of ['left','right','up','down']){const r=rules.slide(b,d),sum=x=>x.reduce((s,v)=>s+(v?2**v:0),0);assert.equal(sum(r.board),sum(b));assert.equal(r.moves.length,b.filter(Boolean).length);assert.equal(r.gained,r.merged.reduce((s,i)=>s+2**r.board[i],0));assert.deepEqual(b,b.slice());}}
class El{constructor(){this.children=[];this.listeners={};this.clientWidth=360;this.dataset={};this.style={setProperty(){}};this.disabled=false;this.textContent='';}append(...els){this.children.push(...els)}replaceChildren(){this.children=[]}setAttribute(){}focus(){}setPointerCapture(){}matches(){return false}addEventListener(k,fn){this.listeners[k]=fn}querySelector(q){if(q==='button')return this.children[0];const m=q.match(/data-index="(\d+)"/);return m?this.children.find(e=>Number(e.dataset.index)===Number(m[1])):null}}
const storage=new Map();function setup(){const els={},document={getElementById:id=>els[id]??=new El(),createElement:()=>new El(),querySelectorAll:()=>[],listeners:{},addEventListener(k,fn){this.listeners[k]=fn}};const sandbox={console,Chip2048:rules,document,window:{addEventListener(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},matchMedia:()=>({matches:true}),setTimeout,clearTimeout};vm.createContext(sandbox);vm.runInContext(fs.readFileSync(path.join(__dirname,'2048.js'),'utf8'),sandbox);return{sandbox,els,document,eval:s=>vm.runInContext(s,sandbox)};}
(async()=>{const ui=setup();assert.equal(ui.eval('board.filter(Boolean).length'),2);ui.eval('board=[1,1,0,0,...Array(12).fill(0)];score=0;render();move("left")');await new Promise(r=>setTimeout(r,10));assert.equal(ui.eval('score'),4);assert.equal(ui.eval('board.filter(Boolean).length'),2);ui.eval('rewind()');assert.equal(ui.eval('score'),0);assert.equal(ui.eval('board[0]'),1);assert.equal(ui.eval('board[1]'),1);assert.equal(ui.eval('undo'),null);
ui.eval('board=[1,2,3,4,...Array(12).fill(0)];render();save()');const before=ui.eval('JSON.stringify(board)');ui.eval('move("left")');assert.equal(ui.eval('JSON.stringify(board)'),before);
const reloaded=setup();assert.equal(reloaded.eval('JSON.stringify(board)'),before);
ui.eval('board=[10,10,0,0,...Array(12).fill(0)];won=false;render();move("left")');await new Promise(r=>setTimeout(r,10));assert.equal(ui.eval('won'),true);assert.equal(ui.eval('dialog'),true);assert.equal(ui.els.modalTitle.textContent,'M3 Maxに到達。');
ui.eval('close();board=[1,2,1,2,2,1,2,1,1,2,1,2,2,1,2,1];check()');assert.equal(ui.els.modalTitle.textContent,'これ以上動かせません。');
ui.eval('newGame();board=[1,1,0,0,...Array(12).fill(0)];render()');ui.els.board.listeners.pointerdown({pointerId:1,clientX:150,clientY:100});ui.els.board.listeners.pointerup({pointerId:1,clientX:70,clientY:100});await new Promise(r=>setTimeout(r,10));assert.equal(ui.eval('score'),4);
storage.set('merge-m-v1','{"board":[],"score":-1}');assert.equal(setup().eval('board.filter(Boolean).length'),2);
console.log('PASS: directional rules, merge-once, scoring, no-op, game over, spawn, 4000 invariant checks, UI merge/undo, restore, win, touch swipe, corrupt save recovery');})().catch(e=>{console.error(e);process.exitCode=1});
