<a href="index.php">Zurück</a><br>

<?php
	function __autoload($name) {
		require_once("/classes/".strtolower($name).".class.php");
	}
?>
<?php
	$vorname = !empty($_POST["vorname"]) ? htmlspecialchars($_POST["vorname"]) : "";
	$nachname = !empty($_POST["nachname"]) ? htmlspecialchars($_POST["nachname"]) : "";
	$strasse = !empty($_POST["strasse"]) ? htmlspecialchars($_POST["strasse"]) : "";
	$hausnr = !empty($_POST["hausnr"]) ? htmlspecialchars($_POST["hausnr"]) : "";
	$plz = !empty($_POST["plz"]) ? htmlspecialchars($_POST["plz"]) : "";
	$ort = !empty($_POST["ort"]) ? htmlspecialchars($_POST["ort"]) : "";
	$geburtsdatum = !empty($_POST["geburtsdatum"]) ? htmlspecialchars($_POST["geburtsdatum"]) : "";
	
	$person = new Person($vorname, $nachname, $geburtsdatum); // Nachdem ...
	$wohnort = new Wohnort($strasse, $hausnr, $plz, $ort);
	//var_dump($p); // ohne Wohnort
	$person->setWohnort($wohnort);
	//var_dump($person); // mit Wohnort
	//var_dump($person->__toString());
?>

<form action="" method="POST">
	<h1>Personendaten:</h1>
	<p><input type="text" name="vorname" value="<?= $vorname ?>"/> Vorname</p>
	<p><input type="text" name="nachname" value="<?= $nachname ?>"/> Nachname</p>
	<p><input type="date" name="geburtsdatum" value="<?= $geburtsdatum ?>"/> Geburtsdatum</p>
	<h1>Wohndaten:</h1>
	<p><input type="text" name="strasse" value="<?= $strasse ?>"/> Strasse</p>
	<p><input type="text" name="hausnr" value="<?= $hausnr ?>"/> Hausnr.</p>
	<p><input type="text" name="plz" value="<?= $plz ?>"/> PLZ</p>
	<p><input type="text" name="ort" value="<?= $ort ?>"/> Ort</p>
	<p><input type="submit" value="Daten senden"/></p>
</form>

<h1>Folgende Daten wurden entgegengenommen:</h1>
<p>Vorname: <?= $person->getVorname() /* = steht für echo */?></p> 
<p>Nachname: <?= $person->getNachame() ?></p>
<p>Geburtsdatum: <?= $person->getGeburtsdatum() ?></p>
<p>Strasse: <?= $person->getGeburtsdatum() ?></p>
<p>Strasse: <?= $person->getWohnort()->getStrasse() ?></p>
<p>Hausnr: <?= $person->getWohnort()->getHausnr() ?></p>
<p>PLZ: <?= $person->getWohnort()->getPLZ() ?></p>
<p>Ort: <?= $person->getWohnort()->getOrt() ?></p>