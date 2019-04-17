<?php

namespace PHPTest;

/**
 * Class WritingPHPTest
 * @package PHPTest
 */
class WritingPHPTest extends PHPTest
{

    /**
     * @throws \Exception
     * Проверяет возможность создания папки для хранения файлов сессий
     */
    function execute() : void {
        ob_start();
        include("counter.php");
        $result = ob_get_clean();

        if(!is_dir("../sessions")) {
            throw new \Exception("Возникла ошибка при создании директории");
        }
    }

}