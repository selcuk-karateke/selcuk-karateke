<a href="index.php">Zurück</a><br>
<form action="" method="POST" enctype="multipart/form-data">
<p> <input type="file" name="datei[]" accept="image/*"/> </p> <!-- oder ohne Array -->
<p> <input type="file" name="datei[]" accept="text/*"/> </p>
<p> <input type="submit" value="Hochladen"/> </p>
</form>
<pre>
<?php
if (!empty($_FILES)) {
	if ($_FILES["datei"]["error"][0] > 0 ||
		$_FILES["datei"]["error"][1] > 0) {
?>
<h1>Übertragungsfehler beim Dateihochladen!</h1>
<?php
	} else {
	move_uploaded_file($_FILES["datei"]["tmp_name"][0],
	$_FILES["datei"]["name"][0]);
	move_uploaded_file($_FILES["datei"]["tmp_name"][1],
	$_FILES["datei"]["name"][1]);
	}
}
var_dump($_FILES);
?>
</pre>