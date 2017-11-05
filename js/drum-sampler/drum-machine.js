var keys = [];
var audioKeys = [];
var audioSrc = [];

$(key).each(function() {
    keys.push($(this).data('key'));
});
$(audioKey).each(function() {
    audioKeys.push($(this).data('key'));
});
$(audioKey).each(function() {
    audioSrc.push($(this).data('src'));
});

document.onkeydown = function(e) {
    for (var i = 0; i < keys.length; i++) {
        if (e.keyCode == keys[i] && audioKeys[i]) {
            new Audio(audioSrc[i]).play();
            break;
        }
    }
}