<?php
//код виджета из репазитория https://github.com/suprim1/sitesoft/
//сам виджет https://github.com/suprim1/sitesoft/tree/master/widgets/uniqueness
//посмотреть результат выполнения можно в footer https://prosto-test.ru/

namespace app\widgets\uniqueness;
use Yii;
class UniquenessWidget extends \yii\base\Widget {
    const FILE_NAME = 'uniqueness.txt';
    public function run() {
        $cookies = Yii::$app->request->cookies;
        $file = file_get_contents(self::FILE_NAME);
        $time = time();
        $arrayFile = [];
        if (($cookies->has('uniqueness'))) {
            $uniqueness = $cookies->getValue('uniqueness');
            $arrayFile = $this->workFile($file, $time, $uniqueness);
        } else {
            $uniqueness = random_bytes(10);
            Yii::$app->response->cookies->add(new \yii\web\Cookie([
                'name' => 'uniqueness',
                'value' => $uniqueness,
            ]));
            $arrayFile = $this->workFile($file, $time, $uniqueness);
        }
        $count = count($arrayFile);
        $file = implode(';', $arrayFile);
        file_put_contents(self::FILE_NAME, $file);
        return $this->render('uniqueness', [
                    'count' => $count,
        ]);
    }
    private function workFile(string $file, string $time, string $uniqueness) {
        if ($file) {
            $arrayFile = explode(';', $file);
            foreach ($arrayFile as $key => $string) {
                $array = explode(',', $string);
                if ($array[0] == $uniqueness) {
                    $array[1] = $time;
                    $arrayFile[$key] = implode(',', $array);
                    unset($uniqueness);
                } else {
                    $different = $time - $array[1];
                    if ($different > 60) {
                        unset($arrayFile[$key]);
                    }
                }
            }
        }
        if (isset($uniqueness)) {
            $arrayFile[] = implode(',', [$uniqueness, $time]);
        }
        return $arrayFile;
    }
}
