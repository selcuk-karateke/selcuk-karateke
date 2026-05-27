<?php
	// Alle vorhandenen Klassen einbinden
	function autoloader($class) {
		include "class/".strtolower($class).".class.php";
	}
	spl_autoload_register("autoloader");
	// DB- Zugangsdaten einbinden
	require_once ".ht_dbdata";
	// DB Verbindung aufbauen
	$dsn = "mysql:dbhost=" . DBHOST . ";dbname=" . DBNAME; // Baue String für PDO
	$db = new PDO($dsn, DBUSER, DBPASS); // Erstelle ein neues PDO- Objekt
	Entity::setDB($db); // Gebe der Klasse Entity das PDO- Objekt
?>