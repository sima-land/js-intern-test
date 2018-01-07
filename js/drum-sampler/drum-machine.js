(function() {
  let keys = document.getElementsByClassName("key");
  let sounds = document.getElementsByTagName("audio");
  const defineKey = e => {
    let key = e.keyCode;
    console.log(key);
  };
  window.addEventListener("keydown", defineKey);
})();
