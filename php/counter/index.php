<?php

$fileName = 'users.csv';
$users = [];

if (file_exists($fileName) && is_file($fileName)) {
  $users = json_decode(file_get_contents($fileName), true);
}

$userId = $_COOKIE['userId'];
if (empty($userId)) {
  $userId = uniqid();
  setcookie('userId', $userId);
}

$users[$userId] = time();

$totalCount = 0;
foreach($users as $id => $last_check) {
  if (time() - $last_check < 60) {
    $totalCount++;
  }

  echo 'id ' . $id . ' last check ' . date('d-m-Y H:i', $last_check) . '<br>';
}

if (file_put_contents($fileName, json_encode($users), LOCK_EX)) 
  echo 'total count ' . $totalCount;
} else {
  echo ''file write error';
}
