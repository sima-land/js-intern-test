<?
	//main file for storing current amount of active users. getting value from it
	$file = 'count.txt';
	$count_value = intval(file_get_contents($file));
	
	//if user opens page after he gone inactive or after refreshing page - add him to counter again
	if(!$_COOKIE['time_last_active'] or time() - $_COOKIE['time_last_active'] > 60 or $_COOKIE['unloaded'] === 'yes') { 
		file_put_contents($file, $count_value + 1);
	}
	
	//refresh time user became active
	setcookie('time_last_active', time());
	
?>

<html>
	<head>
		
		<title>Users counter</title>
		
		<!--adding some jquery-->
		<script src="scripts/jquery.js"></script>
		<script src="scripts/main.js"></script>
		
	</head>
	
	<body>
		<!--this value can be stored in cookies aswell but I did it this way before I found solution for ajax cookies so no reason to change it-->
		<div hidden id="active-cookie">1</div>
		
		Active users count: <span id="count-value"><?=$count_value?></span>
	</body>
</html>