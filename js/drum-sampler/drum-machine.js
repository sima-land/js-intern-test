const keys = document.querySelectorAll(".key")
const audioElements = document.getElementsByTagName("audio")



function playNote(e) {
    for(i=0; i < audioElements.length; i++) {
      const audioElement = audioElements[i];
      if (audioElement !== event.target) {
        audioElement.pause();
      }
    }
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
        key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!key) return;
    audio.currentTime = 0;
   
    audio.play();
    
    key.classList.add("playing");
}
function playNoteUp(e){
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(key.classList.contains("playing"))key.classList.remove("playing")
}

window.addEventListener("keydown", playNote);
window.addEventListener("keyup", playNoteUp);