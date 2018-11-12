<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\components\Counter;


class SiteController extends Controller
{


    public function actionIndex()
    {
        $users = new Counter;
        $users_count = $users->getCounter();
        return $this->render('index', [
            'users' => $users_count,
        ]);

    }

}
