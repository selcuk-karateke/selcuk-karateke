<a href="index.php">Zurück</a><br>
<pre>
<?php // assoziatives Array anlegen
$p = [
	"vorname" => "Max",
	"nachname" => "Mustermann",
	"wohnort" => [
		"strasse" => "Berliner Str.",
		"hausnr" => "13",
		"plz" => "10117",
		"ort" => "Berlin",
		],
	"geburtsdatum" => "1980-10-25"	
	];
	
var_dump($p);
echo "\n";
echo $p["wohnort"]["strasse"];
echo "\n";

$p2 = [];
$p2["vorname"] = "Hanna";
$p2["nachname"] = "Hurtig";
$p2["geburtsdatum"] = "1985-11-11";
$p2["wohnort"]["strasse"] = "Am Kai";
$p2["wohnort"]["hausnr"] = "12A";
$p2["wohnort"]["plz"] = "12345";
$p2["wohnort"]["ort"] = "Staaten";

echo "\n";
var_dump($p2);
echo "\n";
echo $p2["wohnort"]["strasse"];
echo "\n";

$paar = ["mann"  => $p, "frau" => $p2];
echo "\n";
var_dump($paar);