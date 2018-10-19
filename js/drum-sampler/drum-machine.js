
document.addEventListener('keydown', event => {
  const elem = [...document.querySelectorAll(`[data-key="${event.keyCode}"]`)];
  elem[0].style.cssText='padding: 1.3rem 0.8rem; margin: 0.7rem';
  HTMLAudioElement.prototype.stop = function() {
    this.pause();
    this.currentTime = 0.0;
  };
  elem[1].stop();
  elem[1].play();
});

document.addEventListener('keyup', event => {
  const elem = [...document.querySelectorAll(`[data-key="${event.keyCode}"]`)];
  elem[0].style.cssText='';
});
