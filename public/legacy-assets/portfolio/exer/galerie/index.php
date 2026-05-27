<!DOCTYPE html>
<head>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="style/default.css" />
</head>
<body>
<a href="../index.php">Zurück</a><br>
<?php

function my_autoloader($class) { // Alle vorhandenen Klassen einbinden
    include 'class/' . strtolower($class) . '.class.php';
}

spl_autoload_register('my_autoloader');

require_once ".ht_dbdata"; // Zugangsdaten für die DB

$dsn = "mysql:dbhost=" . DBHOST . ";dbname=" . DBNAME; // Baue String für PDO
$db = new PDO($dsn, DBUSER, DBPASS); // Erstelle ein neues PDO- Objekt
Entity::setDB($db); // Gebe der Klasse Entity das PDO- Objekt

$besucher = new Besucher();
//$ip = random_int(1, 255).".".random_int(1, 255).".".random_int(1, 255).".".random_int(1, 255);
$ip = $_SERVER["REMOTE_ADDR"];
if (empty($besucher->findBy("ip", $ip))) {
    $besucher->ip = $ip;
    $besucher->save();
} else {
    $besucher = $besucher->findBy("ip", $ip)[0];
}
?>
<div class="grid-container">
    <div class="item1">
<?php include "galerie.head.php" ?>
    </div>
    <div class="item2">
<a href="#">Gallery</a><br>
        <?php
        $bilder = new Bild();
        // Bewertungsdaten entgegenehmen
        if (!empty($_POST["bewertung"]) &&
                !empty($_POST["id"]) &&
                !empty($bilder->getbyId($_POST["id"])) &&
                empty((new Bewertung())->findBy([
                            "bilder_id" => $_POST["id"],
                            "besucher_id" => $besucher->id])) 
        ) {
            $bewertung = new Bewertung();
            $bewertung->bilder_id = $_POST["id"] * 1;
            $bewertung->besucher_id = $besucher->id;
            $bewertung->wert = $_POST["bewertung"];
            $bewertung->save();
        }

        // Bildupload entgegenehmen
        if (count($bilder->findBy("besucher_id", $besucher->id)) == 0 &&
                !empty($_FILES["bild"]) &&
                !empty($_POST["titel"]) &&
                $_FILES["bild"]["error"] == 0 &&
                $_FILES["bild"]["size"] > 0 &&
                substr($_FILES["bild"]["type"], 0, 6) == "image/" &&
                move_uploaded_file($_FILES["bild"]["tmp_name"], "pics/b" . $besucher->id . "_" . strrchr($_FILES["bild"]["name"], "."))) {
            $bilder->besucher_id = $besucher->id;
            $bilder->name = "pics/b" . $besucher->id . "_" . strrchr($_FILES["bild"]["name"], ".");
            $bilder->titel = !empty($_POST["titel"]) ? htmlspecialchars($_POST["titel"]) : "Ohne Titel";
            $bilder->save();
            header("location: index.php");
        }
        if (count($bilder->getAll()) == 0) {
            ?>
            <article class="nopics">Keine Bilder vorhanden</article>
            <?php
        } else {
            include "galerie.php";
        }
        ?>
    </div>
    <div class="item3">
		
        <a href="#">Upload</a><br>
        <?php
        if (empty($bilder->findBy("besucher_id", $besucher->id))) {
            include "upload.php";
        } else {
            ?>
            <article class="nopics">Sie haben bereits ein Bild hochgeladen</article>
    <?php
}
?>
    </div>
    <div class="item4">
<?php $sql = <<<EOT
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
    </div>
    <div class="item5">
<?php include "galerie.foot.php" ?>
    </div>
</div>
</body>
</html>