  function playAudio(e) {
      var audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      var key = document.querySelector(`div[data-key="${e.keyCode}"]`);
      if (!audio) return;
      audio.play();
  }
  var keys = Array.from(document.querySelectorAll('.key'));
  window.addEventListener('keydown', playAudio);