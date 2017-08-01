// array audio items for key-kode id
var audioKeys = [];
// array audio list
var audioList = [];
// keys for click
var buttons = document.getElementsByClassName('key')
  // array id buttons with change style for key events
var keyButtons = [];

getAudio();
setControls();

//get and sort all sounds
function getAudio() {
  audioList = document.querySelectorAll("audio");

  // set audio id for keys
  audioList.forEach(function(item) {
    audioKeys[item.attributes['data-key'].value] = item;
  });

}

function setControls() {
  document.onkeydown = onKeyDown;
  document.onkeyup = onKeyUp;

  for (var id in buttons) {

    // set buttons to keyButtons array for idKey (need for search btn with key events)
    if (buttons[id].attributes) {
      var idBtn = buttons[id].attributes['data-key'].value;
      keyButtons[idBtn] = buttons[id];

      buttons[id].onmousedown = handle;
      buttons[id].onmouseup = handleUp;
    }
  }

  // mouse down
  function handle(e) {
    var idKey = e.target.attributes['data-key'].value;
    audioKeys[idKey].play();

    //change style button
    e.target.style.padding = "1.2rem .9rem";
  }

  // mouse up
  function handleUp(e) {
    var idKey = e.target.attributes['data-key'].value;

    audioKeys[idKey].pause();
    audioKeys[idKey].currentTime = 0;

    //change style button
    e.target.style.padding = "1rem .7rem";
  }

  // key press
  function onKeyDown(e) {

    if (e.keyCode in audioKeys) {
      audioKeys[e.keyCode].play();
      //change style button
      keyButtons[e.keyCode].style.padding = "1.2rem .9rem";
    }


  }

  // key upp
  function onKeyUp(e) {
    if (e.keyCode in audioKeys) {
      audioKeys[e.keyCode].pause();
      audioKeys[e.keyCode].currentTime = 0;
      //change style button
      keyButtons[e.keyCode].style.padding = "1rem .7rem";
    }


  }
}
