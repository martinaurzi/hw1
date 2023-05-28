<?php
require_once 'check_if_logged.php';
if(!isLogged()){
  header("Location: login.php"); 
  exit;
}

header('Content-Type: application/json');

mars_rover_photos();

function mars_rover_photos(){
    $query = urlencode($_GET["q"]); 
    $api_key = 'ijT8MKj6Ra2av7r3n3qT4aniStrMpZui9HGRYZjf';

    $url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'.$query.'/photos?sol=30&page=3&api_key='.$api_key;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url); 
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
    $res= curl_exec($curl);
    curl_close($curl);

    echo $res; 
}
?>