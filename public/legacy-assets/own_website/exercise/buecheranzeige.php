<?php 
require ".ht_dbdata";

// Datenbankverbindung aufbauen
$dsn = "mysql:dbhost=".DBHOST.";dbname=".DBNAME;
$db = null;

try {
	$db = new PDO($dsn, DBUSER, DBPASS);
	echo "<h2>Data connection successful!</h2><br>";
} catch (PDOException $e) {
	echo "<h2>Data connection failed!</h2><br>";
}
// Daten aus _POST-Array in Tabelle buecher einfügen.
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
$stmt->execute($_POST);

$sql = "SELECT * FROM buecher";
$stmt = $db->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>Büchererfassung</title>
		<style type="text/css">
		table { border: 1px solid #ddd; }
		th, td { text-align: center; border: 1px solid #ddd;
			width: 100px; height: 50px; }
		tr:nth-child(even){ background-color: #f2f2f2 }
		</style>
	</head>
	<body>
	<a href="index.php">Zurück</a><br>
	<a href="buechererfassung.php">Neues Buch anlegen</a><br>
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
	<a href="buechererfassung.php">Neues Buch anlegen</a><br>
	</body>
</html>