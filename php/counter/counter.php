<?php
@chdir("sessions") || mkdir("sessions") && chdir("sessions"); // Создаем директорию сессий и переходим в неё
foreach (scandir('.') as $file) {!strstr($file,'.') && (filemtime($file) < ($actual_time ?? $actual_time = time() - 60) && unlink($file) || $count++);} // Проверяем каждый файл в директории, удаляем если старый, параллельно считаем
touch($_COOKIE['session'] ?? (setcookie("session", $new_cookie = uniqid(), $expire_time = time() + 120) ? $new_cookie : false)); // Создаем/обновляем файл с названием куки (если нет, то создаем её)
echo $new_cookie ? ++$count : $count ?? 0; // Выводим результат