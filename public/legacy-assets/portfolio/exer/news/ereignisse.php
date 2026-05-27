<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>News</title>
<link rel="stylesheet" type="text/css" href="style/default.css"/>
<?php include "bind.php"; ?>
</head>
<body> 
<?php include "header.php"; ?>
<main>
<h1>Ereignisse</h1>
<div class="flexed">
<?php
	$ort = !empty($_POST["ort"]) ? htmlspecialchars($_POST["ort"]) : "";
	$kurztitel = !empty($_POST["kurztitel"]) ? htmlspecialchars($_POST["kurztitel"]) : "";
	$beschreibung = !empty($_POST["beschreibung"]) ? htmlspecialchars($_POST["beschreibung"]) : "";
	
	$fotograf = !empty($_POST["fotograf"]) ? htmlspecialchars($_POST["fotograf"]) : "";
	
	$ereignisse = new Ereignis();
	$bilder = new Bild();
	
	if ($ort != "" &&
		!empty($_FILES["bild"]) &&
		!empty($fotograf) &&
		$_FILES["bild"]["error"] == 0 &&
		$_FILES["bild"]["size"] > 0 &&
		substr($_FILES["bild"]["type"], 0, 6) == "image/" &&
		move_uploaded_file($_FILES["bild"]["tmp_name"], "pics/news/".$_FILES['bild']['name'])) {
	
		$ereignisse->datum = date("Y-m-d");
		$ereignisse->zeit = date("H:i:s");
		$ereignisse->ort = $ort;
		$ereignisse->kurztitel = $kurztitel;
		$ereignisse->beschreibung = $beschreibung;
		
		$bilder->dateiname = "pics/news/" . $bilder->id . $_FILES["bild"]["name"];
		$bilder->fotograf = $fotograf;
		
		$bilder->save();
		$ereignisse->save();
		}
		
?>
<div class="flexitem">
<form action="" method="POST" enctype="multipart/form-data">
	<p><input name="kurztitel" value="<?= $kurztitel ?>" required> <label>Kurztitel</label></p>
	<p><input name="ort" value="<?= $ort ?>" required> <label>Ort</label></p>
	<p><input type="textarea" name="beschreibung" value="<?= $beschreibung ?>" required> <label>Beschreibung</label></p>
	
	<p><input name="fotograf" required> <label>Fotograf</label></p>
	<p><input type="file" name="bild" accept="image/*"/></p>
	
	<p><input type="submit" value="Erstellen"/></p>
</form>
</div>
<?php
$sql = <<<EOT
SELECT *
FROM ereignisse
EOT;
$stmt = $db->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC); // ASSOC oder INDEX

if ($result == "") {
	$result = NULL; // Falls Tabelle leer
?>
<div class="flexitem">
<table>
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
<?php }
?>
</div>
</div>
</main>
<?php include "footer.php"; ?>
</body>
</html>