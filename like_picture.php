<?php
  require_once 'check_if_logged.php';
  if(!$userId = isLogged()) 
    exit;
  
  likePicture();

  function likePicture(){
    global $userId;

    $conn = mysqli_connect('localhost', 'root', '', 'hw1_1') or die("Error: " .mysqli_connect_error());
  
    $userId = mysqli_real_escape_string($conn, $userId);
    $pic_id = mysqli_real_escape_string($conn, $_POST['id']);
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $image = mysqli_real_escape_string($conn, $_POST['image']);

    $query = "SELECT * FROM likedpictures WHERE user_id = '".$userId."' AND picture_id = '".$pic_id."'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    if(mysqli_num_rows($res) > 0) {
        echo json_encode(array('ok' => true)); 
        exit;
    }
     
    $query = "INSERT INTO likedpictures(picture_id, user_id, picture) VALUES('$pic_id', '$userId', JSON_OBJECT('id', '$pic_id', 'title', '$title', 'image', '$image'))";
        if(mysqli_query($conn, $query) or die(mysqli_error($conn))) {
            echo json_encode(array('ok' => true));
            exit;
        }

        mysqli_close($conn);
        echo json_encode(array('ok' => false));
}
?>