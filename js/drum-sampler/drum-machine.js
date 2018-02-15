document.addEventListener("DOMContentLoaded", ready);

function ready() {
	var pads = document.querySelectorAll(".key"), 
	audios = document.querySelectorAll("audio"),
	drum_machine = new Object();
	current_key = null;

	audios.forEach(function(audio) {
		key = audio.getAttribute("data-key");
		drum_machine[key] = new Object();
		drum_machine[key].sound = audio;
	});
	
	pads.forEach(function(pad) {
		key = pad.getAttribute("data-key");
		if(drum_machine[key]) {
			drum_machine[key].pad = pad;
		};
	});

	function playSound(e) {
		var keycode = e.keyCode;
		if(drum_machine[keycode]) {
			var key = drum_machine[keycode]; 
			key.pad.className = key.pad.className + " playing";

			setTimeout(function() {
				key.pad.className = key.pad.className.replace(/\bplaying\b/g, "");	
			}, 70);

			if(current_key) {
				drum_machine[current_key].sound.pause();
				drum_machine[current_key].sound.currentTime = 0;
			};
			current_key = keycode;
			drum_machine[current_key].sound.play();
		};
	};

	document.addEventListener("keypress", playSound);
};