function ready() {
	var pads = document.querySelectorAll('.key'), 
	audios = document.querySelectorAll('audio'),
	drumMachine = new Object(),
	currentKey = null;

	audios.forEach(function(audio) {
		var key = audio.getAttribute('data-key');
		drumMachine[key] = new Object();
		drumMachine[key].sound = audio;
	});
	
	pads.forEach(function(pad) {
		var key = pad.getAttribute('data-key');
		if(drumMachine[key]) {
			drumMachine[key].pad = pad;
		};
	});

	function playSound(e) {
		var keycode = e.keyCode;
		if(drumMachine[keycode]) {
			var key = drumMachine[keycode]; 
			key.pad.className = key.pad.className + ' playing';

			setTimeout(function() {
				key.pad.className = key.pad.className.replace(/\bplaying\b/g, '');	
			}, 70);

			if(currentKey) {
				drumMachine[currentKey].sound.pause();
				drumMachine[currentKey].sound.currentTime = 0;
			};
			currentKey = keycode;
			drumMachine[currentKey].sound.play();
		};
	};

	document.addEventListener('keypress', playSound);
};

document.addEventListener('DOMContentLoaded', ready);