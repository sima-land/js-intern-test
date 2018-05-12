// Play sound by code function
const playSound = soundKey => {

    // stop all sounds
    document.querySelectorAll('audio').forEach(wave => {
        wave.pause();
        wave.currentTime = 0;
    });
    // remove 'playing class from all buttons
    document.querySelectorAll('div.keys>div').forEach( btn => {
        btn.classList.remove('playing');
    });

    // play audio
    const wave = document.querySelector(`audio[data-key='${soundKey}']`);
    const btn = document.querySelector(`div.keys>div[data-key='${soundKey}']`);
    if (wave) {
        btn.classList.add('playing');
        wave.addEventListener('ended', function (e) {   // add listener to current audio ended
            btn.classList.remove('playing');  
        },false);

        wave.play().catch(err => {});
    }

};

// Sound button click
const onBtnClick = e => {
    playSound(event.currentTarget.dataset.key);
}

const keys = document.querySelectorAll('div.keys>div');
keys.forEach(key => {
    key.addEventListener('click', onBtnClick);
});

// Document keypress
const onKeyPress = e => {
    const code = e.keyCode;
    playSound(code >= 97 && code <= 122 ? code - 32 : code );    // Send UpCase key code
    
}
document.addEventListener('keypress', onKeyPress);



 