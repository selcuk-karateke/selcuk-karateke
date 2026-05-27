<div class="row">
	<div class="col">
		<h2>Output:</h2>
<?php
// Nach Inhalt prüfen und Sonderzeichen in HTML-Codes umwandeln
if (!empty($_POST['vorname'])) {
	$_POST['vorname'] = htmlspecialchars($_POST['vorname']);
} else {
	$_POST['vorname'] = '';
}

$_POST['nachname'] = !empty($_POST['nachname']) ? htmlspecialchars($_POST['nachname']) : '';
$_POST['email'] = !empty($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$_POST['gebtag'] = !empty($_POST['gebtag']) ? htmlspecialchars($_POST['gebtag']) : '';

// Datei vorhanden?
if (file_exists(SITE_ROOT.'/exer/exer8/tmp.txt')) {
	$oldValues = unserialize(file_get_contents(SITE_ROOT.'/exer/exer8/tmp.txt'));
} else {
	file_put_contents(SITE_ROOT.'/exer/exer8/tmp.txt',serialize($_POST)); // Datei überschreiben
}

if (empty($_POST['vorname']) && 
	empty($_POST['nachname']) && 
	empty($_POST['email']) &&
	empty($_POST['gebtag'])){
	$_POST = $oldValues;
} else {
	file_put_contents(SITE_ROOT.'/exer/exer8/tmp.txt',serialize($_POST)); // Datei erzeugen und überschreiben
}

// Wert lesbar anzeigen
echo '<pre>';

var_dump(serialize($_POST));

$section = file_get_contents(SITE_ROOT.'/exer/exer8/tmp.txt', FALSE, NULL, 20, 14);
var_dump($section);
echo '</pre>';

?>
		<h2>Input:</h2>
		<form action="" method="POST">
			<label for="vorname">Vorname </label>
			<input class="form-control" type="text" name="vorname" value="<?= $_POST["vorname"] ?>" /> 
			<label for="vorname">Nachname </label>
			<input class="form-control" type="text" name="nachname" value="<?= $_POST["nachname"] ?>" />
			<label for="vorname">E-Mail  </label>
			<input class="form-control" type="email" name="email" value="<?= $_POST["email"] ?>" />
			<label for="vorname">Geburtstag </label>
			<input class="form-control" type="date" name="gebtag" value="<?= $_POST["gebtag"] ?>" />
			<input class="btn btn-primary" type="submit" value="Speichern" />
		</form>
	</div>
</div>