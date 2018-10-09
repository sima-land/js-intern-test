<?php

namespace classes;

include_once 'Session.php';
include_once 'Counter.php';

/**
 * Главный класс приложения.
 */
class Application
{
    /**
     * @var int Количество активных пользователей.
     */
    private $userCount = 0;

    public function run(): void
    {
        $session = new Session();
        $session->createSession();

        $counter = new Counter();
        $this->userCount = $counter->calculateActiveUsers();
    }

    /**
     * Количество активных пользователей. (Геттер).
     *
     * @return int
     */
    public function userCount(): int
    {
        return $this->userCount;
    }
}