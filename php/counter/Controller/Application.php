<?php

namespace Controller;

class Application
{

    const COOKIE_NAME = '_counter_';
    const COOKIE_LIFETIME = 2592000; // 60*60*24*30 sec = 30 days
    const USER_LIFETIME = 60; // sec

    public function run()
    {
        $timestamp = \time();
        if (! isset($_COOKIE[self::COOKIE_NAME])) { // generate
            $uniq = \uniqid();
            \setcookie(self::COOKIE_NAME, $uniq, $timestamp + self::COOKIE_LIFETIME);
            $_COOKIE[self::COOKIE_NAME] = $uniq;
        } else {
            \setcookie(self::COOKIE_NAME, $_COOKIE[self::COOKIE_NAME], $timestamp + self::COOKIE_LIFETIME);
        }
        $storage = new \Storage\File(BASEDIR);
        $storage->set($_COOKIE[self::COOKIE_NAME], $timestamp);
        $maxTimeStamp = $timestamp - self::USER_LIFETIME;
        echo $storage->map(function ($data) use ($maxTimeStamp) {
            return \count(\array_filter($data, function ($item) use ($maxTimeStamp) {
                return $item > $maxTimeStamp;
            }));
        });

        // finally cleanup old data
        $minTimeStamp = $timestamp - self::COOKIE_LIFETIME;
        $oldData = $storage->map(function ($data) use ($minTimeStamp) {
            return \array_filter($data, function ($item) use ($minTimeStamp) {
                return $item < $minTimeStamp;
            });
        });
        if (\count($oldData)) {
            foreach (\array_keys($oldData) as $key) {
                $storage->unset($key);
            };
        }
    }

}
