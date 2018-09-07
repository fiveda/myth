import { Bullet } from "./bullet.mjs"

export var Enemy = function(display,x,y,l,vel,param){
	this.display=display||'e1';
	this.x=x||0;
	this.y=y||0;
	this.vel=vel||0;
	this.angle=0;
	if (typeof param == 'number'){
		this.angle=param;
	} else if (Array.isArray(param)){
		this.angle=Math.atan2(param[1]-this.y,param[0]-this.x)/Math.PI*180
	} else if (typeof param.x == 'number' && typeof param.y == 'number'){
		this.angle=Math.atan2(param.y-this.y,param.x-this.x)/Math.PI*180
	}
	this.live=l||1;
	this.gotoAndPlay(this.display);
	this.height=this.getBounds().height;
	this.width=this.getBounds().width;
	this.regX=this.width/2;
	this.regY=this.height/2;
	stage.addChild(this);
	stage.setChildIndex(this,1)
	this.shootRate = 30;
	this.tickTime=0;
	this.shootAction='';
	// window.enemyList.push(this);
	this.addList();
	this.action();
}
Enemy.prototype = new createjs.Sprite(new createjs.SpriteSheet({
	images: ["images/enemy.png"],
	frames: [[0,0,48,32],[48,0,48,32],[96,0,48,32],[144,0,48,32]],
	animations: {
		e1:[0,3,,.2],
	}
}));
Enemy.prototype.action = function(){
	this.addEventListener("tick", ()=>{
		this.tickTime++;
		//shootaction
		if (this.tickTime>this.shootRate){
			this.tickTime=0;
			new Bullet('b',this.x,this.y,5,5,character);
		}
		//flyaction
		this.x += Math.cos(2*Math.PI/360*this.angle)*this.vel;
		this.y += Math.sin(2*Math.PI/360*this.angle)*this.vel;
		if (this.x<-50 || this.x>360 || this.y<-10 || this.y> 490 || this.live<0){
			this.destroy();
		}
	});
};
Enemy.prototype.destroy=function(){
	this.removeAllEventListeners("tick");
	stage.removeChild(this);
	window.enemyList.splice(window.enemyList.indexOf(this),1);
}
Enemy.prototype.addList=function(){
	if (!window.enemyList) window.enemyList=[];
	enemyList.push(this);
}

var bulletTypeList={
	a:['a','self',5,5,'player'],
	b:['a','self',5,5,90],
	c:['c','self',5,5,[10,400]]
};

