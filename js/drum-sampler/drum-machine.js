window.onload = () => {
    let audios = Array.from(document.getElementsByTagName('audio'))
    let block = Array.from(document.getElementsByClassName('key'))
    var stop = 0

    document.onkeydown = (e) =>{
        let dataKey = e.keyCode
        audios.forEach(function(e, i) {
            if (dataKey == e.dataset.key){
                audios[stop].pause()
                audios[stop].currentTime = 0
                audios[i].play()
                block[i].id = 'active'
                setTimeout(function(){
                    block[i].id = ''
                }, 100)
                stop = i
            }
        })        
    }
}