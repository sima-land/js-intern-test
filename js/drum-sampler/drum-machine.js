'use strict';

const KEY_CODE_ARRAY = [...document.getElementsByClassName('key')];
const AUDIO_ARRAY = [...document.getElementsByTagName('audio')];

function playSound(btnCode) {
    let isExist = checkExistenceKey(btnCode);
    let audio = document.querySelector(`audio[data-key="${isExist}"]`);
    if (audio) {
        for (let key in AUDIO_ARRAY) {
            AUDIO_ARRAY[key].pause();
            AUDIO_ARRAY[key].currentTime = 0;
        }
        audio.play()
    }

}

function fillBtn(btnCode) {
    let isPushed = document.querySelector(`[data-key="${btnCode}"]`);
    isPushed.style.cssText = 'background:red;';
    document.addEventListener('keyup', () => isPushed.style.cssText = '')
}

function checkExistenceKey(btnCode) {
    for (let key in KEY_CODE_ARRAY) {
        if (btnCode === parseInt(KEY_CODE_ARRAY[key].getAttribute('data-key'))) {
            fillBtn(btnCode);
            return btnCode
        }
    }
}

document.addEventListener('keydown', e => {
    playSound(e.keyCode);
});

