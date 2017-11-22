<?php

namespace Counter\Interfaces;


interface ActiveUsersCounterInterface
{
	/**
	 * @return int of active users
	 */
	function getActiveUsersCount();

	/**
	 * @return string of user counter files path
	 */
	function getPath();
}