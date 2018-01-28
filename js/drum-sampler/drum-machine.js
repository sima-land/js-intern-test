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

let audioDB = [];
let audio = new Audio();

function newAudio(name) {
	if (audioDB[name]) {
		return audioDB[name];
	} else {
		src= 'sounds/' + name + '.wav';
		audioDB[name] = new Audio(src);
		return audioDB[name];
	}
}

document.addEventListener('keydown', (e) => {
	if (e.preventDefault) e.preventDefault();
	if (e.stopPropagation) e.stopPropagation();
	kc = e.keyCode;
	audio.pause();
	audio.currentTime = 0.0;
	reSize(kc);
	switch(kc) {
		case 65:
			audio = newAudio('clap');
		break;
		case 83:
			audio = newAudio('hihat');
		break;
		case 68:
			audio = newAudio('kick');
		break;
		case 70:
			audio = newAudio('openhat');
		break;
		case 71:
			audio = newAudio('boom');
		break;
		case 72:
			audio = newAudio('ride');
		break;
		case 74:
			audio = newAudio('snare');
		break;
		case 75:
			audio = newAudio('tom');
		break;
		case 76:
			audio = newAudio('tink');
		break;
		default:
			return;
	}
	audio.play();
});
