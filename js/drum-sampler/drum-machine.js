
document.addEventListener('keydown', event => {
  const numberKey = event.keyCode;
  const elem = [...document.querySelectorAll(`[data-key="${numberKey}"]`)];
  elem[0].style.cssText='padding: 1.3rem 0.78rem; margin: 0.7rem';
  HTMLAudioElement.prototype.stop = function() {
    this.pause();
    this.currentTime = 0.0;
  };
  // const arrAudio = document.getElementsByTagName('audio');
  // for (let i = 0; i < arrAudio.length; i++) {
  //     arrAudio[i].stop();
  // }
  elem[1].stop();
  elem[1].play();
});

document.addEventListener('keyup', event => {
  const elem = [...document.querySelectorAll(`[data-key="${event.keyCode}"]`)];
  elem[0].style.cssText='';
});