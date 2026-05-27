<a href="index.php">Zurück</a><br>
<?php
if (!empty($_POST["vorname"])) {
	$_POST["vorname"] = htmlspecialchars($_POST["vorname"]);
} else {
	$_POST["vorname"] = "";
}
$_POST["nachname"] = !empty($_POST["nachname"]) ? htmlspecialchars($_POST["nachname"]) : "";
$_POST["email"] = !empty($_POST["email"]) ? htmlspecialchars($_POST["email"]) : "";
$_POST["gebtag"] = !empty($_POST["gebtag"]) ? htmlspecialchars($_POST["gebtag"]) : "";
var_dump(serialize($_POST));

if (file_exists("tmp.txt")) {
	$oldValues = unserialize(file_get_contents("tmp.txt"));
} else {
	file_put_contents("tmp.txt",serialize($_POST)); // write in text-file
}
if (empty($_POST["vorname"]) && 
	empty($_POST["nachname"]) && 
	empty($_POST["email"]) &&
	empty($_POST["gebtag"])){
	$_POST = $oldValues;
} else {
	file_put_contents("tmp.txt",serialize($_POST));
}
?>
<h1>Dein Nutzerprofil</h1>

<form action="" method="POST">
<p><input type="text" name="vorname" value="<?= $_POST["vorname"] ?>" /> Vorname </p>
<p><input type="text" name="nachname" value="<?= $_POST["nachname"] ?>" /> Nachname </p>
<p><input type="email" name="email" value="<?= $_POST["email"] ?>" /> E-Mail </p>
<p><input type="date" name="gebtag" value="<?= $_POST["gebtag"] ?>" /> Geburtstag </p>
<p><input type="submit" value="Speichern" /></p>
</form>