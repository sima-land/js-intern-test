drum = function(selectorKey) {

	var audios = []

	loadAudio = function() {
		elements = document.querySelectorAll(selectorKey);
		for (i = 0; i < elements.length; i++) {
			el = elements[i];
			key = el.getAttribute('data-key');
			audioEl = document.querySelector('audio[data-key="' + key + '"]');
			if (audioEl == undefined) {
				alert("Чего-то не хватает");
				continue;
			}
			audios[key] = audioEl;
			el.onclick = click;
		}
	}

	play = function(key) {
		if (!audios[key]) {
			return;
		}
		audios[key].pause();
		audios[key].currentTime = 0;
		audios[key].play();
	}

	press = function(e) {
		key = e.keyCode;
		if (e.keyCode >= 97) {
			key = e.keyCode - 32;
		}
		play(key);
	}

	click = function() {
		play(this.getAttribute('data-key'));
	}

	document.onkeypress = press;
	loadAudio();
}

window.onload = function() {
	drum('div[data-key]');
};

