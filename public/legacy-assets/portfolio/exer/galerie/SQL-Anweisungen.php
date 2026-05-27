<a href="../index.php">Zurück</a><br>
<?php
require ".ht_dbdata";

echo "CONNECTED SERVER IP: ".$_SERVER["REMOTE_ADDR"]."<br/>";
if ($_SERVER["REMOTE_ADDR"] != "::1" && $_SERVER["REMOTE_ADDR"] != "172.27.56.17") {
	header("Unerlaubter Zugriff", true, 403);
	die("Unerlaubter Zugriff");
}
echo "CREATE DATABASE: ";
$db = null;
try {
	$dsn = "mysql:dbhost=".DBHOST;
	$db = new PDO($dsn, DBUSER, DBPASS);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // set the PDO error mode to exception
	$sql = "CREATE DATABASE IF NOT EXISTS ".DBNAME;
	$db->exec($sql); // use exec() because no results are returned
	echo "Datenbank '".DBNAME."' wurde erstellt.<br>";
} catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}
echo "CONNECT TO DATABASE: ";
$db = null;
try {
	$dsn = "mysql:dbhost=".DBHOST.";dbname=".DBNAME;
	$db = new PDO($dsn, DBUSER, DBPASS);
	echo "Datenverbindung erfolgreich!<br/>";
} catch (PDOException $e) {
	echo "Datenverbindung fehlgeschlagen!<br/>";
	echo $e->getMessage()."<br/>";
}
echo "DATABASES:<br/>";
$result = $db->query("SHOW DATABASES");
while ($databases = $result->fetch(PDO::FETCH_NUM)) {
echo $databases[0]."<br/>";
}
echo "USERS:<br/>";
$result = $db->query("SELECT host, user, password FROM mysql.user");
while ($users = $result->fetch(PDO::FETCH_NUM)) {
echo $users[0]." - ".$users[1]." - ".$users[2]."<br/>";
}

$db->query("DROP TABLE IF EXISTS bewertungen");
$db->query("DROP TABLE IF EXISTS bilder");
$db->query("DROP TABLE IF EXISTS besucher");

$db->query("TRUNCATE TABLE IF EXISTS bewertungen");
$db->query("TRUNCATE TABLE IF EXISTS bilder");
$db->query("TRUNCATE TABLE IF EXISTS besucher");

// Besucher- Tabelle hinzufügen
$sql = <<<EOT
CREATE TABLE besucher (
	id INT UNSIGNED AUTO_INCREMENT,
	ip VARCHAR(15) UNIQUE KEY,
	zeit TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
	);
EOT;
$db->query($sql);
// var_dump($db->errorInfo());

// Bilder- Tabelle hinzufügen
$sql = <<<EOT
CREATE TABLE bilder (
	id INT UNSIGNED AUTO_INCREMENT,
	besucher_id INT UNSIGNED UNIQUE KEY,
	name VARCHAR(255),
	zeit TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	titel VARCHAR(15),
	PRIMARY KEY (id),
    FOREIGN KEY (besucher_id) REFERENCES besucher(id)
	);
EOT;
$db->query($sql);
// var_dump($db->errorInfo());

// Bewertungen- Tabelle hinzufügen
$sql = <<<EOT
CREATE TABLE bewertungen (
	id INT UNSIGNED AUTO_INCREMENT,
	bilder_id INT UNSIGNED,
	besucher_id INT UNSIGNED,
	zeit TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	wert TINYINT,
	PRIMARY KEY (id),
	FOREIGN KEY (bilder_id) REFERENCES bilder(id),
	FOREIGN KEY (besucher_id) REFERENCES besucher(id),
	UNIQUE KEY (bilder_id,besucher_id)
	);
EOT;
$db->query($sql);
// var_dump($db->errorInfo());
//
// Besucher- Tabelle mit Testdaten befüllen
$sql = <<<EOT
INSERT INTO besucher (
	ip,
	zeit)
	VALUES (:ip,:zeit)
EOT;
$stmt = $db->prepare($sql);
$stmt->execute([
	"ip" => "192.168.1.25",
	"zeit" => "12.12.1990"
	]);
$db->query($sql);


// Bilder- Tabelle mit Testdaten befüllen
$sql = <<<EOT
INSERT INTO bilder (
	zeit,
	titel)
	VALUES (:zeit,:titel)
EOT;
$stmt = $db->prepare($sql);
$stmt->execute([
	"zeit" => "12.12.1990",
	"titel" => "Gurke.jpg"
	]);
$db->query($sql);

// Bewertungen- Tabelle mit Testdaten befüllen
$sql = <<<EOT
INSERT INTO bewertungen (
	zeit,
	wert)
	VALUES (:zeit,:wert)
EOT;
$stmt = $db->prepare($sql);
$stmt->execute([
	"zeit" => "12.12.1990",
	"wert" => "2"
	]);

$info = $db->errorInfo();
if (!empty($info[2])){
	echo "<h2>SQL-Abarbeitung:</h2>".
	"<p>".$info[2];
} else echo "<h2>SQL-Abarbeitung erfolgreich!</h2>".
	"<p>".$info[2];
echo "<br>".$sql;
//*/

$sql = <<<EOT
SELECT bilder.*,ROUND(IF(wert IS NULL, 0, AVG(wert)),1) 
AS "avg" 
FROM bilder 
LEFT JOIN bewertungen 
ON bilder.id = bilder_id
GROUP BY bilder.id
ORDER BY avg
EOT;
$stmt = $db->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC); // ASSOC oder INDEX
?>
<table border="1">
<caption>Liste</caption>
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

/*
ID INTEGER
IP- Adresse INT(12) oder nur VARCHAR(15)
Pfadangabe VARCHAR(255) oder nur VARCHAR(50)
Titel VARCHAR(15)
Vorname VARCHAR(30)
Adelszusatz VARCHAR(15) – Trennung ist wegen der alphabetischen Sortierung sinnvoll
Name VARCHAR(30)
Adresszusatz VARCHAR(30)
Strasse VARCHAR(24)
Hausnr INTEGER (oder SMALLINT)
HausnrZusatz VARCHAR(10) – Trennung ist wegen der numerischen Sortierung sinnvoll
Länderkennung CHAR(2) – nach ISO 3166, auch CHAR(3) möglich, INTEGER oder SMALLINT denkbar; der Ländername ist auf jeden Fall unpraktisch
PLZ CHAR(10) oder VARCHAR(10) – international sind bis zu 10 Zeichen möglich
Geburtsdatum DATE

Buchungsjahr INTEGER oder SMALLINT
Buchungsnummer INTEGER
Buchungstermin TIMESTAMP – je nach Arbeitsweise genügt auch DATE
Betrag NUMERIC oder DECIMAL
Vorgang VARCHAR(50) – als Beschreibung der Buchung
Bearbeiter VARCHAR(30) – derjenige, der den Kassenbestand ändert
Nutzer VARCHAR(30) – derjenige, der die Buchung registriert
Buchhaltung TIMESTAMP – Termin, zu dem die Buchung registriert wird

*/