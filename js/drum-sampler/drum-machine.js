'use strict';

(function () {
    let audios = document.querySelectorAll('audio');

    let store = {};

    audios.forEach(
        (audio) => {
            let keyCode = audio.getAttribute('data-key');

            store[keyCode] = {
                button: document.querySelector(`div[data-key="${keyCode}"]`),
                audio: document.querySelector(`audio[data-key="${keyCode}"]`),
            };
        }
    );

    document.addEventListener(
        'keydown',
        (event) => {
            let set = store[event.keyCode];
            if (set !== undefined) {
                set.button.classList.add('playing');

                set.audio.load();
                set.audio.play();
            }
            event.preventDefault();
        },
        false
    );

    document.addEventListener(
        'keyup',
        (event) => {
            let set = store[event.keyCode];
            if (set !== undefined) {
                set.button.classList.remove('playing');
            }
            event.preventDefault();
        },
        false
    );
})();
