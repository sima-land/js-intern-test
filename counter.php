<?php
$filename = "counter.log";

$counter = file($filename);
for ($i=0; $i<sizeof($counter); $i++) 
{
	$counter[$i] = trim(str_replace ("n","", $counter[$i]));
}
$curdate = mktime ([, int $minute = date("m")]);	/*Проверяем уникальность пользователя*/
$nextdate = mktime ([, int $minute = date("m")+1]);

if (!isset($_COOKIE["visit"]))	/*Проверяем на наличие нашей куки, если она есть, то увеличивем счетчик уникальных пользователей*/
{
	$counter[0]++;
	setcookie ("visit", $curdate, $nextdate);	/*устанавливаем нашу куки, если ее нет*/	
}
$counter[0] = $counter[0]."n";	/*Приводим массив к нужному виду, добавляя перевод строки  к каждому элементу, и записываем в файл*/

$counter = implode("", $counter);
$fp = fopen($filename, "w");
if ($fp) fwrite($fp, $counter);
fclose($fp);
?>