window.onload = function () {
    var allAudio = document.querySelectorAll('audio');
    var allKeys = document.querySelectorAll('.key');

    function makeSound(e) {
        for (var i = 0; i < allAudio.length; i++) {
            allAudio[i].pause();
        }
        var code;
        if (e.keyCode) {
            code = e.keyCode;
        }
        else {
            code = this.getAttribute("data-key");
        }
        var activeKey = document.querySelector('.key[data-key="' + code + '"]');
        var activeAudio = document.querySelector('audio[data-key="' + code + '"]');
        if (!activeAudio) {
            return;
        }
        activeAudio.currentTime = 0;
        activeAudio.play();
        activeKey.classList.add('playing');
    }
    window.addEventListener('keydown', makeSound);
    allKeys.forEach(function (key) {
        key.addEventListener('click', makeSound);
    });
    allKeys.forEach(function (key) {
        key.addEventListener('transitionend', function (e) {
            if (e.propertyName !== 'transform') {
                return;
            }
            this.classList.remove('playing');
        });
    });
};