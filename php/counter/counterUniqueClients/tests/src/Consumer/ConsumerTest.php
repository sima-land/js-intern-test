<?php

namespace CounterUniqueClientsTest;


use CounterUniqueClients\Consumer\Consumer;
use CounterUniqueClients\Storage\Storage;
use CounterUniqueClients\Visit\Visit;


class ConsumerTest extends \PHPUnit_Framework_TestCase
{
    protected function getStorageFileName()
    {
        return __DIR__ . DIRECTORY_SEPARATOR . 'storage';
    }

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

    public function test_run_add_visit()
    {
        $consumer = new Consumer(new Storage($this->getStorageFileName(), 60));
        $consumer->run();
        $this->assertEquals(1, $consumer->countUniqueVisit());
        unlink($this->getStorageFileName());
    }

    public function test_run_not_added_visit()
    {
        $_COOKIE['ConsumerUniqueClients'] = true;
        $consumer = new Consumer(new Storage($this->getStorageFileName(), 60));
        $consumer->run();
        $this->assertEquals(0, $consumer->countUniqueVisit());
        unlink($this->getStorageFileName());
        unset($_COOKIE['ConsumerUniqueClients']);
    }

    /**
     * @return \PHPUnit_Framework_MockObject_MockObject | Storage
     */
    protected function getStorageMock()
    {
        return $this->getMockBuilder(Storage::class)
            ->disableOriginalConstructor()
            ->getMock();
    }

    protected function getConsumerMock()
    {
        return $this->getMockBuilder(Consumer::class)
            ->setMethods(['visitIsUnique','buildCookieName','setCookie'])
            ->setConstructorArgs([$this->getStorageMock()])
            ->enableOriginalConstructor()
            ->getMock();

    }

    /**
     * @throws \ReflectionException
     */
    public function test_InstanceUniqueVisit()
    {
        $consumerMock = $this->getConsumerMock();
        $consumerMock->expects($this->exactly(3))->method('buildCookieName');
        $consumerMock->expects($this->once())->method('visitIsUnique')->will($this->returnValue(true));
        $consumerMock->expects($this->at(2))->method('buildCookieName');
        $consumerMock->expects($this->once())->method('setCookie');
        $consumerMock->expects($this->at(3))->method('buildCookieName')->will($this->returnValue('id-test'));
        $this->assertInstanceOf(
            Visit::class,
            $this->invokeMethod($consumerMock,'InstanceUniqueVisit')
        );
    }

    /**
     * @throws \ReflectionException
     */
    public function test_InstanceUniqueVisit_current_visit_notUnique()
    {
        $consumerMock = $this->getConsumerMock();
        $consumerMock->expects($this->exactly(1))->method('buildCookieName');
        $consumerMock->expects($this->at(0))->method('buildCookieName');
        $consumerMock->expects($this->at(1))->method('visitIsUnique')->will($this->returnValue(false));
        $this->assertEmpty(
            $this->invokeMethod($consumerMock,'InstanceUniqueVisit')
        );
    }

    /**
     * @throws \ReflectionException
     */
    public function test_buildCookieName()
    {
        $consumerMock = new Consumer($this->getStorageMock());
        $this->assertEquals(
            'ConsumerUniqueClients',
            $this->invokeMethod($consumerMock,'buildCookieName')
        );
    }

    /**
     * @dataProvider data_isUnique
     * @param $expected bool
     * @param $id string key
     * @param $cookieExist bool
     * @throws \ReflectionException
     */
    public function test_visitIsUnique($expected,$id,$cookieExist)
    {
        if ($cookieExist) {
            $_COOKIE[$id] = true;
        }
        $consumer = new Consumer($this->getStorageMock());
        $this->assertEquals(
            $expected,
            $this->invokeMethod($consumer,'visitIsUnique', [$id])
        );
        unset($_COOKIE[$id]);
    }

    public function data_isUnique()
    {
        return[
            'визит уникальный' =>['expected' => true,'id' => 'test', 'cookieExist' => false],
            'визит повторный' =>['expected' => false,'id' => 'test', 'cookieExist' => true],
        ];
    }
}
