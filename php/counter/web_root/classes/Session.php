<?php

namespace classes;

/**
 * Класс для работы с сессией.
 */
class Session
{
    /**
     * Пытается создать сессию. Если сессия не смогла стартовать, то кидает исключение.
     */
    public function createSession(): void
    {
        if (!$this->sessionIsActive()) {
            $this->startSession();
        }
        if (!$this->sessionIsActive()) {
            throw new \RuntimeException('Сессия не смогла стартовать.');
        }
    }

    /**
     * Стартует сессию.
     */
    private function startSession(): void
    {
        session_start();
    }

    /**
     * Возвращает true, если сессия активна.
     *
     * @return bool
     */
    private function sessionIsActive(): bool
    {
        return session_status() === PHP_SESSION_ACTIVE;
    }

}
