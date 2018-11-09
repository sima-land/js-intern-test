<?php
function GetCount()
{
	$DBDir		= '.\guests\\';
	$LifeTime	= 60;

	if (!isset($_COOKIE['guest']))
	{
		$GuestHash = sha1(time().rand(0,1000000));
		setcookie('guest', $GuestHash);
	}
	else
	{
		$GuestHash = $_COOKIE['guest'];
	}

	file_put_contents($DBDir.$GuestHash,'1');

	// Получаем список файлов в каталоге и чистим от мусора
	$DirCont = scandir($DBDir);
	unset($DirCont[array_search('.', $DirCont)]);
	unset($DirCont[array_search('..', $DirCont)]);

	// Проверяем если время изменения в файле были более минуты назад, то удаляем его из списка и стираем сам файл
	foreach($DirCont as $k => $f)
	{
		if (time() >= filemtime($DBDir.$f)+$LifeTime)
		{
			unlink($DBDir.$f);
			unset($DirCont[$k]);
		}
	}

	return count($DirCont);
}


echo '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">'."\n";
echo '<html>'."\n";
echo '<head>'."\n";
echo '	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'."\n";
echo '	<title>Counter</title>'."\n";
echo '</head>'."\n";
echo '<body>'."\n";
echo '<h3>Посетителей на сайте: '.GetCount().'</h3>'."\n";
echo '</body>'."\n";
echo '</html>'."\n";
?>
