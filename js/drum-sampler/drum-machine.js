window.onload = function () {
    var allAudio = document.querySelectorAll('audio');
    var allKeys = document.querySelectorAll('.key');
    var all = {};
    for (var i = 0; i < allAudio.length; i++) {
        var id = allAudio[i].dataset.key;
        var value = {
            audio: allAudio[i]
        }
        for (var r = 0; r < allKeys.length; r++) {
            if (allKeys[r].dataset.key === id) {
                value.button = allKeys[r];
            }
        }
        all[id] = value;
    }
    var active = {};

    function transformButton() {
        active.button.classList.add('playing');
        active.button.addEventListener('transitionend', function (e) {
            if (e.propertyName !== 'transform') {
                return;
            }
            this.classList.remove('playing');
        });
    }

    function makeSound(newAudio) {
        if (active.audio) {
            active.audio.pause();
        }
        active = newAudio;
        active.audio.currentTime = 0;
        active.audio.play();
        transformButton();
    }

    function setAudio(e) {
        var code = e.keyCode ? e.keyCode : e.dataset.key;
        var newAudio = all[code];
        if (!newAudio) {
            return;
        }
        makeSound(newAudio);
    }
    window.addEventListener('keydown', setAudio);
    document.querySelector('.keys').onclick = function (e) {
        var target = e.target;
        var button = target.closest('.key');
        if (button) {
            setAudio(button);
        }
    };
};