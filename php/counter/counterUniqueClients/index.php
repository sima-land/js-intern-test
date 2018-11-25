<?php

include_once 'vendor/autoload.php';

try {
    $consumer = new \CounterUniqueClients\Consumer\Consumer(new CounterUniqueClients\Storage\Storage(__DIR__.DIRECTORY_SEPARATOR.'visitDB',60));
    /** @var \CounterUniqueClients\Consumer\Consumer $consmer */
    $consumer->run();
    $content =  "<h4>Поситителей онлайн: {$consumer->countUniqueVisit()} </h4>";
} catch (Exception $exception) {
    $content =  "<h4>Не удалось создать хранилище для счетчика </h4>";
}
?>

<div >
    <?= $content ?>
</div>