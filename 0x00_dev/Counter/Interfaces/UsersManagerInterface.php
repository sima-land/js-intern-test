<?php

namespace Counter\Interfaces;

interface UsersManagerInterface
{
	/**
	 * @param string $key
	 * @return bool is container have key
	 */
	function has(string $key);

	/**
	 * @param string $key
	 * @param string $val
	 * @return UsersCookieManagerInterface
	 */
	function set(string $key, string $val);
} 