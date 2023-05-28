<?php
  require_once 'check_if_logged.php';
  if(isLogged()){
    header("Location: home.php"); 
    exit;
  }
?>

<!DOCTYPE html> 
<html>
	<head>
		<title>Spacebook</title>
		<meta charset="utf-8">
		<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Castoro+Titling&family=PT+Sans&display=swap" rel="stylesheet">
        <link rel="icon" type="image/png" href="icon.png">
        <meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="stylesheet" href="home.css"/>
        <link rel="stylesheet" href="index.css"/>
        <script src="index.js" defer="true"></script> 
	</head>
	
	<body>
        <header id="headerIndex">
            <nav>
				<div id="logo">Spacebook</div> 
			    <div id="links"> 
                    <a href='home.php'>Home</a> 
                    <a href='apod.php'>APOD</a> 
                    <a href='mars_rover.php'>Mars Rover</a> 
					<div id="separator"></div>
                    <a href='login.php' class='loginButton'>Login</a>
                    <a href='sign_up.php' class='signUpButton'>Sign Up</a>
                </div>

                <div id="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </nav>

            <h1>Explore the secrets of the Universe</h1> 
            <p>Through Spacebook you can travel to distant galaxies and look through the eyes of mars rovers</p>
        </header>

        <footer>
           <div class="footer-container">
               <div class="footer-item">
                  <strong id="logo-footer">Spacebook</strong>
               </div>

               <div class="footer-item">
                  <strong>DESIGNED BY</strong>
                  <p>Martina Urzì</p>
                  <p>1000006757</p>
                </div>

               <div class="footer-item">
                  <strong>CONTENTS</strong>
                  <p>NASA's official images</p>
                  <p>Astronomy picture of the day</p>
                  <p>Mars Rovers photos</p>
               </div>
           </div>
        </footer>
	</body>
</html>