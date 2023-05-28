<?php
    require_once 'check_if_logged.php';
    if(!$userid = isLogged())
      exit;
    
    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) 
            or die("Error: " .mysqli_connect_error());

    $userid = mysqli_real_escape_string($conn, $userid);

    $query = "SELECT picture_id, user_id, picture
              FROM likedpictures 
              WHERE user_id = $userid 
              LIMIT 30";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    $likedPicsArray = array();
    while($entry = mysqli_fetch_assoc($res)){ 
        // inserisco ogni risultato nell'array $likedPicsArray che conterrà le foto col like
        $likedPicsArray[] = array('userid' => $entry['user_id'],
                                  'pictureid' => $entry['picture_id'], 
                                  'picture' => json_decode($entry['picture'])); 
    }

    echo json_encode($likedPicsArray); 
    
    exit;
?>