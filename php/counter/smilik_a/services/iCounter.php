<?php

/**
 * интерфейс для счетчика
 */
interface iCounter
{
    public function setUniqueId();
    public function getCount();
}