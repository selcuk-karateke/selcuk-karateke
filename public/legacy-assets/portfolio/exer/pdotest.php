<style>
table {
border: 1px solid #ddd;
}

th, td {
    text-align: center;border: 1px solid #ddd;
    width: 100px;
    height: 50px;
}

tr:nth-child(even){background-color: #f2f2f2}
</style>
<a href="index.php">Zurück</a><br>
<?php 
require ".ht_dbdata";

$dsn = "mysql:dbhost=".DBHOST.";dbname=".DBNAME;
$db = null;

try {
	$db = new PDO($dsn, DBUSER, DBPASS);
	echo "<h2>Datenverbindung erfolgreich!</h2><br>";
	var_dump($db);
} catch (PDOException $e) {
	echo "<h2>Datenverbindung fehlgeschlagen!</h2><br>";
}

$sql = <<<EOT
CREATE TABLE buecher (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	titel VARCHAR(100),
	isbn VARCHAR(13) UNIQUE KEY,
	autor VARCHAR(50),
	verlag VARCHAR(100),
	ausgabejahr SMALLINT,
	auflage TINYINT UNSIGNED 
	)
EOT;
echo "<br>".$sql;

$db->query($sql);

$info = $db->errorInfo();
if (!empty($info[2])){
	echo "<h2>SQL-Abarbeitung:</h2>".
	"<p>".$info[2];
} else echo "<h2>SQL-Abarbeitung erfolgreich!</h2>".
	"<p>".$info[2];
// Achtung, ohne PREP Injection Gefahr!
$sql = <<<EOT
INSERT INTO buecher (
	titel,
	isbn,
	autor,
	verlag,
	ausgabejahr,
	auflage)
	VALUES (:titel,:isbn,:autor,:verlag,:ausgabejahr,:auflage)
EOT;
$stmt = $db->prepare($sql);
$stmt->execute([
	"titel" => "Ein Schatz im Silbersee",
	"isbn" => "9783625205050",
	"autor" => "Karl May",
	"verlag" => "Naumann & Göbel!",
	"ausgabejahr" => "1996",
	"auflage" => "0"
	]);
var_dump($stmt->errorInfo());

$sql = "SELECT * FROM buecher";
$stmt = $db->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC); // ASSOC oder INDEX
?>
<table border="1">
<caption>Bücherliste</caption>
	<tr>
<?php foreach($result[0] as $key => $value) { ?>
	<th><?= $key ?></th>
<?php } ?>
	</tr>
<?php foreach ($result as $row) { ?>
	<tr>
<?php foreach ($row as $key => $value) { ?>
	<td><?= $value ?></td>
<?php } ?>
	</tr>
<?php } ?>
</table>
<?php
echo "<pre>";
var_dump($result);
echo "</pre>";
?>
	
	
	
	
	
	
	
	
	
	
	
	