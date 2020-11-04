<?php
$method = $_SERVER['REQUEST_METHOD'];
if($method === "GET") {
    ini_set('date.timezone', 'UTC');
    $date = array_key_exists('date', $_GET) ? $_GET['date'] : null;
    $time = array_key_exists('time', $_GET) ? $_GET['time'] : null;
    require "CNL.php";
    $cnl = new CNL();
    // Set the specific date
    if(!empty($date)) {
        $date = \DateTime::createFromFormat('d/m/Y', $date);
    } else {
        $date = $cnl->getCurrentDate();
    }
    // The specific time
    if(!empty($time)) {
        list($hour, $minutes) = explode(":", $time);
        $date->setTime($hour, $minutes, 0, 0);
    }

    $cnl->setCurrentDate($date);
    $nextDrawDate =  $cnl->calculateNextDrawDate()->format('d/m/Y H:i:s');
    echo $nextDrawDate;
}

exit();