let btn = document.querySelectorAll(".key");
let audio = document.querySelectorAll('audio');

addEventListener('keydown', function(event) {

    for (let i = 0; i < btn.length; i++){
        if (event.keyCode == btn[i].dataset.key) {
            audio[i].play();
            btn[i].classList.add("playing");
        } else {
            audio[i].pause();
        }
    };
});

addEventListener('keyup', function(event) {
    for (let i = 0; i < btn.length; i++){
        btn[i].classList.remove("playing");
    };
});