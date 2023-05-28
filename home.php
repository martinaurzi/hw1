<?php
  require_once 'check_if_logged.php';
  if(!isLogged()){
    header("Location: login.php"); 
    exit;
  }
?>

<!DOCTYPE html> 
<html>
	<head>
		<title>Home - Spacebook</title>
		<meta charset="utf-8">
		<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Castoro+Titling&family=PT+Sans&display=swap" rel="stylesheet">
        <link rel="icon" type="image/png" href="icon.png">
        <meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="stylesheet" href="home.css"/> 
		<script src="home.js" defer="true"></script> 
	</head>
	
	<body>
        <header id="header">
            <nav>
				<div id="logo">Spacebook</div> 
			    <div id="links"> 
                    <a href='apod.php'>APOD</a> 
                    <a href='mars_rover.php'>Mars Rover</a> 
					<div id="separator"></div>
                    <a id="profile" href='profile.php'></a> 
                    <a href='logout.php' class='logout-button'>Logout</a>
                </div>

                <div id="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </nav>
            <h1>Space Library</h1> 
        </header>

        <form id="form" name="form_cerca" method="post">
            <div class="input">
                <label><input type='text' name='cerca' class="search-bar" 
                       placeholder="Search for a space object"></label></div>
            <div class="submit"><input type='submit' value="submit"></div>
        </form>

		<article id="album-view"></article>

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