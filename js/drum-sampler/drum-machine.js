var currentAudio;

document.addEventListener('keydown', playAudio);

//метод остановки воспроизведения
HTMLAudioElement.prototype.stop = function() {
this.pause();
this.currentTime = 0.0;
}

//проигрывание звука
function playAudio (event) {
    if (currentAudio) currentAudio.stop();
    currentAudio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    if (currentAudio != null) {
        currentAudio.play();
        btnHighlight(event.keyCode);
    }
}

//подсветить кнопку
function btnHighlight (keyCode) {
    var btn = document.querySelector(`div[data-key="${keyCode}"]`);
    btn.classList.toggle('playing');
    setTimeout(() => {
        btn.classList.toggle('playing');
    }, 500);
}




//проверка возможности проигрывания аудио
function checkAudio() {
    var elem = document.createElement('audio'), bool = false;
        if ( bool = !!elem.canPlayType )   return bool;
}

if(!checkAudio()) alert('Audio не поддерживается');