localStorage.level = localStorage.level || 1;
localStorage.screenwidth = window.innerWidth;
numBlocks = 9;
if(!localStorage.played)localStorage.level = 1;
level = localStorage.level;
version = '0.0.6';
//alert('Insanity Normal Mode\n\nHow to Play\n\nTap the red blocks to change their colour. If you tap a non-red block it will become red.The aim of the game is to eliminate all red blocks. The blocks will constantly change positions, so be careful.');
swapInterval = 500;
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
function gbid(x){return document.getElementById(x);}
function gbtname(x){return document.getElementsByTagName(x);}
function animate(){
	var counter = 0;
	var b1 = Math.floor(Math.random()*numBlocks);
	var b2 = Math.floor(Math.random()*numBlocks);
	while(((b2 == b1) || colAt(b1) == colAt(b2)) && counter < 10 ){b1 =Math.floor(Math.random()*numBlocks);counter++}
	if(counter < 10)swap(b1,b2);
	setTimeout(animate,swapInterval);
}
window.onload = function(){
	gbid('version').innerHTML = version;
	localStorage.played = true;
	var blocks = gbid('grid').getElementsByTagName('td');
	var size = localStorage.screenwidth;
	if(size > window.innerHeight)size = window.innerHeight;
	lev(level-1);
	name = gbid('name').innerHTML;
	text = '';
	cLet = 0;
	dir = 1;
	for(var i = 0; i < name.length;i++)text += '<span class="let">'+name[i]+'</span>';
	gbid('name').innerHTML = text;
	setInterval(nameAnim,50);
	animate();
}
function nameAnim(){
	nameLet = document.getElementsByClassName('let');
	cLet = cLet || 0;
	dir = dir || 1;
	if(cLet >= name.length){dir = -1;cLet = name.length - 1;}
	if(cLet < 0){dir = 1;cLet = 1;}
	for(var j = 0;j < name.length;j++){	nameLet[j].style.color = 'green';
	nameLet[j].style.backgroundColor = 'black';}
	nameLet[cLet].style.backgroundColor = 'yellow';
	nameLet[cLet].style.color = 'white';
	cLet += dir;
	
}
function lev(n){
	var blocks = gbid('grid').getElementsByTagName('td');
	var levs = [[3,400],[3,300],[4,200],[4,150],[5,100],[5,80],[6,50],[6,40],[7,30],[7,20],[8,15],[8,10],[8,5],[8,1] ];
	if(n >= levs.length){alert('Congratulations! You have completed the game!');n = levs.length-1;
	if(confirm("Restart from level 1?")){localStorage.level = 1;level = 1; n = 0;}
	}
	gbid('lv').innerHTML = (n+1);
	var elts = '';
	swapInterval = levs[n][1];
	var size = localStorage.screenwidth;
	if(size > window.innerHeight)size = window.innerHeight;
	size = Math.floor(size*0.85 / levs[n][0]);
	setGrids(levs[n][0],size);
	for(var i = 0; i < Math.ceil(numBlocks/2);i++)setCol(i,'red');
	for(var i = 0;i < numBlocks;i++)blocks[i].onclick = check;
	shuffle();
	console.log(size);
	console.log(size*Math.sqrt(numBlocks));
}
function setGrids(n,s){
	numBlocks = Math.pow(n,2);
	var elt ='';
	for(var i = 0; i < n;i++ ){
		elt += '<tr height="'+s+'" style="height:'+s+'px;">';
		for(var j =0;j<n;j++)elt += '<td onmousedown="javascript:currentBlock = '+blockNum(i,j)+'" style="height:'+s+'px;width:'+s+'px;background:'+randColX()+'"height="'+s+'"></td>';
	elt += '</tr>';
	}
	grid.innerHTML = elt;
	grid.style.height = n*s+'px';
	grid.style.width = n*s+'px';
}
function randColX(){
	return ['orange','yellow','green','blue','purple','pink'][Math.floor(Math.random() * 6 )];
}
function setCol(n,c){
	var blocks = gbid('grid').getElementsByTagName('td');
	blocks[n].style.backgroundColor = extractCol(c) || c;
}
function swap(a,b){
	var blocks = gbid('grid').getElementsByTagName("td");
	var ca = extractCol(blocks[a].style.backgroundColor);
	var cb = extractCol(blocks[b].style.backgroundColor);
	blocks[a].style.backgroundColor = cb;
	blocks[b].style.backgroundColor = ca;
}
function colAt(x){
	var blocks = gbid('grid').getElementsByTagName("td");
	for(var i = 0; i < colors.length;i++){
		if(colors[i] == blocks[x].style.backgroundColor || extractCol(blocks[x].style.backgroundColor ) == colors[i])return colors[i];
	}
}
function check(e){
	e = e || event || window.event;
	var target = e.target || e.srcElement;
	if(target.style.backgroundColor == "red" || extractCol(target.style.backgroundColor) == 'red' )target.style.backgroundColor = randColX();
	else target.style.backgroundColor = "red";
	levCompletionCheck();
}
function levCompletionCheck(){
	for(var i = 0; i < numBlocks;i++){if(colAt(i) == 'red' )return;}
	alert('Level '+ level+ ' complete');
	localStorage.level++;
	level = localStorage.level;
	lev(level-1);
}
colors = ['red','orange','yellow','green','blue','purple','pink'];
function extractCol(c){
	colors = ['red','orange','yellow','green','blue','purple','pink'];
	for(i = 0;i<colors.length;i++){
		if(c.includes(colors[i]))return colors[i];
	}
	return c;
}
function blockNum(r,c){
	return c + r*Math.sqrt(numBlocks);
}
function rowNum(i){
	return Math.floor(i/Math.sqrt(numBlocks));
}
function colNum(i){
	return i - Math.sqrt(numBlocks)*rowNum(i);
}
function shuffle(){
	for(var i =0;i<100;i++){
	var counter = 0;
	row = 1 + Math.floor(Math.random()*(Math.sqrt(numBlocks)-2));
	col = 1 + Math.floor(Math.random()*(Math.sqrt(numBlocks)-2));
	var b1 = blockNum(row,col);
	var b2 = blockNum(row,col);
	while(((b2 == b1) || colAt(b1) == colAt(b2)) && counter < 10 ){b1 = blockNum(1 + Math.floor(Math.random()*(Math.sqrt(numBlocks)-2)),1 + Math.floor(Math.random()*(Math.sqrt(numBlocks)-2)));counter++;}
	if(counter < 100)swap(b1,b2);}
}
/*
(function() {
function init() {
    var mouseEventTypes = {
        touchstart : "mousedown",
        touchmove : "mousemove",
        touchend : "mouseup"
    };

    for (originalType in mouseEventTypes) {
        document.addEventListener(originalType, function(originalEvent) {
            if(originalEvent.type == 'click')
                return;
            if (originalEvent.type != 'touchstart' && originalEvent.type !='touchend'){
                originalEvent.preventDefault();
            }
            event = document.createEvent("MouseEvents");
            touch = originalEvent.changedTouches[0];
            event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true, window, 0, touch.screenX, touch.screenY, touch.clientX, touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey, touch.metaKey, 0, null);
            originalEvent.target.dispatchEvent(event);
            event.preventDefault();         
        });
    }
}

init();
})();
*/