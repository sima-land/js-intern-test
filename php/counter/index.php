<?php header("Content-Type: text/html; charset=utf-8");
ob_start();
//выделяем уникальный куки с привязкой к ip
$userName = $_SERVER['REMOTE_ADDR'];
setcookie('user', $userName, $currentTime + 60 );



 //текущее время
$currentTime = time();
 //через какое время удаляются куки в файле cookie.txt
$lastTime = time() - 60;
 //файл, в котором храним идентификаторы и время
$base = "cookie.txt";



$file = file($base);

$k = 0;
for ($i = 0; $i < count($file); $i++) {
	$line = explode("|", $file[$i]);
  // print_r($line);
  // print_r($lastTime);
	if ($line[1] > $lastTime) {
		$resFile[$k] = $file[$i];
		$k++;
	}
}

for ($i = 0; $i < count($resFile); $i++) {
	$line = explode("|", $resFile[$i]);
	if ($line[0] == $userName) {
		$line[1] = trim($currentTime)."\n";
		$is_sid_in_file = 1;
	}
	$line = implode("|", $line); 
	$resFile[$i] = $line;
}

$fp = fopen($base, "w");
for ($i = 0; $i < count($resFile); $i++) { fputs($fp, $resFile[$i]); }
	fclose($fp);

if (!$is_sid_in_file) {
	$fp = fopen($base, "a-");
	$line = $userName."|".$currentTime."\n";
	fputs($fp, $line);
	fclose($fp);
}

?>

<?php
echo "<h1> Сейчас на сайте: <b>".count(file($base))."</b> <h1>";
?>