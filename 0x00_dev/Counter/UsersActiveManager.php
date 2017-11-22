<?php

namespace Counter;

use Counter\Interfaces\UsersManagerInterface;

class UsersActiveManager implements UsersManagerInterface
{
	private $counter	= null;

	public function __construct(AbstractUsersCounter $counter)
	{
		$this->counter	= $counter;
	}

	/**
	 * {@inheritdoc}
	 */
	public function has(string $key)
	{
		return file_exists($this->createFileName($key));
	}

	/**
	 * {@inheritdoc}
	 */
	public function set(string $key, string $val)
	{
		if(!$this->has($key)){

			$file	= fopen($this->createFileName($key),'w+');
			fwrite($file, $val);
			fclose($file);
		}
	}

	/**
	 * @param string key for group uniqueness like regex search
	 * @return string of generated hash
	 */
	private function createHashKey($key)
	{
		$userIP		= $_SERVER['REMOTE_ADDR'];
		$userAgent	= $_SERVER['HTTP_USER_AGENT'];

		return sprintf('%s_%s',$key,md5(md5( sprintf('%s%s',$userIP, $userAgent) )));
	}

	/**
	 * @param string key for group uniqueness like regex search
	 * @return string of full path and file name
	 */
	private function createFileName(string $key)
	{
		$hashKey	= $this->createHashKey($key);
		return sprintf('%s/%s',$this->counter->getPath(),$hashKey);
	}
}