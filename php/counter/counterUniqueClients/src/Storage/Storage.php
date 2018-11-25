<?php

namespace CounterUniqueClients\Storage;

use CounterUniqueClients\Visit\Visit;

/**
 * Объект олицетворяющий хранилище актуальных уникальных посещений
 *
 * Class Storage
 * @package CounterUniqueClients
 */
class Storage extends \ArrayObject
{
    /**
     * @var string
     */
    protected $fileName;

    protected $fileHandle;

    protected $activityTime;

    /**
     * @return int
     */
    protected function readWithLock()
    {
        $this->fileHandle = fopen ($this->fileName,"a");
        flock($this->fileHandle,LOCK_EX);
        return fread($this->fileHandle, filesize($this->fileName));
    }

    /**
     * @return bool
     */
    protected function isWritable()
    {
        return is_writable($this->fileName);
    }

    public function count()
    {
        $this->unserialize(file_get_contents($this->fileName));
        return parent::count();
    }

    /**
     * @param Visit $visit
     * @return void
     */
    public function registration(Visit $visit)
    {
        $isNotAdded = true;
        do {

            //TODO: возможно необходимо добавить условие выхода
            if ($this->isWritable()) {
                $this->unserialize($this->readWithLock());
                $this->addVisit($visit);
                $this->writeData();
                $isNotAdded = false;
            }
        } while ($isNotAdded);
    }

    protected function writeData()
    {
        ftruncate ($this->fileHandle,0);
        fputs($this->fileHandle, $this->serialize());
        fflush ($this->fileHandle);
        flock ($this->fileHandle,LOCK_UN);
        fclose ($this->fileHandle);
        $this->fileHandle = 0;
    }

    /**
     * @return bool|int
     */
    protected function createFile()
    {
        file_put_contents($this->fileName,"");
        return $this->isWritable();
    }

    /**
     * Storage constructor.
     * @param $fileName string
     * @param $activityTime
     * @throws StorageException
     */
    public function __construct($fileName, $activityTime = 60)
    {
        parent::__construct();
        $this->fileName = $fileName;
        $this->activityTime = $activityTime;
        if (!file_exists($this->fileName)) {
            if (!$this->createFile()) {
                throw new StorageException('Не удалось создать хранилище для счетчика!');
            };
        }
    }

    /**
     * @param Visit $visit
     */
    protected function addVisit(Visit $visit)
    {
        $preparedData[] = $visit;

        /** @var Visit $item */
        foreach ($this->getIterator() as $item) {
            if (!$item->isSame($visit) && ($item->isActive($this->activityTime))) {
                $preparedData[] = $item;
            }
        }
        $this->exchangeArray($preparedData);
    }

}