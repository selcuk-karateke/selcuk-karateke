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

// Vorhandene Tabellen, falls vorhanden löschen/ leeren
$db->query("TRUNCATE TABLE IF EXISTS kategorien");
$db->query("TRUNCATE TABLE IF EXISTS ereignisse");
$db->query("TRUNCATE TABLE IF EXISTS bilder");
$db->query("DROP TABLE IF EXISTS kategorien");
$db->query("DROP TABLE IF EXISTS ereignisse");
$db->query("DROP TABLE IF EXISTS bilder");
// Vorhandene Tabellenbeziehungen, falls vorhanden löschen/ leeren
$db->query("TRUNCATE TABLE IF EXISTS kategorienliste");
$db->query("TRUNCATE TABLE IF EXISTS bildliste");
$db->query("DROP TABLE IF EXISTS kategorienliste");
$db->query("DROP TABLE IF EXISTS bildliste");

// Kategorien- Tabelle erzeugen
$sql = <<<EOT
CREATE TABLE kategorien (
	id INT UNSIGNED AUTO_INCREMENT,
	kategorie VARCHAR(15),
	PRIMARY KEY (id)
	);
EOT;
$db->query($sql);
// Ereignisse- Tabelle erzeugen
$sql = <<<EOT
CREATE TABLE ereignisse (
	id INT UNSIGNED AUTO_INCREMENT,
	datum DATE,
	zeit TIME,
	ort VARCHAR(50),
	kurztitel VARCHAR(15),
	beschreibung TEXT,
	PRIMARY KEY (id)
	);
EOT;
$db->query($sql);
// Bilder- Tabelle erzeugen
$sql = <<<EOT
CREATE TABLE bilder (
	id INT UNSIGNED AUTO_INCREMENT,
	dateiname VARCHAR(50),
	fotograf VARCHAR(50),
	PRIMARY KEY (id)
	);
EOT;
$db->query($sql);
// Kategorienliste- Tabelle erzeugen
$sql = <<<EOT
CREATE TABLE kategorienliste (
	kategorien_id INT UNSIGNED,
	ereignisse_id INT UNSIGNED,
	FOREIGN KEY (kategorien_id) REFERENCES kategorien(id),
	FOREIGN KEY (ereignisse_id) REFERENCES ereignisse(id),
	PRIMARY KEY (kategorien_id, ereignisse_id)
	);
EOT;
$db->query($sql);
// Bildliste- Tabelle erzeugen
$sql = <<<EOT
CREATE TABLE bildliste (
	bilder_id INT UNSIGNED,
	ereignisse_id INT UNSIGNED,
	FOREIGN KEY (bilder_id) REFERENCES bilder(id),
	FOREIGN KEY (ereignisse_id) REFERENCES ereignisse(id),
	PRIMARY KEY (bilder_id, ereignisse_id)
	);
EOT;
$db->query($sql);

// Kategorien- Tabelle mit Testdaten befüllen
$sql = <<<EOT
INSERT INTO kategorien (
	name)
	VALUES (:name)
EOT;
$stmt = $db->prepare($sql);
$stmt->execute([
	"name" => "Testname"
	]);
$db->query($sql);

// Ereignisse- Tabelle mit Testdaten befüllen
$sql = <<<EOT
INSERT INTO ereignisse (
	datum,
	zeit,
	ort,
	kurztitel,
	beschreibung)
	VALUES (:datum,:zeit,:ort,:kurztitel,:beschreibung)
EOT;
$stmt = $db->prepare($sql);
$stmt->execute([
	"datum" => "1912-12-12",
	"zeit" => "12:12",
	"ort" => "Testort",
	"kurztitel" => "Testkurztitel",
	"beschreibung" => "Testbeschreibung"
	]);
$db->query($sql);

// Bilder- Tabelle mit Testdaten befüllen
$sql = <<<EOT
INSERT INTO bilder (
	dateiname,
	fotograf)
	VALUES (:dateiname,:fotograf)
EOT;
$stmt = $db->prepare($sql);
$stmt->execute([
	"dateiname" => "Testdateiname",
	"fotograf" => "Testfotograf"
	]);
$db->query($sql);

?>