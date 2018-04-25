      var currentAudio = new Audio;
        function soundClickClap() {
            var audio = new Audio();
            audio.src = 'sounds/clap.wav';
            audio.autoplay = true;
            currentAudio = audio;
            return currentAudio;
        }
        function soundClickHihat() {
            var audio = new Audio();
            audio.src = 'sounds/hihat.wav';
            audio.autoplay = true;
            currentAudio = audio;
            return currentAudio;
        }
        function soundClickKick() {
            var audio = new Audio();
            audio.src = 'sounds/kick.wav';
            audio.autoplay = true;
            currentAudio = audio;
            return currentAudio;
        }
        function soundClickOpenHat() {
            var audio = new Audio();
            audio.src = 'sounds/openhat.wav';
            audio.autoplay = true;
            currentAudio = audio;
            return currentAudio;
        }
        function soundClickBoom() {
            var audio = new Audio();
            audio.src = 'sounds/boom.wav';
            audio.autoplay = true;
            currentAudio = audio;
            return currentAudio;
        }
        function soundClickRide() {
            var audio = new Audio();
            audio.src = 'sounds/ride.wav';
            audio.autoplay = true;
            currentAudio = audio;
            return currentAudio;
        }
        function soundClickSnare() {
            var audio = new Audio();
            audio.src = 'sounds/snare.wav';
            audio.autoplay = true;
            currentAudio = audio;
            return currentAudio;
        }
        function soundClickTom() {
            var audio = new Audio();
            audio.src = 'sounds/tom.wav';
            audio.autoplay = true;
            currentAudio = audio;
            return currentAudio;
        }
        function soundClickTink() {
            var audio = new Audio();
            audio.src = 'sounds/tink.wav';
            audio.autoplay = true;
            currentAudio = audio;
            return currentAudio;
        }
        
        function playSound(e){
     
            var root = document.getElementById("root");

            switch(e.keyCode){

                case 65:// если нажата клавиша a
                        currentAudio.pause();
                        soundClickClap();
                        var big = anime({
                            targets: '.key:nth-child(1)',
                            scale: 1.2,
                            duration: 50,
                            direction: 'alternate'
                        });
                    break;
                case 83:  // если нажата клавиша s
                        currentAudio.pause();
                        soundClickHihat();
                        var big = anime({
                            targets: '.key:nth-child(2)',
                            scale: 1.2,
                            duration: 50,
                            direction: 'alternate'
                        });
                    break;
                case 68:
                        currentAudio.pause();
                        soundClickKick();
                        var big = anime({
                            targets: '.key:nth-child(3)',
                            scale: 1.2,
                            duration: 50,
                            direction: 'alternate'
                        });// если нажата клавиша d
                    break;
                case 70:   
                        currentAudio.pause();// если нажата клавиша f
                        soundClickOpenHat();
                        var big = anime({
                            targets: '.key:nth-child(4)',
                            scale: 1.2,
                            duration: 50,
                            direction: 'alternate'
                        });
                    break;
                case 71:   // если нажата клавиша g
                        currentAudio.pause();
                        soundClickBoom();
                        var big = anime({
                            targets: '.key:nth-child(5)',
                            scale: 1.2,
                            duration: 50,
                            direction: 'alternate'
                        });
                    break;
                case 72:   // если нажата клавиша h
                        currentAudio.pause();
                        soundClickRide();
                        var big = anime({
                            targets: '.key:nth-child(6)',
                            scale: 1.2,
                            duration: 50,
                            direction: 'alternate'
                        });
                    break;
                case 74:   // если нажата клавиша j
                        currentAudio.pause();
                        soundClickSnare();
                        var big = anime({
                            targets: '.key:nth-child(7)',
                            scale: 1.2,
                            duration: 50,
                            direction: 'alternate'
                        });
                    break;
                case 75:   // если нажата клавиша k
                        currentAudio.pause();
                        soundClickTom();
                        var big = anime({
                            targets: '.key:nth-child(8)',
                            scale: 1.2,
                            duration: 50,
                            direction: 'alternate'
                        });
                    break;
                case 76:   // если нажата клавиша l
                        currentAudio.pause();
                        soundClickTink();
                        var big = anime({
                            targets: '.key:nth-child(9)',
                            scale: 1.2,
                            duration: 50,
                            direction: 'alternate'
                        });
                    break;
            }
        }
 
addEventListener("keydown", playSound);