<?php

class Setting
{
    public function __construct()
    {
        $this->activeUsers = new ActiveUsers();
    }

    public function start()
    {
        $this->activeUsers->setCookie();
        return $this->activeUsers->checkActive();
    }
}
/*
* Класс Random отвечает за генерацию строк
*/
class Random
{
    public static function generateCookie()
    {
        return md5(time() . mt_rand(1, 1000000));
    }
}
/*
* Класс ActiveUsers отвечает за подсчет активных пользователей
*/
class ActiveUsers
{
    const TIMESESSION = 60; // время статуса актвиного пользователя с последней его активности
    const DIR = 'temp' . DIRECTORY_SEPARATOR;
/*
* В методе setCookie устанавливается куки
*/
    public function setCookie()
    {
        if (!isset($_COOKIE['active'])) {
            setcookie('active', Random::generateCookie());
        }
        $cookies = $_COOKIE['active'];
        if ($cookies) {
            $file = self::DIR . $cookies;
            file_put_contents($file, '');
        }
    }
/*
* В методе checkActive проверяются активные пользователи
*/
    public function checkActive()
    {
        $active = 0;
        foreach (array_diff(scandir(self::DIR), array('..', '.')) as $cookie) {
            if (time() - filemtime(self::DIR . $cookie) < self::TIMESESSION) {
                $active++;
            }
        }
        return $active;
    }
}