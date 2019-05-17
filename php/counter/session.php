<?php

ini_set("session.save_path", 'C:\openfull\OSPanel\domains\sima\temp');
ini_set('session.cookie_lifetime', 60*60); // срок годности куки 1 час

class Setting
{
    public function __construct()
    {
        $this->session = new Session();
    }

    public function start()
    {
        $this->session->sessionStart();
        return $this->session->sessionCheckActive();
    }
}

/*
* Класс Session отвечает за сессии
*/
class Session
{
    const TIMESESSION = 60; // Сессия держится 60 секунд
/*
* В методе sessionStart стартуется сессия
*/
    public function sessionStart()
    {
        session_start();
        if (isset($_SESSION['active']) && (date(time()) - $_SESSION['active'] >= self::TIMESESSION)) {
            session_unset();
            session_destroy();
        } else {
            $_SESSION['active'] = date(time());
        }
    }
/*
* В методе sessionActive проверяются активные сессии
*/
    public function sessionCheckActive()
    {
        if ($directory_handle = opendir( session_save_path())) {
             $count = 0;
             while (false !== ($file = readdir($directory_handle))) {
                 if($file != '.' && $file != '..') {
                     if(date(time()) - filemtime(session_save_path() .'/'. $file) < self::TIMESESSION) {
                         $count++;
                     } else {
                         unlink((session_save_path() .'/'. $file));
                     }
                 }
             }
             closedir($directory_handle);
             return $count;
        }
    }
}