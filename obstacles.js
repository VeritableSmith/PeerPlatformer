function Obstacle(x,y) {
  //x- and y-coordinates of an individual obstacle
  this.x=x;
  this.y=y;
  //Note: More variables can be added for more level customizability
}

//Adds an obstacle to the array
function addObstacle(x,y) {
  GAME.obstacles.push(new Obstacle(x,y));
}

//Initial timer before obstacles start spawning
var obstacleAddTimer=50;
function animateObstacles() {

  if(obstacleAddTimer==0) {
    addObstacle(Math.random()*(GAME.canvas.width-30)+15, 0);
    //Time before next obstacle should be added so that the obstacles will spawn in complex waves
    if(GAME.obstacles.length<3+Math.ceil(Math.random()*GAME.level)){obstacleAddTimer=40;}
    else {obstacleAddTimer=200;}
  }
  obstacleAddTimer--;

  //Moves the obstacles down the screen at speed 3
  for(var i = 0; i < GAME.obstacles.length; i++) {
    GAME.obstacles[i].y+=3;

    //Removes an obstacle if it is below screen
    if(GAME.obstacles[i].y>GAME.canvas.height) {
      GAME.obstacles.splice(i, 1);
      i--;
    }
  }
}

function RenderObstacles(context) {
  context.fillStyle='red';
  for(var i = 0; i < GAME.obstacles.length; i++) {
    //Draws a rectangle obstacle with x-,y-coordinates at the center of the rectangle
    context.fillRect(GAME.obstacles[i].x-15,GAME.obstacles[i].y-15, 30, 30);
  }
}


function checkObstacleCollision() {
  for(var i = 0; i < GAME.obstacles.length; i++) {
    obstacleInX=(GAME.obstacles[i].x+10>PLAYER.x-25)&&(GAME.obstacles[i].x-10<PLAYER.x+25);
    obstacleInY=(GAME.obstacles[i].y+10>PLAYER.y-82)&&(GAME.obstacles[i].y-10<PLAYER.y);
    if(obstacleInX&&obstacleInY) {
      //If the obstacle collides with the player, it is removed from the array and the player
      //loses one (1) health point.
      PLAYER.health--;
      GAME.obstacles.splice(i,1);
      i--;
    }
  }
}
