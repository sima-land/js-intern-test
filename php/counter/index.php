<?php
class UniqueUsers {

	public $users = 0;
	
	public $cookies = [];
	
	public function __construct(){
		if (file_exists('cookie.txt')){
			$handle = fopen('cookie.txt', 'r');
			while($cookie = fgets($handle)){
				$cookies = explode('=>', $cookie);
				$this->cookies[$cookies[0]] = $cookies[1];
			}
			fclose($handle);
			foreach($this->cookies as $key => $value){
				if($value > time() - 60){
					$this->users += 1;
				}
			}
			$handle = fopen('cookie.txt', 'w');
			foreach($this->cookies as $key => $value){
				fwrite($handle, $key . '=>' . $value);
			}
			fclose($handle);
		}
	}
	
	public function writeCookie($cookie){
		if($handle = fopen('cookie.txt', 'a')){
			fwrite($handle, $cookie);
			return true;
		}
		return false;
	}
	public function setCookie($userIp){
		$userIp = str_replace('.', '_', $userIp);
		$this->users += 1;
		$this->writeCookie($userIp . "=>" . time() . "\r\n");
		return true;
	}
	
	public function isCookie($userIp){
		$userIp = str_replace('.', '_', $userIp);
		if(isset($this->cookies)){
			foreach($this->cookies as $key => $value){
				if ($key == $userIp && $value > time() - 60){
					return true;
				}
			}
		}
		return false;
	}
	
	public function checkNewUser($userIp){
		return !$this->isCookie($userIp);
	}
	
}

$uniqueUsers = new UniqueUsers();

if($uniqueUsers->checkNewUser($_SERVER['REMOTE_ADDR'])){
	$uniqueUsers->setCookie($_SERVER['REMOTE_ADDR']);
}

?>

<HTML>
<head>
	<meta charset='utf-8'>
</head>
<body>
	<div style='text-align:center'>
		<h1 style='color:red'>ДОБРО ПОЖАЛОВАТЬ</h1>
		<br>
		<h3>Колличество пользователей сейчас на сайте: <?=$uniqueUsers->users?></h3>
	</div>
</body>
</html>