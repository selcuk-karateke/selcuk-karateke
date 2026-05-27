<?php
/*
echo "<pre>SERVER;\n";
var_dump($_SERVER);
echo "\nREQUEST:\n";
var_dump($_REQUEST);
*/
$speisen=[];

$speisen[1] = "Himbeereis";
$speisen[2] = "Wiener Schnitzel";
$speisen[3] = "Gulasch";
$speisen[4] = "Salatteller";
$speisen[5] = "Schaschlik";


if (isset($_POST["speise"])) {
?>
<h1>Sie haben die Speise "<?= $speisen[$_POST["speise"]] ?>" 
als Ihre Lieblingsspeise ausgewählt<h1>
<?php } 
require "auswahl.html";