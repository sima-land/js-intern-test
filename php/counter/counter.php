<?php
// длительность сбора активных пользователей, в секуднах
$delay = 60;
// определяемся с куками
$cookie = $_COOKIE['counter'];
if(is_null($cookie)){
		$temp = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
		$cookie = '';
		for($i = 0; $i <= 6; $i++){
				$cookie .= $temp[mt_rand(0, (strlen($temp) - 1))];
		}
		unset($temp, $i);
		setcookie('counter', $cookie);
}
// создаем соединение с кешем
$cache = new Memcache;
$cache->connect('localhost', 11211);
// проверяем и делаем блокировку
while(true){
		$temp = &$cache->get('lC');
		if(gettype($temp) == 'boolean'){
				$cache->add('lC', '+', MEMCACHE_COMPRESSED, $delay);
				break;
		}
		if($temp == '-'){
				$cache->replace('lC', '+', MEMCACHE_COMPRESSED, $delay);
				break;
		}
usleep(100);
}
unset($temp);
// проверяем кеш, при проверке получаем две ветки развития событий
for($i = 0; $i <= $d; $i++){
		// вычисляем ключ
		$key = (string)(time() - $i);
		// вычисляем значение ключа
		$value = unserialize($cache->get($key));
		// значение валидно - первая ветка
		if(gettype($value) == 'array'){
		// ищем куку в значениее
		if(!in_array($cookie, $value)){
				$value[] = $cookie;
		}
		// обновляем имя ключа
		$cache->delete($key);
		$cache->add((string)time(), serialize($value), MEMCACHE_COMPRESSED, $delay);
		$counter = count($value);
		// снимаем блокировку
		$b->replace('lC', '-', MEMCACHE_COMPRESSED, $d);
		break;
		}
}
// вторая ветка - ни одного активного пользователя не нашлось
if(!isset($counter)){
		$cache->add('lC', '+', MEMCACHE_COMPRESSED, $delay);
		$cache->add((string)time(), serialize(array(&$cookie)), MEMCACHE_COMPRESSED, $delay);
		$cache->replace('lC', '-', MEMCACHE_COMPRESSED, $delay);
		$counter = 1;
}

echo $counter;
?>