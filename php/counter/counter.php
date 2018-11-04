function GetCount()
{
	$DBName		 = 'guests.db';
	$LifeTime	 = 60;
	$dat			 = '';
	$UpdateFlag	 = FALSE;

	if (!file_exists($DBName))
	{
		echo '!!!!!!!!!!!!!!!!!!';
		file_put_contents($DBName, '');
	}
	if(!isset($_COOKIE['guest']))
	{
		$GuestHash = sha1(date('Y-m-d H:i:s') . rand(0, 1000000));
		setcookie('guest', $GuestHash);
		file_put_contents($DBName, $GuestHash . ' - ' . date('U') . "\n", FILE_APPEND);
	}
	else
	{
		$GuestHash = $_COOKIE['guest'];
	}

	$GuestsData	 = file_get_contents($DBName);
	$GuestsArr	 = explode("\n", $GuestsData);
	foreach($GuestsArr as $k => $v)
	{
		$GuestsArr[$k] = explode(" - ", $v);
	}
	unset($GuestsArr[count($GuestsArr) - 1]);

	foreach($GuestsArr as $key => $val)
	{
		if($GuestHash == $val[0])
		{
			$val[1]		 = date('U');
			$dat			 .= $val[0] . ' - ' . date('U') . "\n";
			$UpdateFlag	 = TRUE;
		}
		else
		{
			if(date('U') <= $val[1] + $LifeTime)
			{
				$dat .= $val[0] . ' - ' . $val[1] . "\n";
			}
			else
			{
				unset($GuestsArr[$key]);
			}
		}
	}

	if($UpdateFlag === FALSE)
	{
		$dat									 .= $GuestHash . ' - ' . date('U') . "\n";
		$GuestsArr[count($GuestsArr)]	 = array($GuestHash, date('U'));
	}
	file_put_contents($DBName, $dat);
	return count($GuestsArr);
}
echo '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">' . "\n";
echo '<html>' . "\n";
echo '<head>' . "\n";
echo '	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' . "\n";
echo '	<title>Counter</title>' . "\n";
echo '</head>' . "\n";
echo '<body>' . "\n";
echo '<h3>Посетителей на сайте: ' . GetCount() . '</h3>' . "\n";
echo '</body>' . "\n";
echo '</html>' . "\n";
