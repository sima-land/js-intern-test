(function() {
  const keys = document.getElementsByClassName('key');

  let keysWithSounds = {};

  (function combineNotes() {
    for (let key of keys) {
      let dataKey = key.getAttribute('data-key');
      keysWithSounds[dataKey] = {
        key: key,
        sound: document.querySelector(`audio[data-key='${dataKey}']`)
      };
    }
  })(); //IIFE, которая собирает клавиши и звуки в объект keysWithSounds

  const animateKey = key => {
    key.style.transform = 'scale(1.2)';
    setTimeout(() => {
      key.removeAttribute('style');
    }, 100);
  };

  const playSound = sound => {
    sound.play();
    sound.classList.add('playing'); //пометим запущенный звук, чтобы стопить его впоследствии
  };

  const stopPlaying = () => {
    const playingSound = document.querySelector('audio.playing'); // найдем запущеный звук
    if (playingSound) {
      playingSound.pause();
      playingSound.currentTime = 0;
      playingSound.classList.remove('playing');
    }
  };

  const playNote = e => {
    const keyWithSound = keysWithSounds[e.keyCode];
    if (keyWithSound) {
      stopPlaying();
      animateKey(keyWithSound.key);
      playSound(keyWithSound.sound);
    }
  };

  window.addEventListener('keydown', playNote);
})();
