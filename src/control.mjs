export var setControl=	function(character){	
	var control=false;
	var _x,_y;
	canvas.addEventListener('touchstart', drag, false);
	canvas.addEventListener('touchend', dragEnd, false);
	canvas.addEventListener('touchmove', move, false);
	canvas.addEventListener('mousedown', drag, false);
	canvas.addEventListener('mouseup', dragEnd, false);
	canvas.addEventListener('mousemove', move, false);
	function drag(event){
		event.preventDefault();
		control=true;
		_x=event.pageX||event.targetTouches[0].pageX;  
		_y=event.pageY||event.targetTouches[0].pageY;  
	}
	function dragEnd(event){
		event.preventDefault();
		control=false;
        character.fly.setVel();
	}
	function move(event){
		if (control){
			var __x=event.pageX-_x||event.targetTouches[0].pageX-_x;
			_x+=__x;
	        var __y=event.pageY-_y||event.targetTouches[0].pageY-_y;
	        _y+=__y;
	        character.fly.setVel(__x,__y);
		}
	}
}

var Move = {
	rolate : function(obj,angle){
		obj.rotation+=angle;
	},
	moveAngle : function(obj,vel,angle){
		obj.x += Math.cos(2*Math.PI/360*angle)*vel;
		obj.y += Math.sin(2*Math.PI/360*angle)*vel;
	},
	movePoint : function(obj,vel,x,y){
		obj.x += (x-obj.x) / Math.sqrt( Math.pow(x-obj.x,2) + Math.pow(y-obj.y,2) ) * vel;
		obj.y += (y-obj.y) / Math.sqrt( Math.pow(x-obj.x,2) + Math.pow(y-obj.y,2) ) * vel;
	},
	moveTarget : function(obj,vel,target){
		obj.x += (target.x-obj.x) / Math.sqrt( Math.pow(target.x-obj.x,2) + Math.pow(target.y-obj.y,2) ) * vel;
		obj.y += (target.y-obj.y) / Math.sqrt( Math.pow(target.x-obj.x,2) + Math.pow(target.y-obj.y,2) ) * vel;
	},
}

var hit = {

}