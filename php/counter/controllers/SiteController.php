<?php
namespace app\controllers;

use Yii;
use yii\web\Controller;

class SiteController extends Controller
{
    public function actionIndex()
    {
        $users = Yii::$app->counter->getCounter();
        return $this->render('index', compact('users'));
    }

}
