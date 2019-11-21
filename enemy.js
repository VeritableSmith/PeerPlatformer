function addEnemy(type) {
  GAME.enemies.push(new Enemy(type));
}

function Enemy(type) {
  //Different enemies have different behaviors and will need different variables
  if(type=="lvl1") {
    this.type="lvl1";
    this.x=Math.floor(Math.random()*2)*GAME.canvas.width;
    this.y=GAME.canvas.height;
    this.speed_x=0;
    this.MAX_SPEED_X=6;
  }
  else if(type=="lvl2") {
    this.type="lvl2";
    this.x=Math.floor(Math.random()*2)*GAME.canvas.width;
    this.y=GAME.canvas.height;
    this.speed_x=2;
    this.speed_y=0;
    this.MAX_SPEED_Y=10.1;
    this.jumpTimer=150;
  }
  //Note: A "lvl1" type enemy COULD appear in another level if it adds to gameplay complexity
}

//Initial timer before enemies start spawning
var enemyAddTimer=100;

function animateEnemies() {

  //With this 'if' statement, only 1 enemy is on screen at a time.
  if(enemyAddTimer==0&&GAME.enemies.length<GAME.level) {
    if(GAME.level==1){addEnemy("lvl1");}
    else if(GAME.level==2){addEnemy("lvl2")}
    //Time before next enemy should be added
    enemyAddTimer=150;
  }
  else if(enemyAddTimer>0&&GAME.enemies.length<GAME.level){enemyAddTimer--;}



  for(var i = 0; i < GAME.enemies.length; i++) {
    if(GAME.enemies[i].type=="lvl1") {

      //Accelerate an enemy towards the player
      if((GAME.enemies[i].x<PLAYER.x
        &&Math.abs(GAME.enemies[i].x-PLAYER.x)<GAME.canvas.width/2)
        ||(GAME.enemies[i].x>PLAYER.x&&GAME.enemies[i].x-PLAYER.x>GAME.canvas.width/2)
        &&GAME.enemies[i].speed_x<GAME.enemies[i].MAX_SPEED_X)
        {
          GAME.enemies[i].speed_x+=0.1;
        }
        else if(GAME.enemies[i].speed_x>-GAME.enemies[i].MAX_SPEED_X)
        {
          GAME.enemies[i].speed_x-=0.1;
        }

        GAME.enemies[i].x+=GAME.enemies[i].speed_x;

        //If the enemy is out of bounds, switch sides
        if(GAME.enemies[i].x>GAME.canvas.width) {GAME.enemies[i].x=0;}
        else if(GAME.enemies[i].x<0) {GAME.enemies[i].x=GAME.canvas.width;}
      }
      else if(GAME.enemies[i].type=="lvl2") {
        if(GAME.enemies[i].jumpTimer>0) {
          GAME.enemies[i].jumpTimer--;

          if(Math.random()<0.02) {GAME.enemies[i].speed_x=-GAME.enemies[i].speed_x;}
          GAME.enemies[i].x+=GAME.enemies[i].speed_x;

          if(GAME.enemies[i].x>GAME.canvas.width) {GAME.enemies[i].x=0;}
          else if(GAME.enemies[i].x<0) {GAME.enemies[i].x=GAME.canvas.width;}
        }
        else {
          if(GAME.enemies[i].speed_y==0) {GAME.enemies[i].speed_y=GAME.enemies[i].MAX_SPEED_Y+Math.ceil(Math.random()*5);}
          GAME.enemies[i].y-=GAME.enemies[i].speed_y;
          GAME.enemies[i].speed_y-=.2;
          if(GAME.enemies[i].y+10>GAME.canvas.height&&GAME.enemies[i].speed_y<0) {
            GAME.enemies[i].speed_y=0;
            GAME.enemies[i].y=GAME.canvas.height;
            GAME.enemies[i].jumpTimer=100+(Math.random()*100);
          }
        }
      }
  }
}


function RenderEnemies(context) {

  if(GAME.level==1){context.fillStyle='blue';}
  else if(GAME.level==2) {context.fillStyle='green';}
  for(var i = 0; i < GAME.enemies.length; i++) {
    //Draws an enemy with x-,y-coordinates at the bottom center of the rectangle
    if(GAME.enemies[i].type=="lvl1") {context.fillRect(GAME.enemies[i].x-25,GAME.enemies[i].y, 50, -70);}
    else if(GAME.enemies[i].type=="lvl2") {context.fillRect(GAME.enemies[i].x-40, GAME.enemies[i].y,80, -40);

    }
  }
}


function checkEnemyCollision() {
  for(var i = 0; i < GAME.enemies.length; i++) {
    if(GAME.enemies[i].type=="lvl1") {
      enemyInX=(GAME.enemies[i].x+20>PLAYER.x-25)&&(GAME.enemies[i].x-20<PLAYER.x+25);
      enemyInY=(GAME.enemies[i].y>PLAYER.y-82)&&(GAME.enemies[i].y-70<PLAYER.y);
    }
    else if(GAME.enemies[i].type=="lvl2") {
      enemyInX=(GAME.enemies[i].x+40>PLAYER.x-25)&&(GAME.enemies[i].x-40<PLAYER.x+25);
      enemyInY=(GAME.enemies[i].y>PLAYER.y-82)&&(GAME.enemies[i].y-40<PLAYER.y);
    }
    else {
      enemyInX=false;
      enemyInY=false;
    }
    if(enemyInX&&enemyInY) {
      PLAYER.health--;
      GAME.enemies.splice(i,1);
      i--;
    }
  }
}
