<?php
// Время по какое пользователь считает активным (Время начала скрипта + 60 секунд)
$active_time = $_SERVER['REQUEST_TIME'] + 60;

// Проверить уникальность посетителя
if (isset($_COOKIE["ip"])) {
   echo "Вы были уже на нашем сайте<br>"; 
} else {
	// Определить ip клиента для уникальности посетителя
	// IP, с которого зашли на страницу
	$ip = $_SERVER['REMOTE_ADDR'];
	setcookie("ip", $ip, time()+60*60*24*30);
	echo "Вы у нас на сайте впервые<br>";
}

// Проверить является ли посетитель активным
if (!isset($_COOKIE["active_visitor"])) {
	// Добавить одного посетителя
	$count_visitor = 1;
	if (isset($_COOKIE["count_visitor"])) {
    $count_visitor = $_COOKIE["count_visitor"] + 1;
	}
	setcookie("count_visitor", $count_visitor, time()+60*60*24*30);
}

// Проверить что текущий посетитель учтен. Установлено на минунту
setcookie("active_visitor", 1, time() + 60);

// Вывести количество посетителей
$count_visitor = $_COOKIE["count_visitor"];
echo "Количество посетителей: " . $count_visitor . "<br>";

// Ждать 60 секунд
while(true) {
	if (time() >= ($active_time)) {
		break;
	}
}

// Удалить посетителя из активных пользователей -1
$count_visitor = $_COOKIE["count_visitor"] - 1;
setcookie("count_visitor", $count_visitor, time()+60*60*24*30);

// Удалить cookie что пользователь не является активным
setcookie('active_visitor', 0, time() - 60);

?>