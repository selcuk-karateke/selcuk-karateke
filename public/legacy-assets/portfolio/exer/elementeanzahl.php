<a href="index.php">Zurück</a><br>
Das Array "$_SERVER hat
<?php echo count($_SERVER); ?>
 Elemente.

<pre>
<?php
$a = []; 
$b = ["abc","xyz"]; // leeres Array anlegen
$b[] = "123"; // nächstes Arrayelement (also 3.) anlegen
$b[7] = "äöü";

var_dump($a, $b, count($b));

echo "\nFOREACH: \n";
foreach ($b as $k => $v) {
	echo "ARR AS VAR ($k) => VAR ($v)\n";
}

echo "\nFOR: ignoriert im ARR [7]\n";
for ($i = 0; $i < count($b); $i++) {
	echo "VAR ($i) entspricht ARR $b[$i]\n";
}
?>
</pre>