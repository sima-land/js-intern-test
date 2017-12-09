window.onload = () => {	
	let audio = document.getElementsByTagName('audio');
	let block = document.getElementsByClassName('key');
	let block_enter = document.getElementsByClassName('key_enter');
	document.onkeydown = function(e) {
		
    if (e.keyCode == 'a'.charCodeAt() || e.keyCode == 'A'.charCodeAt()) {		
		stop()
		var i = 0;
		audio[0].src = './sounds/clap.wav';
		audio[0].play()
		effect()
		
    }else if (e.keyCode == 's'.charCodeAt() || e.keyCode == 'S'.charCodeAt()) {       
		stop()
		var i = 1;
		audio[1].src = './sounds/HIHAT.wav';
		audio[1].play()
		effect()
		
    }else if (e.keyCode == 'd'.charCodeAt() || e.keyCode == 'D'.charCodeAt()) {        
		stop()
		var i = 2;
		audio[2].src = './sounds/KICK.wav';
		audio[2].play()		
		effect()
		
    }else if (e.keyCode == 'f'.charCodeAt() || e.keyCode == 'F'.charCodeAt()) {        
		stop()
		var i = 3;
		audio[3].src = './sounds/OPENHAT.wav';
		audio[3].play()
		effect()		
		
    }else if (e.keyCode == 'g'.charCodeAt() || e.keyCode == 'G'.charCodeAt()) {		
		stop()
		var i = 4;
		audio[4].src = './sounds/BOOM.wav';
		audio[4].play()
		effect()
		
    }else if (e.keyCode == 'h'.charCodeAt() || e.keyCode == 'H'.charCodeAt()) {
		stop()
		var i = 5;
		audio[5].src = './sounds/RIDE.wav';
		audio[5].play()
		effect()
		
    }else if (e.keyCode == 'j'.charCodeAt() || e.keyCode == 'J'.charCodeAt()) {		
		stop()	
		var i = 6;
		audio[6].src = './sounds/SNARE.wav';
		audio[6].play()
		effect()
		
    }else if (e.keyCode == 'k'.charCodeAt() || e.keyCode == 'K'.charCodeAt()) {	 
		stop()
		var i = 7;
		audio[7].src = './sounds/TOM.wav';
		audio[7].play()		
		effect()
		
    }else if (e.keyCode == 'l'.charCodeAt() || e.keyCode == 'L'.charCodeAt()) {	
		stop()
		var i = 8;
		audio[8].src = './sounds/TINK.wav';
		audio[8].play()	
		effect()
    }
	
	function stop(){
		let audios = document.getElementsByTagName("audio");
		audios = Array.from(audios)
		audios.forEach(e => { e.pause();})
	}
	
	function effect(){
		block[i].className = 'key_enter'
		setTimeout (function(){
			block_enter[0].className = 'key'
		}, 100)
	}

}}

	
