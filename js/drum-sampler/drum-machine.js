//Создадим массив со всеми кнопками
const keys = document.querySelectorAll(`.key`);
//Переменная для хранения нажатой кнопки
let element;
//Переменная для хранения воспроизводимого аудио
let audioPlay;
//Переменная для хранения значения атрибута data-key
let dataKey;


//Функция для удаления класса playing
let onRemoveClass = () => {
    element.classList.remove(`playing`);
}

//Функция для добавления класса playing
let onAddClass = () => {
    element.classList.add(`playing`);
}

//Запустим цикл по массиву со всеми кнопками(div)
for (let key of keys) {

    //Добавим каждой кнопке обработчик по событию click
    key.addEventListener(`click`, function (evt) {
        //Проверяем нажал ли пользователь ту же самую кнопку или нет.
        if (element !== this) {
            //Проверяем нажал ли пользователь уже хотя бы одну кнопку (Если не нажимал тогда element имеет значение undefined и соотвественно у него мы не можем удалить класс).
            if (element !== undefined) {
                //Удаляем класс с предыдущей кнопки
                onRemoveClass();
                //Останавливаем предыдущий трек и переходим в его начало (если нужна именно пауза в воспроизведение, тогда необходимо заменить метод load() на pause() )
                audioPlay.load();
                //Удаляем обработчик событий с предыдущей audio
                audioPlay.removeEventListener(`ended`, onRemoveClass);
            }
            //Записываем в element кнопку по которой нажал пользователь
            element = this;
            //Добавляем кнопке класс playing
            onAddClass();
            //получаем значение атрибута data-key у кнопки
            dataKey = this.getAttribute(`data-key`);
            //Находим audio с таким же значением атрибута data-key
            audioPlay = document.querySelector('audio[data-key="' + dataKey + '"]');
            //Запускаем воспроизведение трека
            audioPlay.play();
            //Вешаем обработчик события окончания трека чтобы удалить класс playing
            audioPlay.addEventListener(`ended`, onRemoveClass);

        } else {
            //Добавим кнопке класс playing
            onAddClass();
            //Останавливаем предыдущий трек и переходим в его начало (если нужна именно пауза в воспроизведение , тогда необходимо заменить метод load() на pause() )
            audioPlay.load();
            //Запускаем воспроизведение трека
            audioPlay.play();
            //Вешаем обработчик события окончания трека чтобы удалить класс playing
            audioPlay.addEventListener(`ended`, onRemoveClass);
        }
    });
}

