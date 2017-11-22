<?php

class Autoloader
{
	public static function autoload(string $namespace)
	{
		$replaceSlashesNamespace	= str_replace('\\', '/', $namespace);
		$fullClassName	= sprintf('%s/%s.php',$_SERVER['DOCUMENT_ROOT'],$replaceSlashesNamespace);

		if(file_exists($fullClassName)){
			require_once $fullClassName;
		}else{
			return false;
		}
	}
}

spl_autoload_register(['Autoloader','autoload']);