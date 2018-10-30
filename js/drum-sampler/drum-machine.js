/*
Для выполнения этого задания, необходимо выполнить следующие шаги:
1. Необходимо создать Оюъект, где ключ будет номер клавиши, а значение будет создавать новое аудио.
2. Получаем все значения с классом "key". В дальнейшем будем использовать их для сравнения с нажатыми кнопками.
3. Инициируем основкую логику приложения. Будет ловить нажатие и отпуск клавиши.
4. После нажатия клавши, ловим значение и прогоняем его через переводчик, дабы все работало на обоих версиях расскладки клавиатуры
5. Получаем цифровое значение кнопки, проверяем ее на наличие в объекте sounds
6. Добавляем текущему элементу стили и запускаем звук (предварительно обнуляем все текущие дорожки)
7. При поднятии клавиши, удаляем стили
*/
(function(){
    const sounds = {
        "65": new Audio("./sounds/clap.wav"),
        "83": new Audio("./sounds/hihat.wav"),
        "68": new Audio("./sounds/kick.wav"),
        "70": new Audio("./sounds/openhat.wav"),
        "71": new Audio("./sounds/boom.wav"),
        "72": new Audio("./sounds/ride.wav"),
        "74": new Audio("./sounds/snare.wav"),
        "75": new Audio("./sounds/tom.wav"),
        "76": new Audio("./sounds/tink.wav")
    }
    

    const elKeys = document.getElementsByClassName("key");
    
    
    // Основная логика работы приложение
    const init = () => {
        const keyListenerDown = document.addEventListener('keydown', (event) => {
            stopAllMusic();
            const keyName = eventKeyToChar(event.key);
            if (Object.keys(sounds).indexOf(keyName) >= 0) {
                getCurrentButton(keyName);
                sounds[keyName].play();
            };
        });

        
        // отпуск клавиши
        const keyListenerUp = document.addEventListener('keyup', (event) => {
            const keyName = eventKeyToChar(event.key);
            if (Object.keys(sounds).indexOf(keyName) >= 0) {
                resetCurrentButton(keyName);
            };
        });
        
    };


    // Остонавливаем и обновляем все звуки
    const stopAllMusic = () => {
        for(let i = 0; i < elKeys.length; i++){
            let currentData = elKeys[i].getAttribute('data-key');
            // Фикс проблемы: Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause()
            if(currentData.play !== undefined){
                sounds[currentData].pause(); 
                sounds[currentData].load();
            }
            
        };
    };
    
    
    // функция, для обработки полученного значение и приведения его к строке
    const eventKeyToChar = (val) => {
        let keyName = val.toUpperCase();
        keyName = translator(keyName);
        keyName = keyName.charCodeAt().toString();
        return keyName;
    }
    
    
    // Добавляем стили для полученого значения
    const getCurrentButton = (key) => {
        for (let i = 0; i < elKeys.length; i++) {
            if (elKeys[i].getAttribute('data-key') === key) {
                elKeys[i].classList.add('playing');
                elKeys[i].classList.add('sound');
            };
        };
    };
    
    
    // Удаляем стили из текущего значения
    const resetCurrentButton = (key) => {
        for (let i = 0; i < elKeys.length; i++) {
            if (elKeys[i].getAttribute('data-key') === key) {
                elKeys[i].classList.remove('playing');
                elKeys[i].classList.remove('sound');
            };
        };
    };
    
    
    // перевод сиволов из кириллицы в английский
    const translator = (letter) => {
        letter = letter.toLowerCase();
        switch(letter){
            case "ф":
                return "A"
            case "ы":
                return "S"
            case "в":
                return "D"
            case "а":
                return "F"
            case "п":
                return "G"
            case "р":
                return "H"
            case "о":
                return "J"
            case "л":
                return "K"
            case "д":
                return "L"
            default:
                return letter.toUpperCase();
        };
    };
    
    
    // Инициализация основной функции
    init();
})();




