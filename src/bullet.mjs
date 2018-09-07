

// var selfBulletList=[];
// var enemyBulletList=[];

export const Bullet=function(display,x,y,d,vel,param,isPlayer){
	this.display=display||'a';
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
	this.damage=d||10;
	this.rotation=this.angle+90;
	this.gotoAndPlay(this.display);
	this.height=this.getBounds().height;
	this.width=this.getBounds().width;
	this.regX=this.width/2;
	this.regY=this.height/2;
	if(this.display=='snake'||this.display=='frog'){
		this.rotation=this.angle;this.y-=this.regX;
	}
	var blt=this;
	this.addEventListener("tick", function(){
		blt.x += Math.cos(2*Math.PI/360*blt.angle)*blt.vel;
		blt.y += Math.sin(2*Math.PI/360*blt.angle)*blt.vel;
		if (blt.x<-10 || blt.x>360 || blt.y<-10 || blt.y> 490){
			blt.destroy();
		}
		blt.hitCheck();
	});
	window.stage.addChild(this);
	window.stage.setChildIndex(this,1)
	// selfBulletList.push(this);
	this.isPlayer=isPlayer
}
Bullet.prototype = new createjs.Sprite(new createjs.SpriteSheet({
		images: ["images/bullet1.png","images/pl02.png"],
		frames: { height: 16, width: 16, count:192, cutFrames:[[0,160,64,16,1],[64,160,64,16,1],[128,160,64,16,1],[192,160,64,16,1],[0,176,32,32,1]]},
		animations: {
			a:31,
			b:108,
			c:78,
			snake:[192,195,,.5],
			frog:196
		}
	}));

Bullet.prototype.destroy=function(){
	this.removeAllEventListeners("tick");
	stage.removeChild(this);
	// selfBulletList.splice(selfBulletList.indexOf(this),1);		
}
Bullet.prototype.hitCheck=function(){
	if (this.isPlayer){
		if (window.enemyList)
			for (var i=0 ;i<window.enemyList.length;i++){
				var pt= window.enemyList[i].globalToLocal(this.x, this.y);
				if (window.enemyList[i].hitTest(pt.x-8,pt.y)||window.enemyList[i].hitTest(pt.x+8,pt.y)){
					this.destroy();
					window.enemyList[i].live-=this.damage;
				}
			}
	}else if(window.character.point){
		var pt= window.character.point.globalToLocal(this.x, this.y);
		if (window.character.point.hitTest(pt.x,pt.y)){
			//this.destroy();
			console.log('hit!');
		}
	}
}
// export {Bullet};
// module.exports = {
//   Bullet : Bullet,
// };


	

