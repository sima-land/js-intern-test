        var currentAudio = new Audio;

        function sound(link){
            currentAudio.pause();
            var audio = new Audio();
            audio.src = 'sounds/'+ link +'.wav';
            audio.autoplay = true;
            currentAudio = audio;
            return currentAudio;
        }
        
        function playSound(e){
     
            var root = document.getElementById("root");
            
            function animation(numb){
                var big = anime({
                    targets: '.key:nth-child('+ numb +')',
                    scale: 1.2,
                    duration: 50,
                    direction: 'alternate'
                });
            }
            
            switch(e.keyCode){

                case 65:// если нажата клавиша a
                        sound('clap');
                        animation(1);
                    break;
                case 83:  // если нажата клавиша s
                        sound('hihat');
                        animation(2);
                    break;
                case 68:
                        sound('kick');
                        animation(3);// если нажата клавиша d
                    break;
                case 70:   // если нажата клавиша f
                        sound('openhat');
                        animation(4);
                    break;
                case 71:   // если нажата клавиша g
                        sound('boom');
                        animation(5);
                    break;
                case 72:   // если нажата клавиша h
                        sound('ride');
                        animation(6);
                    break;
                case 74:   // если нажата клавиша j
                        sound('snare');
                        animation(7);
                    break;
                case 75:   // если нажата клавиша k
                        sound('tom');
                        animation(8);
                    break;
                case 76:   // если нажата клавиша l
                        sound('tink');
                        animation(9);
                    break;
            }
        }
 
addEventListener("keydown", playSound);
