(function () {
	const keyCodes = [65, 83, 68, 70, 71, 72, 74, 75, 76];
	const dataKeys = {};
	const DOMClasses = {
		playingString: 'playing'
	};
	const playingState = {
		timerId: null,
		code: null,
	};

	for (let code of keyCodes) {
		const audio = document.querySelector(`audio[data-key="${code}"]`);
		const key = document.querySelector(`.key[data-key="${code}"]`);

		dataKeys[code] = { key, audio, code };
	}

	document.addEventListener('keyup', playAudioHandler);

	function playAudioHandler (event) {
		const { keyCode } = event;
		const data = dataKeys[keyCode];

		if (typeof data === 'undefined') return;

		stopPlay();

		playAudio(data);
	}

	function playAudio (data) {
		const { key, audio, code } = data;

		audio.play()
			.then(() => toggleKey(key))
			.catch(() => console.error('An error has occurred!'));

		playingState.code = code;
	}

	function toggleKey (key) {
		key.classList.add(DOMClasses.playingString);

		playingState.timerId = setTimeout(function () {
			key.classList.remove(DOMClasses.playingString)
		}, 100);
	}

	function stopPlay () {
		const { code, timerId } = playingState;

		if (code) {
			const { key, audio } = dataKeys[code];

			audio.pause();
			audio.currentTime = 0;

			clearTimeout(timerId);
			key.classList.remove(DOMClasses.playingString)
		}
	}
})()
