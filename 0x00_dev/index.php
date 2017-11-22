<?php

session_start();

require_once 'autoload.php';

use Counter\UsersOnlineCounter;
use Counter\UsersActiveManager;


$counter	= new UsersOnlineCounter();
$manager	= new UsersActiveManager($counter);
$manager->set('user', sprintf('%s',time()+60));

echo sprintf('Unique users online: %d',$counter->getActiveUsersCount());