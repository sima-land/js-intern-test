let divs = document.querySelectorAll('[data-key]')
let availableKeys = []
for (let i = 0; i < divs.length; ++i) {
    availableKeys.push(divs[i].getAttribute('data-key'))
}

document.addEventListener('keydown', e => {
    const pressedKey = e.keyCode+'';
    if(availableKeys.indexOf(pressedKey) > -1){
        let buttons = [...document.querySelectorAll(`[data-key="${e.keyCode}"]`)];
        buttons[0].style.cssText='background:#FF6978; margin-bottom: 70px; ';
        HTMLAudioElement.prototype.stop = function() {
            this.pause();
            this.currentTime = 0.0;
        };
        let audios = document.getElementsByTagName('audio')
        for(let i=0;i<audios.length;i++)
            audios[i].stop()
        buttons[1].play();
    }
});
document.addEventListener('keyup', e => {
    let pressedKey = e.keyCode+'';
    if(availableKeys.indexOf(pressedKey) > -1){
        let elem = [...document.querySelectorAll(`[data-key="${e.keyCode}"]`)];
        elem[0].style.cssText = '';
    }
});