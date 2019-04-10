<?php

function getRealUserIp() {
    switch (true) {
        case (!empty($_SERVER['HTTP_X_REAL_IP'])) : return $_SERVER['HTTP_X_REAL_IP'];
        case (!empty($_SERVER['HTTP_CLIENT_IP'])) : return $_SERVER['HTTP_CLIENT_IP'];
        case (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) : return $_SERVER['HTTP_X_FORWARDED_FOR'];
        default : return $_SERVER['REMOTE_ADDR'];
    }
}

$userData = [
    'ip' => getRealUserIp(),
    'host' => isset($_SERVER['REMOTE_HOST']) ? $_SERVER['REMOTE_HOST'] : null,
    'agent' => $_SERVER['HTTP_USER_AGENT'],
];

$userDataJson = json_encode($userData);

$nameHash = sha1($userDataJson);

$path = __DIR__ . "/sessions";

if (!file_exists($path)) {
    mkdir($path, 0755, true);
}

session_save_path($path);
session_id($nameHash);
session_start();
$_SESSION[$nameHash]['time'] = time() + 60;
session_commit();

$fileList = scandir(session_save_path());

foreach ($fileList as $file) {
    if (is_file(session_save_path() . "/" . $file)) {
        $sessionId = array_pop(explode('_', $file));
        session_id($sessionId);
        session_start();
        if ($_SESSION[$sessionId]['time'] <= time()) {
            session_destroy();
        } else {
            session_commit();
        }
    }
}

function declension($countValue, $singular, $second, $plurar) {
    if ($countValue >= 11 and $countValue <= 19)
        return $plurar;
    $countValue = $countValue % 10;
    if ($countValue == 1)
        return $singular;
    if ($countValue >= 2 and $countValue <= 4)
        return $second;
    return $plurar;
}

function countSession() {
    $fileList = scandir(session_save_path());
    $sessionDirection = opendir(session_save_path());
    $userCount = 0;
    foreach ($fileList as $file) {
        if (is_file(session_save_path() . "/" . $file)) {
            $userCount++;
        }
    }
    closedir($sessionDirection);
    return "Сейчас на сайте: " . $userCount . " " . declension($userCount, "посетитель", "посетителя", "посетителей");
}
?>

<html>  
    <head>
        <title>Счетчик посетителей</title>
    </head>
    <body> 
        <?php echo countSession(); ?>
    </body>
</html>