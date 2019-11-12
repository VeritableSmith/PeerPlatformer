function handlePlayerAnimation() {
  if (CONTROLS.player.right) {
    PLAYER.x += PLAYER.playerSpeed;
    //PLAYER.y +=  PLAYER.speed;
  }
  if (CONTROLS.player.left) {
    PLAYER.x -= PLAYER.playerSpeed;
    //PLAYER.y -=  PLAYER.speed;
  }
  if (CONTROLS.player.up) {
    // if (PLAYER.grounded){
    //    var maxHeight = PLAYER.y - PLAYER.jumpHeight;
    // //   var jumpSpeed = PLAYER.jumpSpeed;
    // //   //var playerAccelerate = jum * 0.7;
    //    PLAYER.grounded = false;
    //  }
    //
    // //
    // // if (PLAYER.y > maxHeight){
    // //
    // // //  PLAYER.y -= PLAYER.jumpSpeed;
    // // PLAYER.y -= jumpSpeed;
    // // jumpSpeed = jumpSpeed * 0.7;
    // // } else {
    // //   if (peak == false){
    // //     peak == true;
    // //     jumpSpeed = PLAYER.jumpSpeed;
    // //   }
    // //   PLAYER.y += jumpSpeed * 0.7;
    // if (PLAYER.y > maxHeight) {
    //   PLAYER.y -= PLAYER.jumpSpeed;
    // } else {
    // //   PLAYER.y += PLAYER.jumpSpeed;
    //  }
      if (PLAYER.grounded){
        PLAYER.speedY = PLAYER.jumpSpeed;
      }
      PLAYER.grounded = false;
      PLAYER.speedY -= 3;
      PLAYER.y -= PLAYER.speedY
      if (PLAYER.y <= PLAYER.jumpHeight){
        PLAYER.speedY = 0;
        CONTROLS.player.up = false;
        CONTROLS.player.fall = true;
      }


    }
    if (CONTROLS.player.fall){
      //PLAYER.y += PLAYER.jumpSpeed;
      if (PLAYER.y != GAME.canvas.height-100) {
        PLAYER.speedY = -PLAYER.jumpSpeed;
        PLAYER.speedY += 3;
        PLAYER.y -= PLAYER.speedY;
      } else {
        PLAYER.grounded = true;
        CONTROLS.player.fall = false;
      }
    }



  // if (CONTROLS.ship.rotateCounterClockwise) {
  //   SPACE_SHIP.rotation += 4;
  // }

  // Check if asteroid is leaving the boundary, if so, switch sides
  if (PLAYER.x > GAME.canvas.width - 100) {
    PLAYER.x = 0;
    //PLAYER.x = GAME.canvas.width - 100;
  } else if (PLAYER.x < 0) {
    PLAYER.x = GAME.canvas.width;
    //PLAYER.x = 0;
  } else if (PLAYER.y > GAME.canvas.height - 100) {
    PLAYER.y = GAME.canvas.height - 100;

  }
    else if (PLAYER.y < 0) {
    //PLAYER.y = GAME.canvas.height;
    PLAYER.y = 0;
    PLAYER.speedY = -PLAYER.speedY;
  }
}
function RenderPlayer(context){
  if (!PLAYER.initialized) {
    return;
  }
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.moveTo(PLAYER.x, PLAYER.y);
  context.fillRect(PLAYER.x, PLAYER.y, 100, 100);


  // context.lineWidth = 1;
  // context.stroke();
}


function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  // context.fillStyle = "blue";
  // context.fillRect (0, 0, GAME.canvas.width, GAME.canvas.height);
  // context.beginPath();
  // context.rect(0, 0, GAME.canvas.width, GAME.canvas.height);
  // context.fillStyle = "#000000";
  // context.fill();

  if (GAME.started) {

    // 1 - Reposition the objects
    handlePlayerAnimation();
    //HandleNewObjectMovement();

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height);

    // 3 - Draw new items
    RenderPlayer(context);
    //RenderNewObject(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
