var key_a = 65;
var key_s = 83;
var key_d = 68;
var key_f = 70;
var key_g = 71;
var key_h = 72;
var key_j = 74;
var key_k = 75;
var key_l = 76;

function playSound(url) {
    var s = new Audio();
    s.src = url;
    s.play();
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case key_a:
            playSound("sounds/clap.wav")
            break;
        case key_s:
            playSound("sounds/hihat.wav")
            break;
        case key_d:
            playSound("sounds/kick.wav")
            break;
        case key_f:
            playSound("sounds/openhat.wav")
            break;
        case key_g:
            playSound("sounds/boom.wav")
            break;
        case key_h:
            playSound("sounds/ride.wav")
            break;
        case key_j:
            playSound("sounds/snare.wav")
            break;
        case key_k:
            playSound("sounds/tom.wav")
            break;
        case key_l:
            playSound("sounds/tink.wav")
            break;
    }
}