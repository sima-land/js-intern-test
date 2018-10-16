<?php
$dir = 'user_data' . DIRECTORY_SEPARATOR;
$activeUsers = 0;
$activeTime = 60;
function generateUniqueId()
{
    return md5(time() . mt_rand(1, 1000000));
}

if (!isset($_COOKIE['identity'])) {
    setcookie('identity', generateUniqueId());
}
$userId = $_COOKIE['identity'];
$file = $dir . $userId;
file_put_contents($file, '');
foreach (array_diff(scandir($dir), array('..', '.', '.gitkeep')) as $userId) {
    if (time() - filemtime($dir . $userId) < $activeTime) {
        $activeUsers++;
    }
}
?>

<!DOCTYPE HTML>
<html>
<head>
</head>
<body>
<h1>Активных пользователей: <?= $activeUsers ?></h1>
</body>
</html>