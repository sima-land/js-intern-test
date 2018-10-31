<?php

if (! \defined('BASEDIR')) {
    \define('BASEDIR', \dirname(__DIR__));
}
spl_autoload_register(function ($className) {
    include BASEDIR . DIRECTORY_SEPARATOR . \str_replace('\\', '/', $className) . '.php';
});

(new \Controller\Application)->run();
