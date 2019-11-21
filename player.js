function InitializePlayer() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  //context.fillRect(PLAYER.x, PLAYER.y, 100, 100);
  PLAYER = {
    x : GAME.canvas.width/2,
    y : GAME.canvas.height,
    latest : {
        x : PLAYER.x,
        y : PLAYER.y,
    },
    playerSpeed : 7,
    jumpSpeed : 14,
    grounded : true,
    speedY : 0,
    health : 3,
    initialized : true,
    direction : 1,
    projectiles : [],
    obsKilled : 0,
    obsGoal : 0,
    enemKilled : 0,
    enemGoal : 0
  };
}

var playerSprite = new Image();
playerSprite.src="spr_stick_player.png";


function RenderPlayer(context){

  context.drawImage(playerSprite, PLAYER.x-25, PLAYER.y+4, 50,-90);
  if(GAME.level>=1){
    displayHealth(context);
    displayScore(context);
  }
}




function Projectile(x, y, direction) {
  this.x=x;
  this.y=y;
  this.direction=direction;
  this.speed=12;
}

function animatePlayerProjectiles() {
  for(var i = 0; i < PLAYER.projectiles.length; i++) {
    PLAYER.projectiles[i].x+=PLAYER.projectiles[i].direction*PLAYER.projectiles[i].speed;
    if(PLAYER.projectiles[i].x<0||PLAYER.projectiles[i].x>GAME.canvas.width) {
      PLAYER.projectiles.splice(i,1);
      i--;
    }
  }
}

function RenderPlayerProjectiles(context) {
  context.fillStyle='black';
  for(var i = 0; i < PLAYER.projectiles.length; i++) {
    context.fillRect(PLAYER.projectiles[i].x-10,PLAYER.projectiles[i].y-10, 20,20);
  }
}

function checkProjectileCollision() {
  for(var p=0; p < PLAYER.projectiles.length; p++) {
    for(var o=0; o < GAME.obstacles.length; o++) {
      if(Math.pow(PLAYER.projectiles[p].x-GAME.obstacles[o].x,2)+
      Math.pow(PLAYER.projectiles[p].y-GAME.obstacles[o].y,2)<400) {
        PLAYER.projectiles.splice(p,1);
        GAME.obstacles.splice(o,1);
        PLAYER.obsKilled++;
        return;
      }
    }
    for(var e=0; e < GAME.enemies.length; e++) {
      if(GAME.enemies[e].type=="lvl1") {
        if(PLAYER.projectiles[p].x+10>GAME.enemies[e].x-20
        && PLAYER.projectiles[p].x-10<GAME.enemies[e].x+20
        && PLAYER.projectiles[p].y+10>GAME.enemies[e].y-70) {

          PLAYER.projectiles.splice(p,1);
          GAME.enemies.splice(e,1);
          PLAYER.enemKilled++;
          return;
        }
      }
      else if(GAME.enemies[e].type=="lvl2") {
        if(PLAYER.projectiles[p].x+10>GAME.enemies[e].x-40
        && PLAYER.projectiles[p].x-10<GAME.enemies[e].x+40
        && PLAYER.projectiles[p].y+10>GAME.enemies[e].y-40
        && PLAYER.projectiles[p].y-10<GAME.enemies[e].y) {

          PLAYER.projectiles.splice(p,1);
          GAME.enemies.splice(e,1);
          PLAYER.enemKilled++;
          return;
        }
      }
  }
}
}

function displayHealth(context) {
  context.font = "30px Arial";
  context.fillText("Health: " +PLAYER.health, 5, 30);
}

function displayScore(context) {
  if(PLAYER.obsKilled<PLAYER.obsGoal){context.fillStyle='black';}
  else {context.fillStyle='green';}
  context.fillText("Obstacles: " +PLAYER.obsKilled+"/"+PLAYER.obsGoal, 5, 55);
  if(PLAYER.enemKilled<PLAYER.enemGoal){context.fillStyle='black';}
  else {context.fillStyle='green';}
  context.fillText("Enemies: " +PLAYER.enemKilled+"/"+PLAYER.enemGoal, 5, 80);
}

function checkLevelRequirements() {
  if(PLAYER.health<=0) {GAME.started=false;}
  if(PLAYER.enemKilled>=PLAYER.enemGoal&&PLAYER.obsKilled>=PLAYER.obsGoal) {GAME.levelTransition=true;}
}
