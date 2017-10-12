<?php
header("Cache-Control: no-cache, must-revalidate");
$online = 0;
$byte = 0; // максимальное количество байт для файла
$ip = 'user' . $_SERVER['REMOTE_ADDR'] . rand(0,1000);
$time_moment = $_SERVER['REQUEST_TIME'];
$cookie = $ip;
if (isset($_COOKIE['user'])){
    $cookie = $_COOKIE['user'];
}
setcookie('user', $cookie, $time_moment + 60);

$file = 'online';
$temp = 'temp';
$arr = array();

if ((filesize('online')) < $byte){
    $arr = file('online', FILE_IGNORE_NEW_LINES);
    $file = fopen($file, 'w+b');
    flock($file, LOCK_EX);
    for ($i = 0; $i < count($arr); $i++) {
	$user = explode(':',$arr[$i]);
	if (($user[1] < $time_moment) || ($cookie == $user[0])) {
	    array_splice($arr, $i, 1);
	    array_values($arr);
	}
    }
    $arr[] = $cookie . ':' . ($time_moment + 60);
    $online = count($arr);
    for ($i = 0; $i < $online; $i++) {
	fputs($file, $arr[$i] . "\r\n");
    }
}
else {
    fclose(fopen($file, 'a+b'));
    $file = fopen($file, 'r+b');
    flock($file, LOCK_EX);
    $tmpfile = tempnam(sys_get_temp_dir(), 'tm');
    $tmp = fopen($tmpfile, 'wb');
    while(!feof($file)) {
	$str = fgets($file);
	$user = trim($str);
	$user = explode(':', $user);
	if (($user[1] < $time_moment) || ($user[0] == $cookie)) {
	    continue;
	}
	else {
	    fputs($tmp, $str);
	    $online++;
	}
    }
    fputs($tmp, $cookie . ':' . ($time_moment + 60) . "\r\n");
    $online++;
    fclose($tmp);
    $test = copy($tmpfile, 'online');
    unlink($tmpfile);
}
fclose($file);
echo $online;