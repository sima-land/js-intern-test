<?php

namespace Counter;

use Counter\Interfaces\ActiveUsersCounterInterface;

/**
 * Class for counted active logged users
 */
abstract class AbstractUsersCounter implements ActiveUsersCounterInterface, \Countable
{
	protected $container	= [];
	
	public function getActiveUsersCount()
	{
		$uniqueArray	= array_unique($this->container);
		return count($uniqueArray);
	}

	public function count()
	{
		return $this->getActiveUsersCount();
	}
}