window.onload = function () {
    var allAudio = document.querySelectorAll('audio');
    var allKeys = document.querySelectorAll('.key');
    var all = [];
    for (var i = 0; i < allAudio.length; i++) {
        var audio = {
            id: allAudio[i].dataset.key
            , audio: allAudio[i]
        };
        for (var r = 0; r < allKeys.length; r++) {
            if (allKeys[r].dataset.key === audio.id) {
                audio.button = allKeys[r];
            }
        }
        all.push(audio);
    }
    var active = {};

    function setNewAudio(code) {
        var newAudio = {};
        all.forEach(function (element) {
            if (element.id === code) {
                newAudio.audio = element.audio;
                newAudio.button = element.button;
            }
        });
        return newAudio;
    }

    function makeSound(newAudio) {
        if (active.audio) {
            active.audio.pause();
        }
        active = newAudio;
        active.audio.currentTime = 0;
        active.audio.play();
        active.button.classList.add('playing');
    }

    function setAudio(e) {
        var code = e.keyCode ? e.keyCode : e.dataset.key;
        var newAudio = setNewAudio(code.toString());
        if (!newAudio.audio || !newAudio.button) {
            return;
        }
        makeSound(newAudio);
    }
    window.addEventListener('keydown', setAudio);
    window.onclick = function (e) {
        var target = e.target;
        var button = target.closest('.key');
        setAudio(button);
    };
    allKeys.forEach(function (key) {
        key.addEventListener('transitionend', function (e) {
            if (e.propertyName !== 'transform') {
                return;
            }
            this.classList.remove('playing');
        });
    });
};