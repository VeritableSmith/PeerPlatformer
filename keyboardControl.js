var CONTROLS = {
  player : {
    right : false,
    left : false,
    up : false,
    fall: false
    // rotateClockwise : false,
    // rotateCounterClockwise : false
  // },
  // fire : {
  //   active : false,
  //   lastFireTime : 0
  }

};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case " ":
      CONTROLS.player.up = true;
      break;
    // case "ArrowDown":
    //   CONTROLS.player.backward = true;
    //   break;
    case "ArrowLeft":
      CONTROLS.player.left = true;
      break;
    case "ArrowRight":
      CONTROLS.player.right = true;
      break;
    // case " ":
    //   CONTROLS.fire.active = true;
    //   break;
    default:
      break;
  }
});

document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case " ":
      CONTROLS.player.up = false;
      CONTROLS.player.fall = true;
      break;
    // case "ArrowDown":
    //   CONTROLS.player.backward = false;
    //   break;
    case "ArrowLeft":
      CONTROLS.player.left = false;
      break;
    case "ArrowRight":
      CONTROLS.player.right = false;
      break;
    // case " ":
    //   CONTROLS.fire.active = false;
    //   break;
    default:
      break;
  }
});
