<?php
header("Cache-Control: no-cache, must-revalidate");
$file = 'unique';
setcookie('user',rand(0,1000),time()+60);
if (!isset($_COOKIE['user'])) {
    fclose(fopen($file, 'a+b'));
    $unique = file($file);
    if ($unique[0] == "") $unique[0] = 0;
    $unique[0] += 1;
    $file = fopen($file, 'wb');
    flock($file, LOCK_EX);
    fputs($file, $unique[0]);
    fclose($file);
    echo $unique[0];
}
else {
    $file = fopen($file, 'rb');
    $unique = fgets($file);
    fclose($file);
    echo $unique;
}
