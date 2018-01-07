(function() {
  const keys = document.getElementsByClassName("key");
  const sounds = document.getElementsByTagName("audio");

  const playSound = e => {
    const pressedKey = e.keyCode.toString();
    for (let key of keys) {
      if (pressedKey === key.getAttribute("data-key")) {
        key.style.transform = "scale(1.2)";
        setTimeout(() => {
          key.removeAttribute("style");
        }, 100);
      }
    }
    for (let sound of sounds) {
      sound.pause();
      sound.currentTime = 0;
      if (pressedKey === sound.getAttribute("data-key")) {
        sound.play();
      }
    }
  };
  window.addEventListener("keydown", playSound);
})();
