<?php

namespace CounterUniqueClientsTest;

use CounterUniqueClients\Storage\Storage;
use CounterUniqueClients\Visit\Visit;

class StorageTest extends \PHPUnit_Framework_TestCase
{

    /**
     * @param $object
     * @param $methodName
     * @param array $parameters
     * @return mixed
     * @throws \ReflectionException
     */
    private function invokeMethod(&$object, $methodName, array $parameters = [])
    {
        $reflection = new \ReflectionClass(get_class($object));
        $method = $reflection->getMethod($methodName);
        $method->setAccessible(true);
        return $method->invokeArgs($object, $parameters);
    }

    /**
     * @param $object
     * @param $field
     * @return mixed
     * @throws \ReflectionException
     */
    private function getPrivateField($object, $field) {
        $reflectionClass = new \ReflectionClass( get_class($object) );
        $property = $reflectionClass->getProperty($field);
        $property->setAccessible(true);
        return $property->getValue($object);
    }

    protected function getStorageFileName()
    {
        return __DIR__ . DIRECTORY_SEPARATOR . 'test';
    }

    /**
     * @throws \CounterUniqueClients\Storage\StorageException
     * @throws \ReflectionException
     */
    public function test__construct()
    {
        $storage = new Storage($this->getStorageFileName(),45);
        $this->assertEquals($this->getStorageFileName(), $this->getPrivateField($storage, 'fileName'));
        $this->assertEquals(45, $this->getPrivateField($storage, 'activityTime'));
        $this->assertTrue(is_writable($this->getStorageFileName()));
        unlink($this->getStorageFileName());
    }

    public function test_registration()
    {
        $storage = $this->getMockBuilder(Storage::class)
            ->setMethods(['isWritable','readWithLock','unserialize','addVisit','writeData'])
            ->disableOriginalConstructor()
            ->getMock();

        $storage->expects($this->once())->method('isWritable')->will($this->returnValue(true));
        $storage->expects($this->once())->method('readWithLock');
        $storage->expects($this->once())->method('unserialize');
        $storage->expects($this->once())->method('addVisit');
        $storage->expects($this->once())->method('writeData');
        $storage->registration(new Visit('test'));
    }

    /**
     * @throws \ReflectionException
     * @throws \CounterUniqueClients\Storage\StorageException
     */
    public function test_addVisit()
    {
        /**
         * @var $storage Storage
         */
        $storage = new Storage($this->getStorageFileName(), 10);
        $this->invokeMethod($storage, 'addVisit',[$this->getMockVisit('test', 8, 3)]);
        $this->invokeMethod($storage, 'addVisit',[$this->getMockVisit('test1', 8, 3)]);
        $this->invokeMethod($storage, 'addVisit',[$this->getMockVisit('test', 8, 20)]);

        $this->assertEquals(2, $storage->count());
        unlink($this->getStorageFileName());
    }

    protected function getMockVisit($id, $createTime, $currentTime)
    {
        $visit = $this->getMockBuilder(Visit::class)
            ->setMethods(['getCurrentTime'])
            ->setConstructorArgs([$id, $createTime])
            ->getMock();
        $visit->expects($this->any())->method('getCurrentTime')->will($this->returnValue($currentTime));
        return $visit;
    }
}
