<?php

namespace storage;

/**
 * Базовый интерфейс для хранилищ.
 */
interface StorageInterface
{
    /**
     * Список пользователей.
     *
     * @return array
     */
    public function getUsers(): array;

    /**
     * Обновить список пользователей.
     *
     * @param array $users Список пользователей
     */
    public function setUsers(array $users): void;

    /**
     * Количество пользователей.
     *
     * @return int
     */
    public function count(): int;
}
