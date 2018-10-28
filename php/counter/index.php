<?php
function counterActiveUsers($timeActive, $dir, $cookie = "1"){	
	if ($cookie) {
		if (!file_exists($dir)) mkdir($dir, 0777, true);
		if (!isset($_COOKIE['userId'])){
			$userId = uniqid();
			setcookie("userId",$userId,0x6FFFFFFF);		
		} else $userId = $_COOKIE['userId'];
		file_put_contents($dir."/".$userId, '');
	}	
	$activeUsers=0;
	foreach (array_diff(scandir($dir), array('..', '.', '.gitkeep')) as $userId) {
		if (time() - filemtime($dir."/".$userId) < $timeActive) {  
			$activeUsers++;		
		} else unlink($dir."/".$userId);
	}
	return 	$activeUsers;
}

if ($_COOKIE['test_cookie']) {
	$data = "Число активных пользователей на данной странице: ".counterActiveUsers(60,"activeUsers");
} else {
	$data = "Обновите страницу, либо включите COOKIE. Без вас на странице активных пользователей:".counterActiveUsers(60,"activeUsers",0);
	setcookie('test_cookie', '1');
}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<?php echo $data;?>
	</body>
</html>
