'use strict';

const keys = [...document.querySelectorAll('.key')];
const keyCodes = keys.map( (el) => {
    return el.getAttribute('data-key');
});

let currKey;
let currSound;
let currCode;

document.addEventListener('keydown', (evt) => {
    if (currSound) {
        if (currSound.currentTime > 0) {
            currSound.pause();

            keys.forEach((key) => {
                key.style.transform = 'scale(1)';
            });
        }
    }

    currCode = evt.keyCode;
    
    keyCodes.forEach((code, i) => {
        if (currCode === Number(code)) {
            currKey = keys[i];
            currKey.style.transform = 'scale(1.2)';

            currSound = document.querySelector('audio[data-key="' + code + '"]');

            currSound.addEventListener('ended', () => {
                currKey.style.transform = 'scale(1)';
            });

            currSound.currentTime = 0.0;
            currSound.play();
        }
    });
});
