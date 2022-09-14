'use strict';

const carrotSound = new Audio('../sound/carrot_pull.mp3');
const bugSound = new Audio('../sound/bug_pull.mp3');
const bgSound = new Audio('../sound/bg.mp3');
const alertSound = new Audio('../sound/alert.wav');
const winSound = new Audio('../sound/game_win.mp3');

export function playsoundCarrot() {
  playsound(carrotSound);
}

export function playsoundBug() {
  playsound(bugSound);
}

export function playsoundBg() {
  playsound(bgSound);
}

export function playsoundAlert() {
  playsound(alertSound);
}

export function playsoundWin() {
  playsound(winSound);
}

export function stopsoundBg() {
  stopsound(bgSound);
}

function playsound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopsound(sound) {
  sound.pause();
}