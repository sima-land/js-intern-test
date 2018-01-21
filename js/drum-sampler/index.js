DrumMachine = function(selector) {

	this.sounds = {};
	var self = this;
	

	this.fire = function(){
		for(var sound in this.sounds) {
		  	if (!this.sounds.hasOwnProperty(sound)) continue;
			 this.sounds[sound].keyElement.addEventListener("click",  clickHandler );
			 this.sounds[sound].audioElement.addEventListener("playing", audioPlayHandler );
			 this.sounds[sound].audioElement.addEventListener("pause",  audioPauseHandler );
		}
		document.addEventListener('keypress', keyPressHandler);		
	}

	this.stop = function(){
		for(var sound in this.sounds) {
		  	if (!this.sounds.hasOwnProperty(sound)) continue;
			 this.sounds[sound].keyElement.removeEventListener("click",  clickHandler );
		}
		document.removeEventListener('keypress', keyPressHandler);	 
	}

	var init = function() {
		var keyElements = document.querySelectorAll(selector);
		for (var i = 0; i < keyElements.length; i++) {
			var key = keyElements[i];
			var keyCode = key.getAttribute('data-key');
			if(keyCode === null){
				throw new Error('Attribute data-key not found!');
			}
			var audioElement = document.querySelector('audio[data-key="' + keyCode + '"]');
			if (!audioElement) {
				throw new Error('Audio element not found, for data-key = ' + keyCode);
			}
			self.sounds[keyCode] = {
				keyElement: key,
				audioElement: audioElement
			};
		}
	};

	var playSound = function (key) {
		var sound = self.sounds[key];
		if (!sound)
			return;
	
		sound.audioElement.pause();
		sound.audioElement.currentTime = 0;
		sound.audioElement.play();
	}

	var clickHandler = function(event) {
		var keyCode = event.currentTarget.getAttribute('data-key');
		playSound(keyCode);		
	}.bind(this)

	var keyPressHandler = function (event) {
		var keyCode = String.fromCharCode(event.keyCode).toUpperCase().charCodeAt(0);
		playSound(keyCode);
	}.bind(this)
	
	var audioPlayHandler = function (event) {
		var keyCode = event.currentTarget.getAttribute('data-key');
	    this.sounds[keyCode].keyElement.classList.add("playing"); 
	}.bind(this)

	var audioPauseHandler = function (event) {
		var keyCode = event.currentTarget.getAttribute('data-key');
	    this.sounds[keyCode].keyElement.classList.remove("playing"); 
	}.bind(this)

	init();
}

window.onload = function() {
	var drum = new DrumMachine('div.key');
	drum.fire();	
};