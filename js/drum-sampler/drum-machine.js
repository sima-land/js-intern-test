let audio= new Audio();
 
 document.addEventListener('keydown', keyPress);
 
 function keyPress (e) {
 	let code = e.keyCode;
 	audio.pause();
 	addClass(code);
 	audio = document.querySelector('audio[data-key="' + code + '"]');
 	audio.play();
 } 
 
 
 function addClass(code) {
 	let el = document.querySelector('*[data-key="' + code + '"]');
 	try {
 		el.classList.add("playing");
 		setTimeout(function() {
 			el.classList.remove("playing");
 		}, 250);
 	} catch (err) {
 		return;
 	}
 }
 