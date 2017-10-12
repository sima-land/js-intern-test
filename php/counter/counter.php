<?php
/* устанавливаем хеадер */
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$file_name = 'unique_user'; //имя файла
fclose(fopen($file_name, 'a+b')); //если нет файла создаем его
$file = file_get_contents($file_name); //берём все данные из файла
$unique_user_array = []; //заготовка под  готовый  масив
$live_time = 60; //время жизни
$time = time();
if (!empty($file)) {
    $filtr_array = json_decode($file);
    //* конструкция с array filter выглядит не совсем понятно, но
    $unique_user_array = array_filter($filtr_array, function ($k) {
        global $time, $live_time; //чтобы не повторять один и тот же код дважды.
        $time_limit = $time - $live_time;
        return ($k >= $time_limit);
    }, ARRAY_FILTER_USE_BOTH);
}
$unique_user_count = !empty($unique_user_array) ? count($unique_user_array) : 0;
if (!isset($_COOKIE['visited'])) {//проверка существует ли кукис
    setcookie('visited', 1, $time + $live_time); //устанавливаем кукисы
    $unique_user_count++; //Увеличиваем количество уникальных на единицу
    $unique_user_array[] = $time; //добавляем наше последнее значение
    $unique_user_string = json_encode($unique_user_array); //кодируем всё в json
    file_put_contents($file_name, $unique_user_string); //вставляем всё в файл
}
echo "уникальных юзеров на сайте {$unique_user_count}"; //вывод колличества уникальных пользователей по кукам
