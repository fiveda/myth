import { Bullet } from "./bullet.mjs"
import { setControl } from "./control.mjs"
export const createPlayer=function(stage) {
	var character = new createjs.Sprite(new createjs.SpriteSheet({
		images: ["images/pl02.png"],
		frames: {
			height: 46,
			width: 29,
			count: 24,
			spacing: 3,
			//cutFrames:[[64,144,16,16],[80,144,16,16],[96,144,16,16]]
		},
		animations: {
			s: [0, 7, ,.2],
			l: [12, 15, ],
			r: [19, 23, ],
			s2l: [8, 11, 'l'],
			s2r: [17, 19, 'r'],
			l2s: {
				frames: [11, 10, 9, 8],
				next: 's'
			},
			r2s: {
				frames: [19, 18],
				next: 's'
			},
		}
	}));
	character.x = 175;
	character.y = 400;
	character.regX = 16;
	character.regY = 23;
	character.height = 46;
	character.width = 29;
	///////////////////
	character.fly = {
		velX: 0,
		velY: 0,
		setVel: function(velX, velY) {
			this.velX = velX || 0;
			this.velY = velY || 0;
			
				character.x += this.velX;
				character.y += this.velY;
			if (character.x<10)character.x=10;
			if (character.y<10)character.y=10;
			if (character.x>340)character.x=340;
			if (character.y>470)character.y=470;
		},
	}
	character.power = 400;
	character.damage = 1;
	character.shootRate = 3;
	character.shootType = 'snake';
	character.shooter=[];
	character.shoot=function(){
		var powerLevel=parseInt(this.power/100);

		if (this.shooter.length!=powerLevel){
			this.shooter=[];
			for (var i=0;i<powerLevel&&i<4;i++){
				this.shooter.push(new Shooter('shooter1',this.x,this.y,25*(i+0.5-powerLevel/2)));
			}
			this.shooter.forEach((v)=>stage.addChild(v))
			
		}
		for (var i=0;i<this.shooter.length&&i<4;i++){
			new Bullet(this.shootType,this.shooter[i].x,this.shooter[i].y,this.damage,20,-90,1);
		}
	}
	
	character.gotoAndPlay('s'); 
	stage.addChild(character);
	var point = new createjs.Bitmap("images/eff_base.png");
	point.sourceRect=new createjs.Rectangle(0, 16, 64, 64);
	point.regX = 32;
	point.regY = 32;
	point.x = character.x;
	point.y = character.y;
	point.action=function(){this.x=character.x;this.y = character.y;this.rotation-=3;}
	point.tickTime=0;
	point.alpha = 0.7
	character.point=point;
	character.addEventListener("tick", function(){
		character.point.action();
		for(var i=0;i<character.shooter.length;i++){
			character.shooter[i].action(character);
		}
		if (character.point.tickTime>character.shootRate){
			character.point.tickTime=0;
			character.shoot();
		}else{
			character.point.tickTime++;
		}
	});
	
	stage.addChild(character.point);
	setControl(character);
	return character;
	
}

function Shooter(display,x,y,angle){
	this.display=display;
	this.height=this.getBounds().height;
	this.width=this.getBounds().width;
	this.regX=this.width/2;
	this.regY=this.height/2;
	this.relX=Math.cos(2*Math.PI/360*(angle+90))*40;
	this.relY=Math.sin(2*Math.PI/360*(angle+90))*40;
	this.x=x+this.relX;
	this.y=y+this.relY;
	this.alpha = 0.7;
	this.gotoAndPlay(display);
	// stage.addChild(this);
}
Shooter.prototype= new createjs.Sprite(new createjs.SpriteSheet({
	images: ["images/pl02.png"],
	frames: [[64,144,16,16],[80,144,16,16],[96,144,16,16]],
	animations: {
		shooter1 : 0,
		shooter2 : 1,
		shooter3 : 2,
	}
}));
Shooter.prototype.action=function(character){ 
	this.x=this.x+(character.x+this.relX-this.x)/4; 
	this.y=this.y+(character.y+this.relY-this.y)/4; 
	this.rotation-=3; 
}
Shooter.prototype.destroy=function(){
		this.removeAllEventListeners("tick");
		stage.removeChild(this);
		// selfBulletList.splice(selfBulletList.indexOf(this),1);		
	}


