(function() {
	document.addEventListener('DOMContentLoaded', () => {
		const audioNodes = [... document.querySelectorAll('audio')];
		const keyNodes = [... document.querySelectorAll('.key')];

		new DrumMachine(audioNodes, keyNodes);
	});
})();

class DrumMachine {
	constructor(audioNodes, keyNodes) {
		this.keys = {};
		this.namespace = {
			playing:  'playing'
		}

		keyNodes.forEach(keyNode => {
			const keyCode = +keyNode.dataset.key;
			this.keys[keyCode] = {
				keyNode,
				keyCode,
				audioNode: null
			}
		});

		audioNodes.forEach(audioNode => {
			const keyCode = audioNode.dataset.key;

			if(!this.keys[keyCode]) {
				return;
			}

			this.keys[keyCode].audioNode = audioNode;
		});

		this.bindEvents();
	}

	bindEvents() {
		document.addEventListener('keyup', e => {
			if(!this.keys.hasOwnProperty(e.keyCode)) {
				return;
			}

			this.handlePressKey(e.keyCode);
		});
	}

	resetAllKeys() {
		for(let keyCode in this.keys) {
			this.handleEndPlaying(keyCode);
		}
	}

	handlePressKey(eventKeyCode) {
		this.resetAllKeys();

		const currentKey = this.keys[eventKeyCode];
		const key = currentKey.keyNode;
		const audio = currentKey.audioNode;

		key.classList.add(this.namespace.playing);
		audio.play();

		setTimeout(() => {
			this.handleEndPlaying(eventKeyCode);
		}, audio.duration * 1000);
	}

	handleEndPlaying(keyCode) {
		const key = this.keys[keyCode];
		key.keyNode.classList.remove(this.namespace.playing);

		key.audioNode.pause();
		key.audioNode.currentTime = 0.0;
	}
}