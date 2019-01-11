let keys = document.querySelector('.keys');
let audio = document.querySelectorAll('audio');
let audioObj = new Audio();
document.addEventListener('keydown',(e) => {
    let keyNum = e.keyCode
    let button = keys.querySelector(`[data-key="${keyNum}"`)
    audio.forEach(x =>{
        if(x.dataset.key === button.dataset.key){
            console.log(button)
            button.classList.add('zoom')
            soundClick(x.src, audioObj)
            setTimeout(()=>{button.classList.remove('zoom')},100)
        }
    })
})

/**
 *
 * @param src - путь к файлу звука
 * @return void
 */
function soundClick(src, obj) {
    obj.src = src;
    obj.autoplay = true;
}