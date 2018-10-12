<?php

    ini_set('error_reporting', E_ALL);
    ini_set('display_errors', 1);

    date_default_timezone_set('Asia/Yekaterinburg');

    require_once 'User.php';

    $class = new User();

    echo 'Hi ', $class->getName() . ' users ' . $class->cnt;