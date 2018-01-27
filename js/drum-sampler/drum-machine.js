function reSize(kc) {
	var el = document.querySelector('*[data-key="' + kc + '"] kbd');
	try {
		el.style.fontWeight = '900';
		setTimeout(function() {
			el.style.fontWeight = 'normal';
		}, 500);
		console.log(el);
	} catch (err) {
		return;
	}
}

var audio= new Audio();

document.addEventListener('keydown', (e) => {
	if (e.preventDefault) e.preventDefault();
	if (e.stopPropagation) e.stopPropagation();
	kc = e.keyCode;
	audio.pause();
	reSize(kc);
	switch(kc) {
		case 65:
			audio = new Audio("sounds/clap.wav");
		break;
		case 83:
			audio = new Audio("sounds/hihat.wav");
		break;
		case 68:
			audio = new Audio("sounds/kick.wav");
		break;
		case 70:
			audio = new Audio("sounds/openhat.wav");
		break;
		case 71:
			audio = new Audio("sounds/boom.wav");
		break;
		case 72:
			audio = new Audio("sounds/ride.wav");
		break;
		case 74:
			audio = new Audio("sounds/snare.wav");
		break;
		case 75:
			audio = new Audio("sounds/tom.wav");
		break;
		case 76:
			audio = new Audio("sounds/tink.wav");
		break;
		default:
			return;
	}
	audio.play();
});