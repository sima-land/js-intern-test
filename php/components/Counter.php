<?php

spl_autoload_register(function ($class_name) {
    include __DIR__ . DIRECTORY_SEPARATOR . str_replace('\\', '/', $class_name) . '.php';
});

/**
 * Счетчик уникальных посетителей.
 */
class Counter
{
    /**
     * @var string Ключ в cookie для хранения идентификатора пользователя
     */
    public const USER_UNIQUE_COOKIE_KEY = 'unique';
    /**
     * @var int Время в секундах, пока пользователь считается активным
     */
    public $userActiveDuration = 0;
    /**
     * Используемое хранилище
     *
     * @var string
     */
    public $storageName = 'File';
    /**
     * @var \storage\StorageInterface
     */
    private $storageClass;

    public function __construct(array $config = [])
    {
        foreach ($config as $item => $value) {
            if (!property_exists($this, $item)) {
                throw new InvalidArgumentException("Invalid config parameter: $item");
            }
            $this->{$item} = $value;
        }
        $class = 'storage\\' . $this->storageName . 'Storage';
        if (!class_exists($class)) {
            throw new InvalidArgumentException("Invalid storage: {$this->storageName}");
        }
        $this->storageClass = new $class;
    }

    /**
     * Идентификатор пользователя.
     *
     * @return string
     */
    public function getUserId(): string
    {
        if (!isset($_COOKIE[self::USER_UNIQUE_COOKIE_KEY])) {
            $_COOKIE[self::USER_UNIQUE_COOKIE_KEY] = session_id();
        }

        return $_COOKIE[self::USER_UNIQUE_COOKIE_KEY];
    }

    /**
     * Добавить пользователя в статистику.
     *
     * @param string $id Идентификатор пользователя
     */
    public function addUserId(string $id): void
    {
        $users = $this->refresh();
        $users[$id] = time();
        $this->storageClass->setUsers($users);
    }

    /**
     * Список пользователей.
     *
     * @param bool $refresh Актуализировать список
     * @return array
     */
    public function getUsers(bool $refresh = true): array
    {
        return $refresh ? $this->refresh() : $this->storageClass->getUsers();
    }

    /**
     * Количество активных пользователей.
     *
     * @return int
     */
    public function getCount(): int
    {
        return $this->storageClass->count();
    }

    /**
     * Актуализировать список пользователей.
     *
     * @return array
     */
    public function refresh(): array
    {
        $actual = [];
        foreach ($this->storageClass->getUsers() as $userId => $time) {
            if ($this->isActive($time)) {
                $actual[$userId] = $time;
            }
        }
        $this->storageClass->setUsers($actual);

        return $actual;
    }

    /**
     * Проверка активности пользователя.
     *
     * @param int $timestamp Время последнего действия пользователя
     * @return bool
     */
    private function isActive(int $timestamp): bool
    {
        if ($this->userActiveDuration) {
            return $timestamp + $this->userActiveDuration > time();
        }

        return true;
    }
}