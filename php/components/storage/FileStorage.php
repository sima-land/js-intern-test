<?php

namespace storage;

/**
 * Файловое хранилище.
 */
class FileStorage implements StorageInterface
{
    /**
     * @var string Имя файла
     */
    public const USER_LIST_FILE_NAME = 'stat.txt';

    /**
     * @var array Рантайм кэш пользователей
     */
    private $users;

    public function __construct()
    {
        if (!file_exists(self::USER_LIST_FILE_NAME)) {
            if (!is_writable(\dirname(self::USER_LIST_FILE_NAME))) {
                throw new \Exception('Нет прав на запись файла');
            }
            $handle = $this->getFileHandle('w+');
            $this->closeHandle($handle);
            chmod(self::USER_LIST_FILE_NAME, '0777');
        }
    }

    /**
     * @inheritdoc
     */
    public function getUsers(): array
    {
        if ($this->users === null) {
            $users = [];
            $handle = $this->getFileHandle('rb');
            if (!$handle) {
                return null;
            }
            while (($buffer = fgets($handle)) !== false) {
                if (!$buffer) {
                    continue;
                }
                $buffer = str_replace("\n", '', $buffer);
                [$userId, $time] = explode(';', $buffer);
                $users[$userId] = $time;
            }
            $this->closeHandle($handle);
            $this->users = $users;
        }

        return $this->users;
    }

    /**
     * @inheritdoc
     */
    public function setUsers(array $users): void
    {
        $this->clearFile();
        if ($users) {
            $handle = $this->getFileHandle('rb+');
            $data = '';
            if ($handle) {
                foreach ($users as $userId => $time) {
                    $data .= "$userId;$time\n";
                }
            }
            if (!fwrite($handle, $data)) {
                throw new \Exception('Ошибка сохранения файла');
            }
            $this->closeHandle($handle);
        }
        $this->users = $users;
    }

    /**
     * @inheritdoc
     */
    public function count(): int
    {
        return \count($this->getUsers());
    }

    /**
     * Очистка файла.
     */
    private function clearFile(): void
    {
        $handle = $this->getFileHandle('w');
        $this->closeHandle($handle);
    }

    /**
     * Обработчик файла
     *
     * @param string $mode
     *
     * @return bool|resource
     * @see fopen()
     */
    private function getFileHandle(string $mode)
    {
        return fopen(self::USER_LIST_FILE_NAME, $mode);
    }

    /**
     * Закрыть файл.
     *
     * @param $handle
     */
    private function closeHandle($handle): void
    {
        fclose($handle);
    }
}