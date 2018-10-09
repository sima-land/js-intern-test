<?php

ini_set('display_errors', true);

use classes\Application;
include_once __DIR__ . '/classes/Application.php';

$app = new Application();
$app->run();
echo 'Количество активных пользователей на сайте: ' . $app->userCount();