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
echo "\n<h1>";
echo "Wohnort > Strasse: ".$p["wohnort"]["strasse"];
echo "\n</h1>";

$p2 = [];
$p2["vorname"] = "Hanna";
$p2["nachname"] = "Hurtig";
$p2["geburtsdatum"] = "1985-11-11";
$p2["wohnort"]["strasse"] = "Am Kai";
$p2["wohnort"]["hausnr"] = "12A";
$p2["wohnort"]["plz"] = "12345";
$p2["wohnort"]["ort"] = "Staaten";

var_dump($p2);
echo "\n<h1>";
echo "Wohnort > Strasse: ".$p2["wohnort"]["strasse"];
echo "\n</h1>";

$paar = ["mann"  => $p, "frau" => $p2];
echo "\n";
var_dump($paar);
echo "\n<h1>";
echo "Herr und Frau ".$paar["mann"]["nachname"]."/ ".$paar["frau"]["nachname"];
echo "\n</h1>";