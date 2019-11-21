


var introTimer = 175, interacted=false;
var objY=0;
function playIntro(context) {

  if(!interacted) {
    if(CONTROLS.player.fire) {interacted=true;}
    context.fillStyle='black';
    context.fillRect(0,0,GAME.canvas.width,GAME.canvas.height);
    context.fillStyle='white';
    context.font = "30px Arial";
    context.fillText("COLOR ME", 175, 170);
    context.fillText("DISTRESSED", 160, 210);
    context.fillText("Press Space to Start", 120, 500);
  }
  else {
    if(objY<=GAME.canvas.height-120) {
      context.fillStyle='white';
      context.fillRect(0,0,GAME.canvas.width,GAME.canvas.height);
      RenderPlayer(context);
      context.fillStyle='red';
      context.fillRect(GAME.canvas.width/2-20, objY, 40,40);
      objY+=5;
    }
    else {
      introTimer--;
      context.fillStyle='black';
      context.fillText("OW!", 225, 200);
      if(introTimer==0) {
        GAME.levelTransition=true;
      }
      else if(introTimer<=100) {
        context.fillText("Colors are the worst.", 130, 350);
      }

    }
  }

}


var fireCounter=0;
function animatePlayer() {
  if (CONTROLS.player.right) {
    PLAYER.x += PLAYER.playerSpeed;
    PLAYER.direction=1;
  }
  if (CONTROLS.player.left) {
    PLAYER.x -= PLAYER.playerSpeed;
    PLAYER.direction=-1;
  }


  if (CONTROLS.player.up&&PLAYER.speedY>=0) {
      if (PLAYER.grounded){
          PLAYER.speedY = PLAYER.jumpSpeed;
          PLAYER.grounded = false;
      }

      if(PLAYER.speedY>-PLAYER.jumpSpeed){PLAYER.speedY -= 0.5;}
      PLAYER.y -= PLAYER.speedY;

  }
  else if (CONTROLS.player.fall||PLAYER.speedY<0){
      if (PLAYER.y < GAME.canvas.height) {
        if(PLAYER.speedY>-PLAYER.jumpSpeed){PLAYER.speedY -= 1;}
        PLAYER.y -= PLAYER.speedY;
      }
      else {
        PLAYER.grounded = true;
        CONTROLS.player.fall = false;
        PLAYER.speedY=0;
        PLAYER.y= GAME.canvas.height;
      }
    }


  if (PLAYER.x+25 > GAME.canvas.width) {
    PLAYER.x = GAME.canvas.width-25;
  }
  else if (PLAYER.x < 25) {
    PLAYER.x = 25;
  }
  else if (PLAYER.y > GAME.canvas.height) {
    PLAYER.y = GAME.canvas.height;

  }
  else if (PLAYER.y < 0) {
    PLAYER.y = 0;
    PLAYER.speedY = -PLAYER.speedY;
  }

  if(fireCounter>0) {fireCounter--;}
  if(CONTROLS.player.fire&&fireCounter==0) {
    fireCounter=20;
    PLAYER.projectiles.push(new Projectile(PLAYER.x+PLAYER.direction*25, PLAYER.y-55, PLAYER.direction));
  }

  checkLevelRequirements();
}

var levelTimer = 100;
function levelTransition(context) {
  levelTimer--;
  if(levelTimer>0) {
    context.fillStyle='black';
    context.fillRect(0,0,GAME.canvas.width, GAME.canvas.height);
    context.fillStyle='white';
    context.fillText("Level "+(GAME.level+1), 215, 335);
    return;
  }

  levelTimer=100;
  if(GAME.level==0) {
    GAME.levelTransition=false;
    GAME.level++;
    addPlatform(0, GAME.canvas.height-150, 100);
    addPlatform(GAME.canvas.width-100, GAME.canvas.height-150, 100);
    addPlatform(190, GAME.canvas.height-150, 130);
    addPlatform(95,GAME.canvas.height-300,100);
    addPlatform(GAME.canvas.width-195,GAME.canvas.height-300,100);
    addPlatform(205, GAME.canvas.height-450, 100);

    PLAYER.obsGoal=5;
    PLAYER.enemGoal=5;
  }
  else if(GAME.level==1) {
    GAME.levelTransition=false;
    GAME.level++;
    while(GAME.platforms.length>0) {GAME.platforms.pop();}
    while(GAME.obstacles.length>0) {GAME.obstacles.pop();}
    while(GAME.enemies.length>0) {GAME.enemies.pop();}
    addPlatform(0, GAME.canvas.height-150,400);
    addPlatform(110,GAME.canvas.height-300, 400);
    addPlatform(0, GAME.canvas.height-450,400);

    PLAYER.health=3;
    PLAYER.obsKilled=0;
    PLAYER.obsGoal=10;
    PLAYER.enemKilled=0;
    PLAYER.enemGoal=5;
  }
  else if(GAME.level==2) {
    //manageLevel3();
  }
}


function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');

  if (GAME.started) {
    if(GAME.level==0) {
      playIntro(context);
    }
    else if(GAME.level>=1) {
    // 1 - Reposition the objects
    animatePlayer();
    animatePlayerProjectiles();
    animateObstacles();
    animateEnemies();

    checkPlatformCollision();
    checkObstacleCollision();
    checkEnemyCollision();
    checkProjectileCollision();


    // 2 - Clear the CANVAS
    context.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height);

    // 3 - Draw new items
    RenderPlatforms(context);
    RenderPlayer(context);
    RenderPlayerProjectiles(context);
    RenderEnemies(context);
    RenderObstacles(context);
  }

  if(GAME.levelTransition) {levelTransition(context);}

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over", 190, 350);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
