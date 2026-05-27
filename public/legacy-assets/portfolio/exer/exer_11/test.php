<html>
<body>

Welcome <?php echo $_POST["name"]; ?><br>
Your email address is: <?php echo $_POST["email"]; ?>


<?php
$db_server = "localhost";
$db_port = "3306";
$db_username = "skarateke";
$db_password = "";
$db_database = "dbtest";

$options = array(
	PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_PERSISTENT => true,
	PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
	);	
try{//Instanz von PDO (Datenbankverbindung aufbauen)
	$db = new PDO("mysql:host=".$db_server.";port=".$db_port.";dbname=".$db_database, $db_username, $db_password, $options);
	//UTF für Querys
	$db->query("SET NAMES utf8");
}catch(PDOException $err){
	echo "Fehler aufgetreten: ";
	echo $err->getMessage();
}

$pid = explode('=',$argv[1]);
$prodid = explode('=',$argv[2]);
$prodende = explode('=',$argv[3]);

$tit = "Produktionsende: (Projekt ". $pid[1] .")";
$msg = "Produktionsende (". $prodende[1] .") für das Produkt mit der ID ".$prodid[1]." ist erreicht. Etwas tun, jetzt!";


$sql = "INSERT INTO `notifications` (`user_id`,`date`,`subject`,`message`) VALUES('1',NOW(),'". $tit ."','". $msg ."')";

$result = $db->query($sql);

?>

</body>
</html>