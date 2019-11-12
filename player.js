function InitializePlayer() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  //context.fillRect(PLAYER.x, PLAYER.y, 100, 100);
  PLAYER = {
    x : 300,
    y : 580,
  //   rotation : 0,
  //   health : 3,
  //   positions : [
  //     {
  //       x : 0,
  //      	y : 3
  //     },
  //     {
  //       x : 2,
  //      	y : -3
  //     },
  //     {
  //       x : 0,
  //      	y : 0
  //     },
  //     {
  //       x : -2,
  //      	y : -3
  //     },
  //     {
  //       x : 0,
  //      	y : 3
  //     }
  //   ],
    latest : {
        x : PLAYER.x,
        y : PLAYER.y,
    },
  //   scale : 5,
    playerSpeed : 8,
    jumpSpeed : 30,
    jumpHeight : 100,
    grounded : true,
    speedY : 0,

    // peak : false,
    initialized : true,
  //   bullets : []
  };
}

function RenderPlayer(context){
  if (!PLAYER.initialized) {
    return;
  }
  // var canvas = document.getElementById('mainCanvas');
  // var context = canvas.getContext('2d');
  context.moveTo(PLAYER.x, PLAYER.y);
  context.fillRect(PLAYER.x, PLAYER.y, 100, 100);

  // context.lineWidth = 1;
  // context.stroke();
}
