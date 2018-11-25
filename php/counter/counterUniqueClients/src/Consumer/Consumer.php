<?php

namespace CounterUniqueClients\Consumer;


use CounterUniqueClients\Storage\Storage;
use CounterUniqueClients\Visit\Visit;

class Consumer
{
    /**
     * @var Storage
     */
    protected $storage;

    /**
     * Consumer constructor.
     * @param Storage $storage
     */
    public function __construct(Storage $storage)
    {
        $this->storage = $storage;
    }

    /**
     * @return int
     */
    public function run()
    {
        if ($uniqueVisit = $this->InstanceUniqueVisit()) {
            $this->storage->registration($uniqueVisit);
        }
        return $this->countUniqueVisit();
    }

    /**
     * @return int
     */
    public function countUniqueVisit()
    {
        return $this->storage->count();
    }

    /**
     * @return Visit|null
     */
    protected function InstanceUniqueVisit()
    {
        if ($this->visitIsUnique($this->buildCookieName())) {
            $this->setCookie($this->buildCookieName());
            return new Visit($this->buildCookieName());
        }
        return null;
    }

    protected function setCookie($id)
    {
        $_COOKIE[$id] = true;
        setcookie($id, true);
    }

    protected function buildCookieName()
    {
        return 'ConsumerUniqueClients' ;
    }

    protected function visitIsUnique($id)
    {
        return !isset($_COOKIE[$id]);
    }
}