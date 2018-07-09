$(document).keydown(function(e){
	        k = e.keyCode;
	        $('audio:not([data-key=' + k + '])').each(function(){
				  this.pause();
				  this.currentTime = 0;
				});
	        $('audio[data-key=' + k + ']').get(0).play();
	        $('.key[data-key=' + k + ']').addClass('playing');
	    });
$(document).keyup(function(){
	   		$('.key').removeClass('playing');
});
