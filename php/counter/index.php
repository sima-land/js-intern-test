<?php
require_once './application.php';
require_once './components/visitor_manager.php';
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
  $fileStorage = new FileStorage();
  $application->VisitorManager = new VisitorManager($fileStorage);
  $uniq_visitors = $application->VisitorManager->getUniq();
  echo 'Количество уникальных посетителей: ' . '<b>' . count($uniq_visitors) . '</b>';
  echo '<br>';
  $allVis = $application ->VisitorManager->getAllVisitors();
  echo 'Посетелей всего: ' . count($allVis);
} catch (Exception $e) {
  echo $e->getMessage();
}
