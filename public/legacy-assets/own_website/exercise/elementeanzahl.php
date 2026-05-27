Das Array "$_SERVER hat
<?php count($_SERVER) ?>
Elemente.

<pre>
<?php
$a = []; 
$b = ["abc","xyz"]; // leeres Array anlegen
$b[] = "123"; // nächstes Arrayelement (also 3.) anlegen
$b[7] = "äöü";
var_dump($a, $b, count($b));
echo "\n";
foreach ($b AS $k => $v) {
	echo "$k entspricht $v\n";
}
echo "\n";
for ($i = 0; $i < count(&b); $i++) {
	echo "$i entspricht $b[$i]\n";
}
?>
</pre>