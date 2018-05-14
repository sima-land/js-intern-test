// Get audios from page to hash
const audioNodes = document.querySelectorAll('audio');
const waves = Object.keys(audioNodes).reduce((acc, wave) => {
    const soundKey = audioNodes[wave].dataset.key;  // attr 'data-key' is index
    return {...acc, [soundKey]: audioNodes[wave]};
}, {});

// Play sound by code function //
const playSound = (soundKey) => {

    // remove 'playing class from all buttons
    document.querySelectorAll('div.keys>div.playing').forEach((btn) => {
        btn.classList.remove('playing');
        waves[btn.dataset.key].pause();
        waves[btn.dataset.key].currentTime = 0;
    });

    // play audio
    const wave = document.querySelector(`audio[data-key='${soundKey}']`);
    const btn = document.querySelector(`div.keys>div[data-key='${soundKey}']`);
    if (wave) {
        btn.classList.add('playing');
        wave.addEventListener('ended', function (e) {   // add listener to current audio ended
            btn.classList.remove('playing');  
        },false);

        wave.play().catch((err) => {});
    }

};

// Sound button click //
const keys = document.querySelector('div.keys');

keys.addEventListener('click', (e) => {
    const clickedDiv = (node) => node.classList.contains('key') ? node : clickedDiv(node.parentNode); // Go up to '.key' node
    const btn = clickedDiv(e.target);
    playSound(btn.dataset.key);
});

// Document keypress //
const onKeyPress = (e) => {
    const code = e.keyCode;
    playSound(code >= 97 && code <= 122 ? code - 32 : code );    // Send UpCase key code
    
};

document.addEventListener('keypress', onKeyPress);



 