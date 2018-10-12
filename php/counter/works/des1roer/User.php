<?php

    class User
    {
        private const NAME = 'myCookie';
        private const DS   = DIRECTORY_SEPARATOR;
        public $cnt = 0;

        public function __construct()
        {
            $this->writeCookie();
            $this->cnt = $this->getCounts();
        }

        private function writeCookie()
        {
            if (empty($_COOKIE[self::NAME])) {
                $_COOKIE[self::NAME] = $this->getUniqName();
                setcookie(self::NAME, $this->$_COOKIE[self::NAME]);
                file_put_contents($this->getDirName(), '');
            } else {
                touch($this->getDirName());
            }
        }

        private function getUniqName()
        {
            return uniqid(microtime(), true);
        }

        private function getDirName($withName = true)
        {
            $dir = __DIR__ . self::DS . 'data' . self::DS;
            if ($withName) {
                $dir .= $_COOKIE[self::NAME];
            }

            return $dir;
        }

        private function getCounts(): int
        {
            $dir = opendir($this->getDirName(false));
            $count = 0;
            while ($file = readdir($dir)) {
                if ($file === '.' || $file === '..' || $file === '.gitkeep') {
                    continue;
                }
                if (
                    file_exists($this->getDirName(false) . $file)
                    && time() - filemtime($this->getDirName(false) . $file) < 60
                ) {
                    $count++;
                }
            }

            return $count;
        }

        public function getName()
        {
            return $_COOKIE[self::NAME];
        }
    }