<?
// $d = how many seconds we use to calculate counter
function CounterByCookie($d = null){
// define cookie
		if(isset($_COOKIE['counter'])){
				$a = $_COOKIE['counter'];
		}else{
				$b = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
				$a = '';
				for($i = 0; $i <= 6; $i++){
						$a .= $b[mt_rand(0, (strlen($b) - 1))];
				}
				unset($b, $i);
				setcookie('counter', $a);
		}

// create memcache
		$b = new Memcache;
		$b->connect('localhost', 11211);

// how many seconds we use to calculate counter
		if(is_null($d)){$d = 10;}

// counter by default
		$e = 0;

// lock process
		while(true){
				$c = &$b->get('lC');
// locking
				if(gettype($c) == 'boolean'){
						$b->add('lC', '+', MEMCACHE_COMPRESSED, $d);
						break;
				}
// locking
				if($c == '-'){
						$b->replace('lC', '+', MEMCACHE_COMPRESSED, $d);
						break;
				}
		usleep(100);
		}
		unset($c);

// check record existing
		for($i = 0; $i <= $d; $i++){

// calculate key
				$f = (string)(time() - $i);

// calculate value
				$g = unserialize($b->get($f));

// we found it, record existed
				if(gettype($g) == 'array'){

// find cookie in record
						if(!in_array($a, $g)){$g[] = $a;}

// update with new time()
						$b->delete($f);
						$b->add((string)time(), serialize($g), MEMCACHE_COMPRESSED, $d);
						$e = count($g);

// unlocking
						$b->replace('lC', '-', MEMCACHE_COMPRESSED, $d);
						break;
				}
		}
// no any action ?
		if($e == 0){
				$b->add('lC', '+', MEMCACHE_COMPRESSED, $d);
				$b->add((string)time(), serialize(array(&$a)), MEMCACHE_COMPRESSED, $d);
				$b->replace('lC', '-', MEMCACHE_COMPRESSED, $d);
				$e = 1;
		}
		return $e;
}

echo CounterByCookie();
?>