<?php
  require_once 'check_if_logged.php';
  if(!$userid = isLogged()) 
    exit;
  
  removePicture();

  function removePicture(){
    global $userid;

    $conn = mysqli_connect('localhost', 'root', '', 'hw1_1') or die("Error: " .mysqli_connect_error());
  
    $userid = mysqli_real_escape_string($conn, $userid);
    $pic_id = mysqli_real_escape_string($conn, $_POST['id']);

    $query = "DELETE FROM likedpictures 
              WHERE user_id = '".$userid."' AND picture_id = '".$pic_id."'";

    if(mysqli_query($conn, $query) or die(mysqli_error($conn))) {
        echo json_encode(array('removed' => true,
                               'id' => $pic_id)); 
    } else
        echo json_encode(array('removed' => false));

    mysqli_close($conn);
    exit;
  }
?>