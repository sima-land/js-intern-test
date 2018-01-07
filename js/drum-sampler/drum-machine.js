(function() {
  let keys = document.getElementsByClassName("key");
  let sounds = document.getElementsByTagName("audio");
  const defineKey = e => {
    let key = e.keyCode;
    Array.from(keys).forEach(item => {
      if (key.toString() === item.getAttribute("data-key")) {
        item.style.transform = "scale(1.2)";
        setTimeout(() => {
          item.style.transform = "scale(1)";
        }, 100);
      }
    });
    Array.from(sounds).forEach(item => {
      item.pause();
      item.currentTime = 0;
      if (key.toString() === item.getAttribute("data-key")) {
        item.play();
      }
    });
  };
  window.addEventListener("keydown", defineKey);
})();
