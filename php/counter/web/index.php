<?php
    /**
    * Created by PhpStorm.
    * User: IlyaKislitsin
    * Date: 07.10.2018
    * Time: 19:38
    */

    // Доброго времени суток. Моя версия счётчики посетителей сайта онлайн.
    // Про ООП в зададнии ничего сказано не было, поэтому для наглядности сделал всё в одном файлике.

    session_start();

    $filename =  '../data/counter_data.dat';
    $timeInterval = 60;
    $visitors = [];
    $myID = $_SERVER['REMOTE_ADDR'] . '::' . $_COOKIE['PHPSESSID'];


    // Проверка на существование и размер файла.
    if(is_readable($filename) && filesize($filename))
    {
        // Если файл существует и он не пустой, преобразуем данные в строку и преобразуем в массив сериализованые данные.
        $visitors = unserialize(file_get_contents($filename));

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

    } else {
        // А если файла нет или он пустой, то добавляяем сведения о текущем пользователе в массив посетителей сайта.
        $visitors[] =  ['id' => $myID, 'time' => time()];

    }

    // Сериализуем данные из полученного, после проверок, массива $visitors и записываем их в файл.
    file_put_contents($filename, serialize($visitors));


    // Колличество активных, уникальных посетителей сайта
    $count = count($visitors);
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
