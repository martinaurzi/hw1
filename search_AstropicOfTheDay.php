<?php
require_once 'check_if_logged.php';
if(!isLogged()){
  header("Location: login.php"); 
  exit;
}

header('Content-Type: application/json');

astronomy_picture_of_the_day();

function astronomy_picture_of_the_day(){
    $query = urlencode($_GET["q"]); 
    $api_key = 'ijT8MKj6Ra2av7r3n3qT4aniStrMpZui9HGRYZjf';

    $url = 'https://api.nasa.gov/planetary/apod'.'?api_key='.$api_key.'&date='.$query;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url); 
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
    $res= curl_exec($curl);
    curl_close($curl);

    echo $res;
}
?>