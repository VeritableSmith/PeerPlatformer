function Platform(x,y,length) {
  this.x=x;
  this.y=y;
  this.length=length;
}

function addPlatform(x,y,length) {
  GAME.platforms.push(new Platform(x,y,length));
}

function RenderPlatforms(context) {
  context.fillStyle='black';
  for(var i = 0; i < GAME.platforms.length; i++) {
    context.fillRect(GAME.platforms[i].x,GAME.platforms[i].y,GAME.platforms[i].length,12);
  }
}
var playerInX, playerInY;
function checkPlatformCollision() {

  for(var i = 0; i < GAME.platforms.length; i++) {
    playerInX=(PLAYER.x>GAME.platforms[i].x-20)&&(PLAYER.x<GAME.platforms[i].x+GAME.platforms[i].length+20);
    playerInY=(PLAYER.y>=GAME.platforms[i].y)&&(PLAYER.y<GAME.platforms[i].y+14);
    if(playerInX&&playerInY&&PLAYER.speedY<=0.2) {
      PLAYER.y=GAME.platforms[i].y;
      PLAYER.speedY=0;
      PLAYER.grounded=true;
    }
  }
}
