// Run event listeners for keyup and keydown
window.onload = function() {
			document.addEventListener('keydown', playDrums);
			document.addEventListener('keyup', stopDrums);
		}

var samplesMap = {
	'65': 'clap',
	'83': 'hihat',
	'68': 'kick',
	'70': 'openhat',
	'71': 'boom',
	'72': 'ride',
	'74': 'snare',
	'75': 'tom',
	'76': 'tink'
}

function playSample(sampleName) {
   var sample = document.getElementById(sampleName);
   sample.play();
}

function pauseSample(sampleName) {
   var sample = document.getElementById(sampleName);
   sample.pause();
   sample.currentTime = 0;
}

// Increasing and decreasing pad size through adding and removing 'playing' class
function changePadSize(eventKeyCode) {
  var elements = document.querySelectorAll('.key');

  for (var i = 0; i < elements.length; i++) {
    element = elements[i];

    if (element.dataset.key == eventKeyCode && !element.classList.contains('playing')) {
      element.classList.add('playing');
    } else {
      element.classList.remove('playing');
    }
  }
}

function playDrums(evt) {
	for (var key in samplesMap) {
    if (evt.keyCode == key) {
	    playSample(samplesMap[key]);
	    changePadSize(evt.keyCode);
	  } 
  }
}

function stopDrums(evt) {
	for (var key in samplesMap) {
    if (evt.keyCode == key) {
      pauseSample(samplesMap[key]);
      changePadSize(evt.keyCode);
    } 
  }
}