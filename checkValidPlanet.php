<?php
    if (!isset($_GET["q"])) 
      exit;
  
    header('Content-Type: application/json');

    $resArray = array();

    if(strcmp($_GET["q"], "earth")    === 0 || strcmp($_GET["q"], "mars")   === 0 ||
       strcmp($_GET["q"], "jupiter")    === 0 || strcmp($_GET["q"], "saturn") === 0 ||
       strcmp($_GET["q"], "mercury") === 0 || strcmp($_GET["q"], "uranus")   === 0 ||
       strcmp($_GET["q"], "neptune")  === 0 || strcmp($_GET["q"], "venus")  === 0   )
       $resArray = array('valid' => true);
    else 
       $resArray = array('valid' => false);

    echo json_encode($resArray); 
?>

