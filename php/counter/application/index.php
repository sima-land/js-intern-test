<?php

/**
 * @var string Директория выполнения приложения.
 */
const RUNTIME_DIR = './runtime/';

// Записываем время окончания активности уникального пользователя.
session_start();
$time = time();
file_put_contents(RUNTIME_DIR . session_id(), strtotime('+1 minute', $time));
// Подсчитываем активных пользователей.
$usersActive = 0;
foreach (scandir(RUNTIME_DIR, SCANDIR_SORT_NONE) as $fileName) {
    $filePath = RUNTIME_DIR . $fileName;
    if (
        '.gitkeep' !== $fileName
        && is_file($filePath)
        && file_get_contents($filePath) > $time
    ) {
        $usersActive++;
    }
}
?>
<!doctype html>
<html>
<head>
    <meta charset="UTF-8"/>
</head>
<body>
    <p>Активных пользователей на этой странице: <?= $usersActive ?></p>
</body>
</html>
