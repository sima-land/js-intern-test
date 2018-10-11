<?php
/**
 * php скрипт, который выдаёт количество уникальных активных посетителей на сайте в данный момент.
 * - уникальность посетителя определяем cookie файлом
 * - посетитель считается активным, если он открывал скрипт менее минуты назад
 *
 * Ограничения:
 * - не использовать сторонних инструментов, таких как БД, в том числе key-value хранилища
 */

spl_autoload_register(function ($class) {
    $classes = [
        'Config' => 'php/counter/smilik_a/config/Config.php',
        'CounterFile' => 'php/counter/smilik_a/services/CounterFile.php',
        'iCounter' => 'php/counter/smilik_a/services/iCounter.php',
    ];

    require $_SERVER['DOCUMENT_ROOT'] . '/' . $classes[$class];
});

session_start();

/** @var $count int количество уникальных активных посетителей */
$count = (new CounterFile(Config::getCounterConfig()))->getCount();

?>


<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Счетчик</title>
</head>
<body>
    <h1 style="text-align: center;color: green;">Кол-во активных посетителей: <?=$count?></h1>
</body>
</html>