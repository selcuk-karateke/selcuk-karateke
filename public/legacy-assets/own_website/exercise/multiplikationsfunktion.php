<a href="index.php">Zurück</a><br>
<?php
function malnehmen($a, $b) {
	return $a *$b;
}
$p1 = (!empty($_GET["p1"])) ? $_GET["p1"]*1 : 0;
$p2 = (!empty($_GET["p2"]) )? $_GET["p2"]*1 : 0;
?>
<form action="">
	<p><input name="p1" value="<?= $p1 ?>"/></p>
	<p><input name="p2"value="<?= $p2 ?>"/></p>
	<p><input type="submit" value="Multipliziere!"/></p>
</form>

<h2>Ergebnis: <?= malnehmen($p1,$p2) ?></h2>