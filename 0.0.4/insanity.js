localStorage.level3 = localStorage.level3 || 1;
numBlocks = 9;
mode = 'dynamic'
if(!localStorage.played)localStorage.level3 = 1;
level3 = localStorage.level3;
version = '0.0.4';
//alert('Insanity Puzzle Mode(Static)\n\nHow to Play\n\nTap the gray blocks to invert the colour of everything in its row or column. Tapping any inner block will result in all blocks in the colum and row of the tapped block. The aim of the game is to eliminate all red blocks.');
swapInterval = 500;
function gbid(x){return document.getElementById(x);}
function gbtname(x){return document.getElementsByTagName(x);}
function animate(){
	var counter = 0;
	levCompletionCheck();
	row = 1 + Math.floor(Math.random()*(Math.sqrt(numBlocks)-2));
	col = 1 + Math.floor(Math.random()*(Math.sqrt(numBlocks)-2));
		if(mode == 'dynamic'){
	var b1 = blockNum(row,col);
	var b2 = blockNum(row,col);
	while(((b2 == b1) || colAt(b1) == colAt(b2)) && counter < 10 ){b1 = blockNum(1 + Math.floor(Math.random()*(Math.sqrt(numBlocks)-2)),1 + Math.floor(Math.random()*(Math.sqrt(numBlocks)-2)));counter++;}
	if(counter < 100)swap(b1,b2);}
	setTimeout(animate,swapInterval);
}
window.onload = function(){
	gbid('version').innerHTML = version;
	localStorage.played = true;
	var blocks = gbid('grid').getElementsByTagName('td');
	var size = screen.width;
	if(size > screen.height)size = screen.height;
	size *= 0.7;
	lev(level3-1);
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
	nameLet[j].style.background = 'black';}
	nameLet[cLet].style.background = 'yellow';
	nameLet[cLet].style.color = 'white';
	cLet += dir;
	
}
function lev(n){
	var blocks = gbid('grid').getElementsByTagName('td');
	var levs = [[3,4000],[3,3000],[4,2000],[4,1500],[5,1000],[5,800],[6,500],[6,400],[7,300],[7,200],[8,150],[8,100],[8,50],[8,10] ];
	if(n >= levs.length){alert('Congratulations! You have completed the game!');n = levs.length-1;
	if(confirm("Restart from level 1?")){localStorage.level = 1;level = 1; n = 0;}
	}
	gbid('lv').innerHTML = (n+1);
	var elts = '';
	swapInterval = levs[n][1];
	var size = screen.width;
	if(size > screen.height)size = screen.height;
	size = Math.floor((size *0.7) / (levs[n][0]+2));
	setGrids(levs[n][0]+2,size);
	for(var i = 0; i < Math.ceil(numBlocks/2);i++)setCol(i,'red');
	for(var i = 0;i < numBlocks;i++)blocks[i].onclick = check;
	setCol(blockNum(0,0),'black');
	setCol(blockNum(0,rows-1),'black');
	setCol(blockNum(rows-1,0),'black');
	setCol(blockNum(rows-1,rows-1),'black');
	startRow = 1;
	endRow = rows-1;
	for(var r = startRow;r<endRow;r++){
		setCol(blockNum(r,0),'grey');
		setCol(blockNum(0,r),'grey');
		setCol(blockNum(r,endRow),'grey');
		setCol(blockNum(endRow,r),'grey');
		
	}
	shuffle();
	console.log(size);
	console.log(size*Math.sqrt(numBlocks));
}
function setGrids(n,s){
	numBlocks = Math.pow(n,2);
	rows = n;
	var elt ='';
	for(var i = 0; i < n;i++ ){
		elt += '<tr>';
		for(var j =0;j<n;j++)elt += '<td onmousedown="javascript:currentBlock = '+blockNum(i,j)+'" style="height:'+s+'px;width:'+s+'px;background:'+randColX()+'"></td>';
	elt += '</tr>';
	}
	grid.innerHTML = elt;
}
function randColX(){
	return ['orange','yellow','green','blue','purple','pink'][Math.floor(Math.random() * 6 )];
}
function setCol(n,c){
	var blocks = gbid('grid').getElementsByTagName('td');
	blocks[n].style.background = extractCol(c);
}
function swap(a,b){
	var blocks = gbid('grid').getElementsByTagName("td");
	var ca = extractCol(blocks[a].style.background);
	var cb = extractCol(blocks[b].style.background);
	blocks[a].style.background = cb;
	blocks[b].style.background = ca;
}
function colAt(x){
	var blocks = gbid('grid').getElementsByTagName("td");
	for(var i = 0; i < colors.length;i++){
		if(colors[i] == blocks[x].style.background || extractCol(blocks[x].style.background == colors[i] ) == colors[i])return colors[i];
	}
}
function check(e){
	e = e || event || window.event;
	var target = e.target || e.srcElement;
	for(var i =0;i<numBlocks;i++)if(gbid(i) == target)currentBlock = i;
	if(!currentBlock)currentBlock = target.id;
	direction = null;
	if(rowNum(currentBlock) == 0 || rowNum(currentBlock) == rows-1)direction = 'v';
	else if(colNum(currentBlock) == 0 || colNum(currentBlock) == rows-1)direction = 'h';
	else direction = 'both'
	if(direction == 'v'){
		startRow = 1;
		endRow = rows-1;
		for(var r = startRow;r<endRow;r++){
			if(colAt(blockNum(r,colNum(currentBlock))) == "red" || extractCol(colAt(blockNum(r,colNum(currentBlock)))) == 'red' )setCol(blockNum(r,colNum(currentBlock)),randColX());
			else setCol(blockNum(r,colNum(currentBlock)),"red");
		}
	}
	if(direction == 'h'){
		startRow = 1;
		endRow = rows-1;
		for(var r = startRow;r<endRow;r++){
			if(colAt(blockNum(rowNum(currentBlock),r)) == "red" || extractCol(colAt(blockNum(rowNum(currentBlock),r))) == 'red' )setCol(blockNum(rowNum(currentBlock),r),randColX());
			else setCol(blockNum(rowNum(currentBlock),r),"red");
		}
	}
	if(direction == 'both'){
		for(var r = startRow;r<endRow;r++){	
			if(colAt(blockNum(rowNum(currentBlock),r)) == "red" || extractCol(colAt(blockNum(rowNum(currentBlock),r))) == 'red' )setCol(blockNum(rowNum(currentBlock),r),randColX());
			else setCol(blockNum(rowNum(currentBlock),r),"red");
			if(colAt(blockNum(r,colNum(currentBlock))) == "red" || extractCol(colAt(blockNum(r,colNum(currentBlock)))) == 'red' )setCol(blockNum(r,colNum(currentBlock)),randColX());
			else setCol(blockNum(r,colNum(currentBlock)),"red");
		}
		if(colAt(blockNum(rowNum(currentBlock),colNum(currentBlock))) == "red" || extractCol(colAt(blockNum(rowNum(currentBlock),colNum(currentBlock)))) == 'red' )setCol(blockNum(rowNum(currentBlock),colNum(currentBlock)),randColX());
			else setCol(blockNum(rowNum(currentBlock),colNum(currentBlock)),"red");
	}
	levCompletionCheck();
	//if(target.style.background == "red" || extractCol(target.style.background) == 'red' )target.style.background = randColX();
	//else target.style.background = "red";
}
function levCompletionCheck(){
	for(var i = 0; i < numBlocks;i++){if(colAt(i) == 'red' )return;}
	alert('Level '+ level3+ ' complete');
	localStorage.level3++;
	level3 = localStorage.level3;
	lev(level3-1);
}
colors = ['red','orange','yellow','green','blue','purple','pink'];
function extractCol(c){
	str = ''+c;
	colors = ['red','orange','yellow','green','blue','purple','pink'];
	for(i = 0;i<colors.length;i++){
		if(colors[i] == str || str.includes(colors[i]))return colors[i];
	}
	return str;
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