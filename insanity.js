localStorage.level = localStorage.level || 1;
numBlocks = 9;
if(!localStorage.played)localStorage.level = 1;
level = localStorage.level;
alert('Insanity created by Warren Hood \nHow to Play\n\nTap the red blocks to change their colour. If you tap a non-red block it will become red.The aim of the game is to eliminate all red blocks. The blocks will constantly change positions, so be careful.\n\nSuggestions? Email me:\nnullbyte001@gmail.com');
swapInterval = 500;
function gbid(x){return document.getElementById(x);}
function gbtname(x){return document.getElementsByTagName(x);}
function animate(){
	var counter = 0;
	levCompletionCheck();
	var b1 = Math.floor(Math.random()*numBlocks);
	var b2 = Math.floor(Math.random()*numBlocks);
	while(((b2 == b1) || colAt(b1) == colAt(b2)) && counter < 10 ){b1 =Math.floor(Math.random()*numBlocks);counter++}
	if(counter < 10)swap(b1,b2);
	setTimeout(animate,swapInterval);
}
window.onload = function(){
	localStorage.played = true;
	var blocks = gbid('grid').getElementsByTagName('td');
	var size = screen.width;
	if(size > screen.height)size = screen.height;
	size *= 0.8;
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
	nameLet[j].style.background = 'black';}
	nameLet[cLet].style.background = 'yellow';
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
	var size = screen.width;
	if(size > screen.height)size = screen.height;
	size = Math.floor(size *0.7 / levs[n][0]);
	setGrids(levs[n][0],size);
	for(var i = 0; i < Math.ceil(numBlocks/2);i++)setCol(i,'red');
	for(var i = 0;i < numBlocks;i++)blocks[i].onclick = check;
	
}
function setGrids(n,s){
	numBlocks = Math.pow(n,2);
	var elt =''
	for(var i = 0; i < n;i++ ){
		elt += '<tr>';
		for(var j =0;j<n;j++)elt += '<td style="height:'+s+'px;width:'+s+'px;background:'+randColX()+'"></td>';
	elt += '</tr>';
	}
	grid.innerHTML = elt;
}
function randColX(){
	return ['orange','yellow','green','blue','purple','pink'][Math.floor(Math.random() * 6 )];
}
function setCol(n,c){
	var blocks = gbid('grid').getElementsByTagName('td');
	blocks[n].style.background = c;
}
function swap(a,b){
	var blocks = gbid('grid').getElementsByTagName('td');
	var ca = blocks[a].style.background;
	var cb = blocks[b].style.background;
	blocks[a].style.background = cb;
	blocks[b].style.background = ca;
}
function colAt(x){
	var blocks = gbid('grid').getElementsByTagName('td');
	return blocks[x].style.background;
}
function check(e){
	e = e || event;
	if(e.target.style.background == 'red')e.target.style.background = randColX();
	else e.target.style.background = 'red';
}
function levCompletionCheck(){
	for(var i = 0; i < numBlocks;i++){if(colAt(i) == 'red')return;}
	alert('Level '+ level+ ' complete');
	localStorage.level++;
	level = localStorage.level;
	lev(level-1);
}
