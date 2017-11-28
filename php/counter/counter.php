<?php
        
        $data_file = 'counter.dat'; // База хэшей
        $online_count = 0; // Количество пользователей онлайн
        $hash_life_time = time()+300; // Жизнь куки
        if(!isset($_COOKIE['key']))
        {
                $is_new_user = true;
                $user_hash = md5(random_int(1000,9999).random_int(1000,9999)); // Генерация хэша
                setcookie("key", $user_hash, $hash_life_time); // Ставим куки на клиенте
        }
        else
        {
                $is_new_user = false;
                $user_hash = $_COOKIE['key'];
                setcookie("key", $user_hash, $hash_life_time); // Обновляем куки на клиенте
        }
        // Читаем json из файла
        $file = fopen($data_file, "r");
        $json_data = fgets($file);
        fclose($file);
        //Из json в массив...
        $array_data = json_decode($json_data,true);
        if($is_new_user)
        {
                $array_data[$user_hash] = $hash_life_time; // Дописываем пользователя в файл если его там нет
        }
        
        $thistime = time(); // текущее время
        foreach($array_data as $dat)
        {
                if($dat > $thistime)
                {
                        $online_count++;
                }
        }      
        // Из массива в json
        $json_data = json_encode($array_data);
        file_put_contents($data_file,$json_data); // Обновление data файла
        echo "Онлайн пользователей: <b>[".$online_count."]</b>";
?> 
