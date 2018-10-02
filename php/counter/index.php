<?php
require_once './application.php';
require_once './components/visitor_manager.php';
require_once './components/cookie_manager.php';
require_once './storages.php';

//set mode
const MODE = 'debug';

function dump($data) {
  if (defined('MODE') && MODE === 'debug') {
    echo '<pre>';
    print_r($data);
    echo '</pre>';
  }
}


// APPLICATION START
try {
  $application = Application::getInstance();
  $application->CookieManager = new CookieManager($_COOKIE);
  $fileStorage = new FileStorage();
  $application->VisitorManager = new VisitorManager($fileStorage);
  $uniq_visitors = $application->VisitorManager->visitorsByTime(60);
  echo 'Количество уникальных посетителей за последнюю минуту: ' . '<b>' . count($uniq_visitors) . '</b>';
  echo '<br>';
  $allVis = $application ->VisitorManager->getAllVisitors();
  echo 'Посетелей всего: ' . count($allVis);
} catch (Exception $e) {
   echo '<div>Произошла ошибка: ' . '<b>'. $e->getMessage(). '</b>' . '</div>';
}
