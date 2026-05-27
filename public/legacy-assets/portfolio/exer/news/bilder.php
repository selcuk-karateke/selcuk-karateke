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
<h1>Bilder</h1>
<div class="flexed">
<?php	
	echo "<pre>";
	$kategorie = !empty($_POST["kategorie"]) ? $_POST["kategorie"] : "";
	$ereignis = !empty($_POST["ereignis"]) ? $_POST["ereignis"] : "";
	$kurztitel = !empty($_POST["kurztitel"]) ? $_POST["kurztitel"] : "";
	$fotograf = !empty($_POST["fotograf"]) ? htmlspecialchars($_POST["fotograf"]) : "";

	$kategorien = new Kategorie();
	$bilder = new Bild();
	$ereignisse = new Ereignis();
	$bildlisten = new Bildliste();
	$kategorielisten = new Kategorieliste();

	if (!empty($_FILES["bild"]) &&
		$_FILES["bild"]["error"] == 0 &&
		$_FILES["bild"]["size"] > 0 &&
		substr($_FILES["bild"]["type"], 0, 6) == "image/" &&
		move_uploaded_file($_FILES["bild"]["tmp_name"], "pics/article/" . $_FILES['bild']['name'])) {
			
			$bilder->dateiname = "pics/article/" . $_FILES["bild"]["name"];
			$bilder->fotograf = $fotograf;
			
			$bilder->save();
			
			$bildlisten->bilder_id = $bilder->id;
			$bildlisten->ereignisse_id = $ereignis;
			$bildlisten->save();
			
			$kategorielisten->kategorien_id = $kategorie;
			$kategorielisten->ereignisse_id = $ereignis;
			$kategorielisten->save();
		}
		echo "</pre>";
		//header("location: newdb.php");	
	$sql = <<<EOT
SELECT *
FROM kategorien
EOT;
	$stmt = $db->query($sql);
	$resultKat = $stmt->fetchAll(PDO::FETCH_ASSOC); // ASSOC oder INDEX	
	
	$sql = <<<EOT
SELECT *
FROM ereignisse
EOT;
	$stmt = $db->query($sql);
	$resultEre = $stmt->fetchAll(PDO::FETCH_ASSOC); // ASSOC oder INDEX
?>


<div class="flexitem">
<form action="" method="POST" enctype="multipart/form-data">
	<p><label>Fotograf</label></p>
	<p><input name="fotograf" required></p>
	
	<p><label>Kategorie auswählen</label></p>
	<select name="kategorie" required>
		<option value="" selected="selected">--- Ihre Auswahl ---</option>
		<?php foreach ($resultKat as $key => $value) { ?>
		<option value="<?= $value['id']; ?>"><?= $value['kategorie']; ?></option>
		<?php } ?>
	</select>
	
	<p><label>Ereignis auswählen</label></p>
	<select name="ereignis" required>
		<option value="" selected="selected">--- Ihre Auswahl ---</option>
		<?php foreach ($resultEre as $key => $value) { ?>
		<option value="<?= $value['id']; ?>"><?= $value['kurztitel']; ?></option>
		<?php } ?>
	</select>
	
	<p><input type="file" name="bild" accept="image/*"/></p>
	<p><input type="submit" value="Hochladen"/></p>
</form>
</div>
<?php
$sql = <<<EOT
SELECT *
FROM bilder
EOT;
$stmt = $db->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC); // ASSOC oder INDEX
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
</div>
<div class="pictures">
<?php
foreach($result as $key => $value){
	$bildinfo = getimagesize($value['dateiname']);
	$breite = $bildinfo[0];
	$hoehe = $bildinfo[1];
	if ($breite <= 200 && $hoehe <= 200){
		$imagesize = $bildinfo[3];
	}
	else if ($breite <= $hoehe){
		$imagesize = 'height="200"';
	} else {
		$imagesize = 'width="200"';
	}
	
?>
<div class="flexitem">
<figure>
	<div>
		<img src="<?= $value['dateiname'] ?>" <?= $imagesize ?>/>
	</div>
	<figcaption><?= $value['id'] ?></figcaption>
	<dl>
		<dt>Fotografiert von:</dt>
		<dd><?= $value['fotograf'] ?></dd>
	</dl>
</figure>
<?php } ?>
</div>
</div>
</div>
</main>
<?php include "footer.php"; ?>
</body>
</html>