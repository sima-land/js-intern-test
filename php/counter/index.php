<?php include_once("session.php"); 

    $Setting = new Setting();
    $echo = $Setting->start();

?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <!-- Кодировка веб-страницы -->
    <meta charset="utf-8">
    <!-- Настройка viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Подключаем Bootstrap CSS -->
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" >
    <link rel="stylesheet" href="style.css" >
</head>
<body>

    <div class="container">  
        <div class="row">
            <div class="col-xs-5 col-sm-4 col-md-4 col-lg-12">
                <div class="jumbotron">
                    <p class="lead" style="text-align:center;">Страница</p>
                </div>
                <div class="col-xs-5 col-sm-4 col-md-4 col-lg-2 PR">
                    <div class="col-xs-5 col-sm-4 col-md-4 col-lg-12">Активных пользователей:</div>
                    <hr style="border:1px solid black;margin-top:0px;margin-bottom:0px;">
                    <div class="col-xs-5 col-sm-4 col-md-4 col-lg-12 count"><? echo $echo; ?></div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Подключаем jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <!-- Подключаем Bootstrap JS -->    
    <script src="/bootstrap/js/bootstrap.min.js"></script>
</body>
</html>