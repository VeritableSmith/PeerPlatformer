/*
This file explains how to make colliders:
- Just look at the other files.
- I wrote a function called manageLevel3() by importing a package in the keyboardControl class.








*/































var canvas = document.getElementById('mainCanvas');
var contextV = canvas.getContext('2d');
var video = document.createElement("video");
var song = new Audio();
song.src="win_song_game.mp3";
video.src="win_vid_game.mov";

video.addEventListener('play', () => {
  function step() {
    contextV.drawImage(video, 0, 0, canvas.width, canvas.height)
    requestAnimationFrame(step)
  }
  requestAnimationFrame(step);
})

function manageLevel3() {
  song.play();
  video.play();
}
