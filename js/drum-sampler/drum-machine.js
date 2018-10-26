"use strict";
const keys = document.querySelectorAll('.key');
function playSample(e) {
    const sample = document.getElementById(e);
    if(sample) {
         sample.currentTime = 0;
         sample.play();
    }
}
function playSound(e){
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if(audio){
      audio.currentTime = 0;
      audio.play();
      key.classList.add('playing');
  }
}
function removeTransition(e){
  if(e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

keys.forEach(elem => elem.addEventListener('transitionend', removeTransition))

window.addEventListener('keydown', playSound);
