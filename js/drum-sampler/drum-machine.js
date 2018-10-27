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
      keys[i].className = "key playing";

      if (prevSoundIndex !== undefined && prevSoundIndex !== i) {
        keys[prevSoundIndex].className = "key";
        sounds[prevSoundIndex].pause();
        sounds[prevSoundIndex].currentTime = 0;
      }

      prevSoundIndex = i;
      sound.play();
    }
  });
};
