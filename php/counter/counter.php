<?php
$file_name = 'unique_user'; //имя файла
fclose(fopen($file_name, 'a+b')); //если нет файла создаем его
$file = file_get_contents($file_name); //берём все данные из файла
$unique_user_array = []; //заготовка под  готовый  масив
$live_time = 60; //время жизни
$time = time();
if (!(empty($file))) {
    $filtr_array = json_decode($file);
    $unique_user_array = array_filter($filtr_array, function ($k) {
        return ($k > $time - $live_time || $k == $time - $live_time);
    }, ARRAY_FILTER_USE_BOTH);
}
$unique_user = isset($unique_user_array) && !empty($unique_user_array) ? count($unique_user_array) : 0;
if (!isset($_COOKIE['visited'])) {//проверка существует ли кукис
    setcookie('visited', 1, $time + $live_time); //устанавливаем кукисы
    $unique_user++; //Увеличиваем количество уникальных на единицу
    $unique_user_array[] = $time; //добавляем наше последнее значение
    $unique_user_array = json_encode($unique_user_array); //кодируем всё в json
    file_put_contents($file_name, $unique_user_array); //вставляем всё в файл
}
echo "уникальных юзеров на сайте {$unique_user}"; //вывод колличества уникальных пользователей по кукам
