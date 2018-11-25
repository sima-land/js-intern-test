<?php

namespace CounterUniqueClientsTest;

use CounterUniqueClients\Visit\Visit;

class VisitTest extends \PHPUnit_Framework_TestCase
{

    public function test_positive_isSame()
    {
        $this->assertTrue((new Visit('id_1'))->isSame(new Visit('id_1')));
    }

    public function test_negative_isSame()
    {
        $this->assertFalse((new Visit('id_1'))->isSame(new Visit('id_2')));
    }

    /**
     * Тестирование объекта на предмет актуальности
     *
     * @dataProvider data_isActive
     * @param $expected bool
     * @param $createTime int
     * @param $currentTime int
     */
    public function test_isActive($expected, $createTime, $currentTime)
    {
        $visit = $this->getMockBuilder(Visit::class)
            ->setMethods(['getCurrentTime'])
            ->setConstructorArgs(['active', $createTime])
            ->getMock();
        $visit->expects($this->once())->method('getCurrentTime')->will($this->returnValue($currentTime));
        $this->assertEquals($expected, $visit->isActive(60));
    }

    public function data_isActive()
    {
        return [
            'Визит активен' => [
                'expected' => true,
                'createTime' => 10,
                'currentTime' => 50,
            ],
            'Визит не активен' => [
                'expected' => false,
                'createTime' => 10,
                'currentTime' => 71,
            ],
        ];
    }
}
