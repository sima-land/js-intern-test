<?php

namespace app\components;

use Yii;

/**
 * Counter Users Online
 */
class Counter
{

    public static function getCounter () {
        $counter = Yii::getAlias('@runtime').'/counter.php';
        require_once($counter);
        $users = json_decode($users, TRUE);
        foreach( $users as $key => $user ){
            if ( $user + 60 < time() ){
                unset($users[$key]);
            }
        }
        $cookies = Yii::$app->request->cookies->getValue('_csrf');
        $users[$cookies] = time();
        file_put_contents($counter, '<?php $users = \''.json_encode($users).'\'; ?>');

        return count($users);
    }
}
