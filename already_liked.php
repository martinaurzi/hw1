<?php
  require_once 'check_if_logged.php';
  if(!$userid = isLogged()) 
    exit;
  
  returnAlreadyLiked();

  function returnAlreadyLiked(){
    global $userid;

    $conn = mysqli_connect('localhost', 'root', '', 'hw1_1') or die("Errore: " .mysqli_connect_error());

    $query = "SELECT picture_id
              FROM likedpictures 
              WHERE user_id = $userid";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    $alreadyLikedPicsArray = array();
    while($entry = mysqli_fetch_assoc($res)){ 
        $alreadyLikedPicsArray[] = array('pictureid' => $entry['picture_id']); 
    }

    echo json_encode($alreadyLikedPicsArray); 
  }
?>