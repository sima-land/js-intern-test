<?php
  	header("Content-Type: text/html; charset=utf-8");
	require_once (__DIR__) . '/counter.class.php';
	$counter = new CounterOnline();
	$online = $counter->getOnline();

	echo "Сейчас на сайте: <b>$online</b>";

?>