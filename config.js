var GAME = {
  canvas : {
    width : 510,
    height : 680
  },
  started : true,
  level : 0,
  levelTransition : false,
  platforms : [],
  obstacles : [],
  enemies : []
};
var PLAYER = {
  initialized : false,
  latest : {
    x : 0,
    y : 0
  }
};
