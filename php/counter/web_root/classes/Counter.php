<?php

namespace classes;

/**
 * Класс для подсчета активных пользователей на сайте.
 *
 * Создает для каждого пользователя уникальный файл по идентификатору сессии.
 */
class Counter
{
    /**
     * @var string Соль для имени файла.
     */
    private const SALT = 'salt';

    /**
     * @var int Время (в секундах) по прошествию какого времени пользователь считается не активным.
     */
    private $notActiveAfterSeconds = 60;

    /**
     * Подсчитывает количество активных пользователей и возвращает число.
     *
     * @return int
     */
    public function calculateActiveUsers(): int
    {
        $this->prepareCalculation();
        $this->updateCounterFile();

        $timestamp = time();
        $fileNames = scandir($this->getCounterDir(), null);

        $usersCount = 0;
        foreach ($fileNames as $fileName) {
            $filePath = $this->getCounterDir() . $fileName;
            if (is_file($filePath)) {
                $lastVisit = $timestamp - filemtime($filePath);
                if ($lastVisit <= $this->notActiveAfterSeconds) {
                    $usersCount++;
                }
            }
        }

        return $usersCount;
    }

    /**
     * Возвращает папку с файлами для подсета активных пользователей.
     *
     * @return string
     */
    private function getCounterDir(): string
    {
        return $_SERVER['DOCUMENT_ROOT'] . '/counter/';
    }

    /**
     * Подготавка перед выполнение подсчета.
     */
    private function prepareCalculation(): void
    {
        $counterDir = $this->getCounterDir();

        if (!file_exists($counterDir)) {
            mkdir($counterDir);
        }
    }

    /**
     * Обновляет файл текущего пользователя.
     */
    private function updateCounterFile(): void
    {
        $sessionHash = hash('md5', session_id() . self::SALT);
        touch($this->getCounterDir() . $sessionHash);
    }
}
