<?php

namespace Counter;

use Counter\AbstractUsersCounter;

class UsersOnlineCounter extends AbstractUsersCounter
{
	private	$path	= '';

	public function __construct()
	{
		$usersPath	= sprintf('%s/var/users_c', $_SERVER['DOCUMENT_ROOT']);

		$this->path	= $usersPath;

		foreach(scandir($usersPath) as $file)
		{
			if(!in_array($file, array_merge_recursive($this->container,['.','..']) )){

				$fullFileName	= sprintf('%s/%s', $this->path, $file);

				$time = file_get_contents($fullFileName);

				if($time > time()){
					$this->container[] = $file;
				}else{
					unlink($fullFileName);
				}
			}
		}
	}

	public function getDebugContainer()
	{
		return $this->container;
	}

	public function getPath()
	{
		return $this->path;
	}
}