<?php

namespace Counter\Interfaces;


interface ActiveUsersCounterInterface
{
	/**
	 * @return int of active users
	 */
	function getActiveUsersCount();
}