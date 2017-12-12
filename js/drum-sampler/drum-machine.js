window.onload = () => {
    var stop = 65

    document.onkeydown = (e) =>{
        var audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
        var audioStop = document.querySelector(`audio[data-key="${stop}"]`)

        var block = document.querySelector(`div[data-key = "${e.keyCode}"]`)
        
        if(audio){
            audioStop.pause()
            audioStop.currentTime = 0

            audio.play()
            block.id = "playing"
            setTimeout(function() {
                block.id = ''
            }, 100);

            stop = e.keyCode
        }      
    }
}