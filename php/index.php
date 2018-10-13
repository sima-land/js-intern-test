<?php

include __DIR__ . '/components/Counter.php';

session_start();

$counter = new Counter([
    'userActiveDuration' => 15,
]);
$counter->addUserId(session_id());

echo "Active users: {$counter->getCount()}";