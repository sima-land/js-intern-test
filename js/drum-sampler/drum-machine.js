window.onload = function () {
    var allAudio = document.querySelectorAll('audio');
    var allKeys = document.querySelectorAll('.key');
    
    window.addEventListener('keydown', makeSound);
    
    allKeys.forEach(function (key) {
        key.addEventListener('click', makeSound);
    })
    allKeys.forEach(function (key) {
        key.addEventListener('transitionend', function (e) {
            if (e.propertyName !== 'transform') return;
            this.classList.remove('playing');
        });
    });

    function makeSound(e) {
        for (var i = 0; i < allAudio.length; i++) {
            allAudio[i].pause();
        }
        var code = e.keyCode ? e.keyCode : this.getAttribute("data-key");
        var activeKey = document.querySelector('.key[data-key="' + code + '"]');
        var activeAudio = document.querySelector('audio[data-key="' + code + '"]');
        if (!activeAudio) return;
        activeAudio.currentTime = 0;
        activeAudio.play();
        activeKey.classList.add('playing');
    }
}