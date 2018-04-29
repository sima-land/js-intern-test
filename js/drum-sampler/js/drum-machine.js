        var sounds = document.querySelectorAll('audio');
        var keys = document.querySelectorAll('.key');
        var all = {};
        for (var i = 0; i < sounds.length; i++) {
            var id = sounds[i].dataset.key;
            var value = {
                audio: sounds[i]
            };
            for (var j = 0; j < keys.length; j++) {
                if (keys[j].dataset.key === id) {
                    value.button = keys[j];
                }
            }
            all[id] = value;
        }
        var activeButton = {};
        function increaseBlock() {
            activeButton.button.classList.add('playing');
            activeButton.button.addEventListener('transitionend', function (e) {
            if (e.propertyName !== 'transform') {
                return;
            }
            this.classList.remove('playing');
        });
        }
        function playTracks(createAudio) {
            if (activeButton.audio) {
                activeButton.audio.pause();
            }
            activeButton = createAudio;
            activeButton.audio.currentTime = 0;
            activeButton.audio.play();
        }
        function playAudio(e) {
            var code = e.keyCode ? e.keyCode : e.dataset.key;
            var createAudio = all[code];
            if (!createAudio) {
                return;
            }
            playTracks(createAudio);
            increaseBlock();
        }
        addEventListener("keydown", playAudio);
