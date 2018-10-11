<?php

/**
 * Счетчик уникальных активных посетителей с хранением в файле
 */
class CounterFile implements iCounter
{
    public $config = [];
    public $id = null;

    public function __construct(array $config)
    {
        $this->config = $config;
        $this->setUniqueId();
    }

    /**
     * установка уникального id посетителя
     *
     * @return void
    */
    public function setUniqueId()
    {
        if (empty($_COOKIE['counter']['visit_id'])) {
            $hash = md5(microtime() . uniqid('', true) . random_int(100, 999));
            setcookie("counter[visit_id]", $hash, strtotime($this->config['durationStore']), '/');
            $this->id = $hash;
        } else {
            $this->id = $_COOKIE['counter']['visit_id'];
        }
    }

    /**
     * подсчет кол-ва уникальных посетителей за последние X секунд
     *
     * @return int
     */
    public function getCount()
    {
        /** @var $count int кол-во уникальных посетителей */
        $count = 0;
        $curTime = time();
        $expired = $curTime - $this->config['timeoutActive'];
        $fileSize = is_file($this->config['file']) ? filesize($this->config['file']) : 0;

        $fh = fopen($this->config['file'], 'c+');

        // блокировка файла на запись
        if (flock($fh, LOCK_EX)) {
            //sleep(4);
            // если файл не пустой, то читаем массив из него, иначе создаем пустой
            $stat = $fileSize ? unserialize(fread($fh, $fileSize)) : [];

            // если текущее время есть в массиве
            if (isset($stat[$curTime])) {
                // если id посетителя отсутствует в массиве
                if (empty($stat[$curTime]['id'][$this->id])) {
                    $stat[$curTime]['id'][$this->id] = 1;
                    $stat[$curTime]['count']++;
                }
            } else {
                $stat[$curTime] = ['id' => [$this->id => 1], 'count' => 1];
            }


            foreach ($stat as $time => $data) {

                if ($time < $expired) {
                    // удаляем просроченных посетителей
                    unset($stat[$time]);
                } else {
                    // удаляем текущего посетителя из ранее добавленного
                    if (isset($data['id'][$this->id]) && $time != $curTime) {
                        if ($stat[$time]['count'] == 1) {
                            unset($stat[$time]);
                        } else {
                            unset($stat[$time]['id'][$this->id]);
                            $stat[$time]['count']--;
                        }
                    }

                    $count += $stat[$time]['count'];
                }
            }

            ftruncate($fh, 0);
            rewind($fh);
            fwrite($fh, serialize($stat));
            fflush($fh);
            flock($fh, LOCK_UN);
        }
        fclose($fh);

        return $count;
    }
}