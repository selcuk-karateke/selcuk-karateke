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
<h1>Kategorie</h1>
<div class="flexed">
<?php
	$kategorie = !empty($_POST["kategorie"]) ? $_POST["kategorie"] : "";
	$kategorien = new Kategorie();
	if ($kategorie != "") {
		$kategorien->kategorie = $kategorie;
		$kategorien->save();
	}
?>
<div class="flexitem">
<form action="" method="POST" enctype="multipart/form-data">
	<p><input name="kategorie" value="<?= $kategorie ?>" required /> <label>Kategorie</label></p>
	<p><input type="submit" value="Eintragen"/></p>
</form>	
</div>
<?php $sql = <<<EOT
SELECT *
FROM kategorien
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
</div>
</main>
<?php include "footer.php"; ?>
</body>
</html>