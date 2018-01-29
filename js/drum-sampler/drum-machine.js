const mashine = function() {

	let audio = new Audio();
	
	function reSize(kc) {
		var el = document.querySelector('*[data-key="' + kc + '"] kbd');
		try {
			el.style.fontWeight = '900';
			el.style.transition = 'all 0.25s';
			setTimeout(function() {
				el.style.fontWeight = 'normal';
			}, 500);
			console.log(el);
		} catch (err) {
			return;
		}
	}

	return {
		run: function() {
			document.addEventListener('keydown', (e) => {
				if (e.preventDefault) e.preventDefault();
				if (e.stopPropagation) e.stopPropagation();
				kc = e.keyCode;
				audio.pause();
				audio.currentTime = 0.0;
				reSize(kc);
				switch(kc) {
					case 65:
						audio.src ='sounds/clap.wav';
					break;
					case 83:
						audio.src ='sounds/hihat.wav';
					break;
					case 68:
						audio.src ='sounds/kick.wav';
					break;
					case 70:
						audio.src ='sounds/openhat.wav';
					break;
					case 71:
						audio.src ='sounds/boom.wav';
					break;
					case 72:
						audio.src ='sounds/ride.wav';
					break;
					case 74:
						audio.src ='sounds/snare.wav';
					break;
					case 75:
						audio.src ='sounds/tom.wav';
					break;
					case 76:
						audio.src ='sounds/tink.wav';
					break;
					default:
						return;
				}
				console.log(audio);
				audio.play();
			});
		}
	}
};
let m = mashine();
m.run();