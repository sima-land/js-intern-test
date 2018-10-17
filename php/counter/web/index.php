<?php
    /**
    * Created by PhpStorm.
    * User: IlyaKislitsin
    * Date: 07.10.2018
    * Time: 19:38
    */

    // Доброго времени суток. Моя версия счётчики посетителей сайта онлайн.

    session_start();

    $filename =  '../data/counter_data.dat';
    $timeInterval = 60;
    $visitors = [];
    $myID = $_SERVER['REMOTE_ADDR'] . '::' . $_COOKIE['PHPSESSID'];

//    $t = microtime();

    // Проверка на существование и размер файла.
    if(is_readable($filename) && filesize($filename))
    {
        //Если файл существует и он не пустой, начинаем с ним работу в режиме записи в конец файла
        $file = fopen($filename, "r+t");

        //Блокируем файл на чтение и запись
        flock($file, LOCK_EX);

        // Читаем файл и преобразуем в массив сериализованые данные.
        $visitors = unserialize(fread($file, filesize($filename)));


        // Выбираем только записи с ключом 'id', и проверяем нет ли id текущего пользователя в массиве
        if (!in_array($myID, array_column($visitors, 'id')))
        {
            // Если нет, добавляяем сведения о текущем пользователе в массив посетителей сайта.
            $visitors[] =  ['id' => $myID, 'time' => time()];
        }

        // Проходимся по массиву посетителей.
        foreach ($visitors as $key => $value)
        {
            // Смотрим на время добавления записи в массив
            if ((time() - $visitors[$key]['time']) > $timeInterval)
            {
                // И если она добавлена позже чем 60 сек. назад, то удаляем её из массива
                unset($visitors[$key]);
            }
        }
        // Очищаем файл.
        ftruncate($file, 0);

        // Переходим в его начало.
        fseek($file, SEEK_SET);

        // Сериализуем данные из полученного, после проверок, массива $visitors и записываем их в файл.
        fwrite($file, serialize($visitors));

        // Очищаем вывод.
        fflush($file);

        //Снимаем блокировку.
        flock($file, LOCK_UN);

        //Завершаем работу с файлом.
        fclose($file);

    } else {
        // А если файла нет или он пустой, то добавляяем сведения о текущем пользователе в массив посетителей сайта.
        $visitors[] =  ['id' => $myID, 'time' => time()];
        // Сериализуем данные и записываем их в файл.
        file_put_contents($filename, serialize($visitors));

    }

    // Колличество активных, уникальных посетителей сайта
    $count = count($visitors);

//    $t1 = microtime() - $t;


?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Counter</title>
</head>
<body>


    <h1>Сейчас на сайте: <?php echo $count;?></h1>


</body>
</html>
