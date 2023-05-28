<?php
  require_once 'check_if_logged.php';
  if(!$userid = isLogged()){
    header("Location: login.php"); 
    exit;
  }
?>

<!DOCTYPE html> 
<html>
    <?php 
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Error: " .mysqli_connect_error());
        $userid = mysqli_real_escape_string($conn, $userid);
        $query = "SELECT * FROM users WHERE id = $userid";
        $res_1 = mysqli_query($conn, $query);
        $userinfo = mysqli_fetch_assoc($res_1);   
    ?>

	<head>
		<title><?php echo $userinfo['username']?> - Spacebook</title>
		<meta charset="utf-8">
		<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

        <link rel="icon" type="image/png" href="icon.png">
		<link rel="stylesheet" href="profile.css"/> 
		<script src="profile.js" defer="true"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
	</head>
	
	<body> 
        <header id="header">
            <nav> 
                <div id="logo">Spacebook</div>
                
			    <div id="links"> 
                    <a href='home.php'>Home</a>
                    <a href='apod.php'>APOD</a> 
                    <a href='mars_rover.php'>Mars Rover</a> 
					<div id="separator"></div>
                    <a href='logout.php' class='logout-button'>Logout</a>
                </div>

                <div id="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </nav>
        </header>

        <div class="userInfo">
            <div class="profile-pic"></div>
            <p><?php echo $userinfo['username']?></p>
            <div class="separator-line"></div>
            <div class="location"><img src="location.png"><span><?php echo strtolower($userinfo['pianeta'])?></span></div>
        </div>

        <div class="subtitle">Liked Pictures</div>

        <section id="album-view-container">
            <article id="album-view"></article>
        </section>

        <section id="modal-view-container">
            <section id="modal-view" class="hidden"></section>
        </section>

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