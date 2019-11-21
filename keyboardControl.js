var CONTROLS = {
  player : {
    right : false,
    left : false,
    up : false,
    fall: false,
    fire : false
  }
};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "ArrowUp":
      CONTROLS.player.up = true;
      break;
    case "ArrowLeft":
      CONTROLS.player.left = true;
      break;
    case "ArrowRight":
      CONTROLS.player.right = true;
      break;
    case " ":
      CONTROLS.player.fire=true;
      break;
    case "l":
      GAME.level++;
      break;
    default:
      break;
  }
});

document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "ArrowUp":
      CONTROLS.player.up = false;
      CONTROLS.player.fall = true;
      break;
    case "ArrowLeft":
      CONTROLS.player.left = false;
      break;
    case "ArrowRight":
      CONTROLS.player.right = false;
      break;
      case " ":
        CONTROLS.player.fire=false;
        break;
    default:
      break;
  }
});
