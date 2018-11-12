<?php

namespace app\components;

use Yii;

/**
 * Counter Users Online
 */
class Counter
{
    private $time;

    public function __construct() {
        $this->time = Yii::$app->params['time'];
    }

    public function getCounter ( $time = null ) {
        if ( $time === null ) {
            $time = $this->time;
        }
        $counter = Yii::getAlias('@runtime').'/counter.php';
        require_once($counter);
        $users = json_decode($users, TRUE);
        foreach( $users as $key => $user ){
            if ( $user + $time < time() ){
                unset($users[$key]);
            }
        }
        $cookies = Yii::$app->request->cookies->getValue('_csrf');
        $users[$cookies] = time();
        file_put_contents($counter, '<?php $users = \''.json_encode($users).'\'; ?>');

        return count($users);
    }
}
