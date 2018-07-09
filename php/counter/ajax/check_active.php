<?
	$file = '../count.txt';
	
	//if user is going inactive I'm decrementing counter. $_POST['data'] is a value from hidden div showing if user is active
	if(time() - $_COOKIE['time_last_active'] > 60 and $_POST['data'] === '1' and $_COOKIE['unloaded'] !== 'yes') {
		$count_value = intval(file_get_contents($file));
		file_put_contents($file, $count_value - 1);
		$_POST['data'] = '0';
	}
	
	echo $_POST['data'];
	
?>