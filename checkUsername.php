<?php
    require_once 'db.php';

    // controlla se esiste già un utente con quel username
    if (!isset($_GET["q"])) 
      exit;
  
    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Error: " .mysqli_connect_error());

    $username = mysqli_real_escape_string($conn, $_GET["q"]); 

    $query = "SELECT username 
              FROM users
              WHERE username = '$username'";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    $resArray = array('exists' => mysqli_num_rows($res) > 0 ? true : false);
    
    echo json_encode($resArray); 

    mysqli_close($conn);
?>