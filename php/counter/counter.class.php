<?php

class CounterOnline
{
	public $config = array();

	function __construct($config = array()){
		$this->config = array_merge(array(
			'file' => (__DIR__) . '/online.dat',
			'time' => 60,
		), $config);
	}

	public function guidv4(){
		if (function_exists('com_create_guid') === true)
			return trim(com_create_guid(), '{}');

		$data = openssl_random_pseudo_bytes(16);
		$data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
		$data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
		return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
	}

	private function getData(){
		if (!file_exists($this->config['file'])) 
			return array();
		return file($this->config['file']);
	}

	private function setData($data = array()){
		file_put_contents($this->config['file'], implode("\n", $data));
	}

	public function getOnline(){
		$now = time();
		$past_time = $now - $this->config['time'];

		if (!isset($_COOKIE["user_guid"])) {
			$user_guid = $this->guidv4();
			setcookie("user_guid", $user_guid, $now + $this->config['time'], '/');    
		}
		else {
			$user_guid = $_COOKIE["user_guid"];
		}

		$data = $this->getData();

		$new_data = array();

		for ($i = 0; $i < count($data); $i++){
			list($guid, $last_time) = explode("::", $data[$i]);
			if (empty($guid) || empty($last_time) || ($last_time < $past_time)) 
				continue;

			$new_data[$guid] = "$guid::$last_time";
		}

		$new_data[$user_guid] = "$user_guid::$now";

		$this->setData($new_data);

		return count($new_data);
	}

}
