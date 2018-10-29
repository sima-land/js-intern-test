/**
 * UTILS
 */

const forEachEl = (els, cb) => {
  for (let i = 0; i < els.length; i++) {
    cb(els[i], i);
  }
};

/**
 * APP
 */

const sounds = document.getElementsByTagName("audio");
const keys = document.getElementsByClassName("key");

let prevSoundIndex;
document.onkeydown = e => {
  forEachEl(sounds, (sound, i) => {
    if (e.which == sound.dataset.key) {
      sound.currentTime = 0;
      keys[i].className = "key playing";

      sound.onended = () => {
        keys[i].className = "key";
      };

      if (prevSoundIndex !== undefined) {
        if (prevSoundIndex === i) {
          sounds[prevSoundIndex].currentTime = 0;
        } else {
          keys[prevSoundIndex].className = "key";
        }
      }

      prevSoundIndex = i;
      sound.play();
    }
  });
};
