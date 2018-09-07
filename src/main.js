
import { Bullet } from "./bullet.mjs"
import { createPlayer } from "./player.mjs"
import { Enemy } from "./enemy.mjs"
import { loadStage } from "./stage.mjs"
var canvas = document.getElementById("canvas");
window.stage = new createjs.Stage(canvas);

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", tick);
function tick(event) {
	stage.update();
}

// loadStage();
window.character=createPlayer(stage);
// window.enemyList=[];
new Enemy('e1',50,10,100,.5,character);
new Enemy('e1',100,10,100,.5,character);
new Enemy('e1',150,10,100,.5,character);
new Enemy('e1',150,10,100,.5,character);
new Enemy('e1',150,10,100,.5,character);
new Enemy('e1',150,10,100,.5,character);
new Enemy('e1',150,10,100,.5,character);
new Enemy('e1',200,10,100,.5,character);
new Enemy('e1',250,10,100,.5,character);
new Bullet('b',200,200,5,5,character);
new Bullet('c',100,100,5,5,character);
	








