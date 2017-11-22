<?php

namespace Counter;

use Counter\Interfaces\ActiveUsersCounterInterface;

/**
 * Class for counted active logged users
 */
abstract class AbstractUsersCounter implements ActiveUsersCounterInterface, Countable
{
	protected $container	= [];

	public function __construct()
	{
		foreach($_COOKIES as $cookieKey => $cookieVal)
		{
			if(preg_match('/^user\_\w+$/i', $cookieKey)){
				$this->container[$cookieKey] = $cookieVal;
			}
		}
	}

	public function getActiveUsersCount()
	{
		return count($this->container);
	}

	public function count()
	{
		return $this->getActiveUsersCount();
	}
}