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
    public function generateCookie()
    {
        return md5(time() . mt_rand(1, 1000000));
    }
}
/*
* Класс ActiveUsers отвечает за подсчет активных пользователей
*/
class ActiveUsers
{
    const TIMESESSION = 3; // время статуса актвиного пользователя с последней его активности
/*
* В методе setCookie устанавливается куки
*/
    public function setCookie()
    {
        if (!isset($_COOKIE['active'])) {
            setcookie('active', Random::generateCookie());
        }
    }
/*
* В методе checkActive проверяются активные пользователи
*/
    public function checkActive()
    {
        $dir = 'temp' . DIRECTORY_SEPARATOR;
        $cookie = $_COOKIE['active'];
        $file = $dir . $cookie;

        file_put_contents($file, '');
        foreach (array_diff(scandir($dir), array('..', '.')) as $cookie) {
            if (time() - filemtime($dir . $cookie) < self::TIMESESSION) {
                $active++;
            }
        }

        return $active;
    }
}