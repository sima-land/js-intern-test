<?php

namespace PHPTest;

/**
 * Class PHPTest
 * @package PHPTest
 */
abstract class PHPTest
{
    /**
     * @var \Exception
     */
    private $exception;

    abstract protected function execute(): void;

    /**
     * @return string - Текст ошибки
     */
    public function getErrorMessage(): string
    {
        return @$this->exception->getMessage() ?? false;
    }

    /**
     * Выполнение теста наследющего класса.
     * @return bool - возращает true если тест успешен и false если была ошибка
     */
    public function run(): bool
    {

        $this->clear();

        try {
            $this->execute();
        } catch (\Exception $e) {
            $this->exception = $e;
            return false;
        }
        return true;
    }

    /**
     * Очистка данных перед тестом.
     */
    private function clear(): void
    {
        @rmdir("sessions");
    }

}