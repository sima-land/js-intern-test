<?
	$file = '../count.txt';
	
	//decrementing counter only if user active
	if(time() - $_COOKIE['time_last_active'] < 60 and $_POST['data'] === '1') {
		$count_value = intval(file_get_contents($file));
		file_put_contents($file, $count_value - 1);
		$_POST['data'] = '0';
		setcookie('unloaded', 'yes', time()+60, '/')
	}
	
	echo '.';
	
?>