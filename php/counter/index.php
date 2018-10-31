<?php
/**
 * Created by PhpStorm.
 * User: Admin Neadekvat
 * Date: 30.10.2018
 * Time: 16:07
 */

session_start();

$id = session_id();
$CurrentTime = time();
$ResFile = [];
$LastTime = time() + 60;
$base = "users_visited.txt";

if (!isset($_COOKIE['visited'])) {
    setcookie('visited', $id, $LastTime);

    if ($id != "") {
        $file = file($base);
        $k = 0;
        for ($i = 0; $i < sizeof($file); $i++) {
            $line = explode(" | ", $file[$i]);
            if ($line[1] < $LastTime) {
                $ResFile[$k] = $file[$i];
                $k++;
            }
        }

        for ($i = 0; $i < sizeof($ResFile); $i++) {
            $line = explode(" | ", $ResFile[$i]);
            if ($line[0] == $id) {
                $line[1] = trim($CurrentTime) . "\n";
                $is_sid_in_file = 1;
            }
            $line = implode(" | ", $line);
            $ResFile[$i] = $line;
        }

        $fp = fopen($base, "w");
        for ($i = 0; $i < sizeof($ResFile); $i++) {
            fputs($fp, $ResFile[$i]);
        }
        fclose($fp);

        if (!$is_sid_in_file) {
            $fp = fopen($base, "a-");
            $line = $id . " | " . $CurrentTime . "\n";
            fputs($fp, $line);
            fclose($fp);
        }
    }
}

echo "Сейчас на сайте: <b>" . sizeof(file($base)) . "</b>";