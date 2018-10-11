<?php
/**
 * Конфиг
 */

class Config
{
    /**
     *  конфиг для счетчика ункиальных посетителей
     * @return array
    */
    static public function getCounterConfig(): array
    {
        return [
            'file' => $_SERVER['DOCUMENT_ROOT'] .  '/php/counter/smilik_a/data/counter.txt',
            // период, в течение которого посетитель считается активным после последнего захода на сайт, секунд
            'timeoutActive' => 60,
            'durationStore' => '+1 years',
        ];
    }
}