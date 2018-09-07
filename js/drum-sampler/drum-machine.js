let mySound = new Audio();

const keyDown = event => {
  const keyCode = event.keyCode;

  // mySound.pause();
  addClass(keyCode);
  mySound = document.querySelector(`audio[data-key='${keyCode}']`);
  mySound.play();
};

const addClass = keyCode => {
  const elem = document.querySelector(`div[data-key='${keyCode}']`);

  elem.classList.add('playing');
  setTimeout(() => {
    elem.classList.remove('playing');
  }, 100);
};

document.addEventListener('keydown', keyDown);
