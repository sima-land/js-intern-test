// Collection of audios and buttons from page 
class PlayList {
    constructor() {
        const audioNodes = document.querySelectorAll('audio');
        const btnNodes = document.querySelectorAll('div.keys>div');
        this.collection = Object.keys(audioNodes).reduce((acc, wave) => {
            const soundKey = audioNodes[wave].dataset.key;  // attr 'data-key' is index
            return {...acc, [soundKey]: {'audio': audioNodes[wave], 'btn': btnNodes[wave] }};
        }, {});

        this.playing = null;    // Current playing audio
    }

    play(soundKey) {
        // If audio code is not present in our collection - return
        if(!this.collection[soundKey]) return;

        // If playing audio - stop it
        if(this.playing) {  
            this.playing.audio.pause();
            this.playing.audio.currentTime = 0;
            this.playing.btn.classList.remove('playing');
        }
        this.playing = this.collection[soundKey];

        this.playing.audio.addEventListener('ended', (e) => {   // add listener to current audio ended
            this.playing.btn.classList.remove('playing');  
        },false);
        
        this.playing.audio.play()
                          .catch((err) => {});
        this.playing.btn.classList.add('playing');
    }
}


const playList = new PlayList();


// Sound button click //
const keys = document.querySelector('div.keys');

keys.addEventListener('click', (e) => {
    const clickedDiv = (node) => {   // Go up to '.key' node
        if (node.classList.contains('key')) { return node };
        return (node.parentNode.tagName !== 'HTML') ? clickedDiv(node.parentNode) : null;
        
    };
    const btn = clickedDiv(e.target);
    if (btn) {  // If audio button clicked
        playList.play(btn.dataset.key);
    };
});

// Document keypress //
const onKeyPress = (e) => {
    const code = e.keyCode;
    playList.play(code >= 97 && code <= 122 ? code - 32 : code );    // Send UpCase key code
    
};

document.addEventListener('keypress', onKeyPress);



 