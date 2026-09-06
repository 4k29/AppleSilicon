/* Pure 2048 rules. A rank of 1 means 2; 0 is empty. */
(function(root){
'use strict';
function indices(direction,line){return Array.from({length:4},(_,n)=>direction==='left'?line*4+n:direction==='right'?line*4+3-n:direction==='up'?n*4+line:(3-n)*4+line);}
function slide(board,direction){if(!['left','right','up','down'].includes(direction))throw Error('Invalid direction');const next=Array(16).fill(0),moves=[],merged=[];let gained=0;for(let line=0;line<4;line++){const ids=indices(direction,line),items=ids.filter(i=>board[i]).map(i=>({from:i,rank:board[i]}));let slot=0;for(let n=0;n<items.length;n++){const a=items[n],b=items[n+1],to=ids[slot++];if(b&&a.rank===b.rank){next[to]=a.rank+1;gained+=2**next[to];moves.push({from:a.from,to},{from:b.from,to});merged.push(to);n++;}else{next[to]=a.rank;moves.push({from:a.from,to});}}}return{board:next,gained,moves,merged,changed:next.some((v,i)=>v!==board[i])};}
function canMove(board){return board.includes(0)||['left','up'].some(d=>slide(board,d).changed);}
function spawn(board,random=Math.random){const empty=board.map((v,i)=>v===0?i:-1).filter(i=>i>=0),next=board.slice();if(!empty.length)return{board:next,index:-1};const index=empty[Math.min(empty.length-1,Math.floor(random()*empty.length))];next[index]=random()<.9?1:2;return{board:next,index};}
const api={slide,canMove,spawn};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Chip2048=api;
})(globalThis);
