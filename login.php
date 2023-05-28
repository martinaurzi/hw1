<?php
  require_once 'check_if_logged.php';
  if(isLogged()){
    header("Location: home.php"); 
    exit;
  }
  
  if(!empty($_POST['username']) && !empty($_POST['password'])){
    
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Errore: " .mysqli_connect_error());
    
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    $query = "SELECT * FROM users WHERE username = '".$username."'";
    $res = mysqli_query($conn, $query) or die("Errore: " .mysqli_error($conn));

    if(mysqli_num_rows($res) > 0){
        $authenticated_user = mysqli_fetch_assoc($res);

        if (password_verify($_POST['password'], $authenticated_user['password'])){
            
            $_SESSION['username'] = $authenticated_user['username'];
            $_SESSION['id'] = $authenticated_user['id'];
            header("Location: home.php");
            mysqli_free_result($res);
            mysqli_close($conn);
            exit;
        } else $errore = "Incorrect password.";
    } else // utente non è trovato nel database
        $errore = "Incorrect username and/or password."; 

  }else if (isset($_POST["username"]) || isset($_POST["password"])) {
    $errore = "Enter username and password.";
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Login - Spacebook</title>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
        <link rel="icon" type="image/png" href="icon.png">
        <link rel='stylesheet' href='login.css'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
    </head>
    
    <body>
        <div id="logo">Spacebook</div>
        
        <section class="main">
        <form name='form_signIn' method='post'>
            <div class="username">
              <label>USERNAME <input type='text' name='username'
                               <?php if(isset($_POST["username"]))
                                      echo "value=".$_POST["username"];
                                ?>>
              </label>
            </div>

            <div class="password">
              <label>PASSWORD <input type='password' name='password'
                                <?php if(isset($_POST["password"]))
                                        echo "value=".$_POST["password"];
                                ?>>
              </label>
            </div>

            <div class="submit"><input type='submit' value="Login"></label></div>
        </form>
        
        <?php 
          if(isset($errore))
            echo "<p class='error'>$errore</p>";    
        ?>

        <div class="signUp">
            <p>Aren't you a member of the Solar System yet?</p>
            <a class="signUp-button" href="sign_up.php">Join</a>
        </div>
        </section>
    </body>
</html>