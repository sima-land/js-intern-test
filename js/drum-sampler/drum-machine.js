let mySound = new Audio();

const keyDown = event => {
  const keyCode = event.keyCode;

  mySound = document.querySelector(`audio[data-key='${keyCode}']`);
  if(!mySound.paused){
    doublePlay(mySound)
  }
  mySound.pause();
  addClass(keyCode);  
  mySound.play();
}

const doublePlay = Node => {
  if(!document.querySelector(`audio[data-key='${Node.dataset.key}d']`)) {    
    Node.insertAdjacentHTML('afterend', `<audio data-key="${Node.dataset.key}d" src="${Node.src}"></audio>`);
  }
  let mySound1 = new Audio();
  mySound1 = document.querySelector(`audio[data-key='${Node.dataset.key}d']`);
  mySound1.play();
  mySound1.addEventListener('ended', () => mySound1.remove());
}

const addClass = keyCode => {
  const elem = document.querySelector(`div[data-key='${keyCode}']`);

  elem.classList.add('playing');
  setTimeout(() => {
    elem.classList.remove('playing');
  }, 100);
};

document.addEventListener('keydown', keyDown);
