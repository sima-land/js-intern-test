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

const highlight = key => {
  key.className = "key playing";
};

const unhighlight = key => {
  key.className = "key";
};

let prevSoundIndex;
document.onkeydown = e => {
  forEachEl(sounds, (sound, i) => {
    if (e.which == sound.dataset.key) {
      sound.currentTime = 0;
      highlight(keys[i]);

      sound.onended = () => {
        unhighlight(keys[i]);
      };

      if (prevSoundIndex !== undefined && prevSoundIndex !== i) {
        unhighlight(keys[prevSoundIndex]);
      }

      prevSoundIndex = i;
      sound.play();
    }
  });
};
