<?php 
include_once ("counter.php");
include_once('./pagerank.php');
$url = 'Адрес вашего сайта.';
echo 'Googlr PR сайта '.$url.': '.getpagerank($url);
?>