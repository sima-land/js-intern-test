<?php

use PHPTest\PHPTest;
use PHPTest\WritingPHPTest;

loadClasses();
runTest();

function runTest() {
    global $classList;
    foreach($classList as $class){
        if($class != "PHPTest\PHPTest") {
            $test = new $class();
            if($test->run()) {
                echo $class,": OK";
            } else {
                echo $class,": ",$test->getErrorMessage();
            }
            echo "\n";
        }
    }
}

function loadClasses() {
    $classList = array();
    global $classList;
    chdir("PHPTest");
    foreach (glob("*.php") as $filename) {
        $classList[] = "PHPTest\\".substr($filename, 0, strlen($filename) - 4);
        include $filename;
    }
    chdir("../");
}