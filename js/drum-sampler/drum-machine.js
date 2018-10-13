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
    }, 1000);
}




//проверка возможности проигрывания аудио
function check_audio() {
    var elem = document.createElement('audio'), bool = false;
    try {
        if ( bool = !!elem.canPlayType ) {
        bool = new Boolean(bool);
        bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/,'');
        }
    } catch(e) {}

    return bool;
}

var b = check_audio();

if(!b) {
    alert('Audio не поддерживается');
    } else {
    var formats = 'wav';
    console.log(formats + ' - ' + b[formats]);
}