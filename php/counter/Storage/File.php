<?php

namespace Storage;

class File
{

    /** @var string */
    protected $filePath;

    /** @var array */
    protected $data;

    /**
     * @param string $baseDir
     */
    public function __construct(string $baseDir)
    {
        $fileDir = $baseDir . DIRECTORY_SEPARATOR . 'data';
        $this->filePath = $fileDir . DIRECTORY_SEPARATOR . 'cookies.bin';
        if (! \is_file($this->filePath)) {
            \file_put_contents($this->filePath, \serialize([]));
        }
        $this->data = \unserialize(\file_get_contents($this->filePath));
        if (! \is_array($this->data)) {
            $this->data = [];
        }
    }

    public function __destruct()
    {
        if (\is_array($this->data)) {
            \file_put_contents($this->filePath, \serialize($this->data));
        }
    }

    /**
     * @param mixed $key
     * @param int $value
     * @return \Storage\File
     */
    public function set($key, int $value)
    {
        $this->data[$key] = $value;

        return $this;
    }

    /**
     * @param callable $func
     * @return mixed
     */
    public function map(callable $func)
    {
        return $func($this->data);
    }

    /**
     * @param mixed $id
     * @return \Storage\File
     */
    public function unset($id)
    {
        if (\array_key_exists($id, $this->data)) {
            unset($this->data[$id]);
        }

        return $this;
    }

}
