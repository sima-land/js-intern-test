'use strict';

document.addEventListener('keydown', playSound);

let lastBtn;
let lastSound;

function playSound({ keyCode }) {
  stopSound();

  lastBtn = document.querySelector(`.key[data-key="${keyCode}"]`);
  lastSound = document.querySelector(`audio[data-key="${keyCode}"]`);

  if (!lastSound) return;

  lastSound.currentTime = 0;
  lastSound.play();

  lastBtn.classList.add('playing');
}

function stopSound() {
  if (!lastBtn) return;
  lastBtn.classList.remove('playing');
}

const sounds = document.querySelectorAll('audio');

for (let sound of sounds) {
  sound.addEventListener('ended', stopSound);
}
