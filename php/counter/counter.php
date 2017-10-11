<?php
$file_name = 'unique_user';
fclose(fopen($file_name, 'a+b')); //попытка создать файл и его мгновенное закрытие , чтобы не вылетел ексепшон.
$file = file($file_name);
$unique_user = empty($file) ? 0 : $file[0]; //если фай лпустой  то  уникальных юзеров 0 ; если нет то  берем значение из файла
if (!isset($_COOKIE['visited'])) {//проверка существует ли кукис
    $time = time();
    $live_time = 60; //время жизни кукисов
    setcookie('visited', 1, time() + $live_time); //устанавливаем кукисы
    $unique_user++; //Увеличиваем количество уникальных на единицу
    $file_write = fopen($file_name, 'r+b');
    flock($file_write, LOCK_EX);
    fwrite($file_write,  (int)$unique_user);
    fclose($file_write);
}
echo "уникальных юзеров на сайте {$unique_user}"; //вывод колличества уникальных пользователей по кукам
