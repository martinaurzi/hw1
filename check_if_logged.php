<?php
  require_once 'db.php';
  
  session_start();
  
  function isLogged(){
    if(isset($_SESSION['id']))
        return $_SESSION['id'];
    else 
        return 0;
  }
?>