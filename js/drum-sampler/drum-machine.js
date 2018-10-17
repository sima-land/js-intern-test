let audioElements = document.getElementsByClassName('key')
let audioSounds = document.getElementsByTagName('audio')
let audioArray = [] // Создаем массив аудио элементов, чтобы в дальнейшем применить к нему метод forEach
for(var j = 0; j < audioSounds.length; j++){
    audioArray.push(audioSounds[j])
} // Пушим в него аудио-элементы
for(var i = 0; i < audioElements.length; i++){
    audioElements[i].id = `${audioElements[i].dataset.key}`
} // Присваиваем id для элементов разметки
for(var i = 0; i < audioSounds.length; i++){
    audioSounds[i].id = `a${audioSounds[i].dataset.key}`
}// Присваиваем id для аудио 
function playSound(e){
            let currentElement = document.getElementById(`${e.keyCode}`)//Находим элемент разметки, соответствующий нажатой клавише 
            currentElement.style.transform = 'scale(1.3)'  // Меняем стили
            currentElement.style.transitionDuration = '0.2s'
            setTimeout(function(){currentElement.style.transform = 'scale(1)'},200)
            let currentAudio = document.getElementById(`a${e.keyCode}`)// Находим аудио, соответствующее нажатой клавише
            stopAndPlay(function(){currentAudio.play()})    
}
function stopAndPlay(callback){  // В данной функции отменяем вопроизведение всех аудио элементов и в колл бэке вызываем проигрывание текущего элемента
    audioArray.forEach(function(item){
        item.pause()
        item.currentTime = 0.0
    })
    callback()
}
addEventListener('keydown', playSound) // Вызов функции проигрывания

