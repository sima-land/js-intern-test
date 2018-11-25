<?php

namespace CounterUniqueClients\Visit;

/**
 * Объект олицетворяющий посещение
 *
 * Class Visit
 * @package CounterUniqueClients
 */
class Visit
{
    /**
     * @var string
     */
    protected $id;

    /**
     * @var int
     */
    protected $createTime;

    protected function getCurrentTime()
    {
        return time();
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return int
     */
    public function getCreateTime()
    {
        return $this->createTime;
    }

    /**
     * Obj constructor.
     * @param $id string
     * @param int $createTime
     */
    public function __construct($id, $createTime = 0)
    {
        $this->id = $id;
        $this->createTime = $createTime ?: time();
    }

    /**
     * @param Visit $obj
     * @return bool
     */
    public function isSame(Visit $obj)
    {
        return $this->id === $obj->getId();
    }

    /**
     * @param $activityTime int
     * @return bool
     */
    public function isActive($activityTime)
    {
        return ($this->createTime + $activityTime) > $this->getCurrentTime();
    }

}