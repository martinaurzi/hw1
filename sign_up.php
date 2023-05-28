<?php
  require_once 'check_if_logged.php';
  if($userId = isLogged()){
    header("Location: home.php"); 
    exit;
  }

  if (!empty($_POST["username"]) && !empty($_POST["password"]) && 
      !empty($_POST["confirm_password"]) && !empty($_POST["planet"])){

        $errore = array();

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Error: " .mysqli_connect_error());

        // CONTROLLO DEI CAMPI

        # USERNAME
        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
            $error[] = "Invalid Username.";

        } else {
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            
            $query = "SELECT username FROM users WHERE username = '$username'";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $errore[] = "Username already exists.";
            }
        }

        # PASSWORD
        if (strlen($_POST["password"]) < 8) {
            $errore[] = "Not enough password characters.";
        } 

        # CONFERMA PASSWORD
        if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
            $errore[] = "Passwords do not match.";
        }

        # PIANETA
        if(strcmp(strtolower($_POST["planet"]), "earth") != 0 && strcmp(strtolower($_POST["planet"]), "mars") != 0 &&
           strcmp(strtolower($_POST["planet"]), "jupiter") != 0 && strcmp(strtolower($_POST["planet"]), "saturn") != 0 &&
           strcmp(strtolower($_POST["planet"]), "mercury") != 0 && strcmp(strtolower($_POST["planet"]), "uranus") != 0 &&
           strcmp(strtolower($_POST["planet"]), "neptune") != 0 && strcmp(strtolower($_POST["planet"]), "venus") != 0){
            $errore[] = "This planet isn't a part of the Solar System.";
        }

        # REGISTRAZIONE
        if (count($errore) == 0) {
            $pianeta = mysqli_real_escape_string($conn, $_POST['planet']);

            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);

            $query = "INSERT INTO users(username, password, pianeta) 
                      VALUES('$username', '$password', '$pianeta')";
            
            if (mysqli_query($conn, $query)) {
                $_SESSION["username"] = $_POST["username"];
                $_SESSION['id'] = mysqli_insert_id($conn);
                mysqli_close($conn);
                header("Location: home.php"); 
                exit;
            } else {
                $errore[] = "Error connecting to database.";
            }
        }
        mysqli_close($conn);
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Sign Up - Spacebook</title>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
        <link rel="icon" type="image/png" href="icon.png">

        <link rel='stylesheet' href='sign_up.css'/>
        <script src='signup.js' defer></script>
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
    </head>
    
    <body>
        <div id="logo">Spacebook</div>

        <section class="main">
            <form id="form_signUp" name="signup" method='post' enctype="multipart/form-data" autocomplete="off">
                
                <div class="username">
                   <label>USERNAME <input type='text' name='username'
                                    <?php if(isset($_POST["username"]))
                                            echo "value=".$_POST["username"];
                                    ?>>
                    </label>
                    <div class="error-msg"><img src="Red_X.svg.png"/><span>Unavailable username.</span></div>
                </div>
  
                <div class="password">
                    <label>PASSWORD <input type='password' name='password'
                                    <?php if(isset($_POST["password"]))
                                            echo "value=".$_POST["password"];
                                    ?>>
                    </label>
                    <div class="error-msg"><img src="Red_X.svg.png"/><span>Enter at least 8 characters.</span></div>
                </div>

                <div class="confirm_password">
                    <label>CONFIRM PASSWORD <input type='password' name='confirm_password'
                                              <?php if(isset($_POST["confirm_password"]))
                                                      echo "value=".$_POST["confirm_password"];
                                              ?>>
                    </label>
                    <div class="error-msg"><img src="Red_X.svg.png"/><span>Passwords do not match.</span></div>
                </div>

                <div class="planet">
                    <label>PLANET <input type='text' name='planet'
                                                    <?php if(isset($_POST["planet"]))
                                                            echo "value=".$_POST["planet"];
                                                    ?>>
                    </label>
                    <div class="error-msg"><img src="Red_X.svg.png"/><span>Enter a Solar Systems's planet</span></div>
                </div>

                <?php if(isset($errore)) {
                    foreach($errore as $err) {
                        echo "<div class='error'><img src='Red_X.svg.png'/><span>".$err."</span></div>";
                    }
                    }
                ?>
            
                <div class="submit"><input type='submit' value="Sign Up"></div>
            </form>

        <div class="signIn">
            <p>Are you a part of the Solar System?</p>
            <a class="signIn-button" href="login.php">Login</a>
        </div>
        </section>
    </body>
</html>