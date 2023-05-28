<?php
require_once 'check_if_logged.php';
if(!isLogged()){
  header("Location: login.php"); 
  exit;
}

header('Content-Type: application/json');

nasa_image_library();

function nasa_image_library(){
    $query = urlencode($_GET["q"]);

    $url = 'https://images-api.nasa.gov/search?q='.$query;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $res= curl_exec($curl);
    curl_close($curl);
    
    echo $res; 
}
?>