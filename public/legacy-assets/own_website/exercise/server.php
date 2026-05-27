<h1>Serverinfo</h1>
<h2>
	Ihr PC hat die IP-Adresse: 
	<?php echo $_SERVER["REMOTE_ADDR"] ?>
</h2>

<pre>
<?php
var_dump($_SERVER);
?>
</pre>
<h1>Serverinfo (unsortiert)</h1>
<h2>
	Ihr PC hat die IP-Adresse: 
	<?php echo $_SERVER["REMOTE_ADDR"] ?>
</h2>

<table>
<?php foreach ($_SERVER AS $k => $v) { ?>
<tr>
	<td><?php echo $k ?></td>
	<td><?php echo $v ?></td>
</tr>
<?php } ?>
</table>

<h1>Serverinfo (sortiert)</h1>
<h2>
	Ihr PC hat die IP-Adresse: 
	<?php echo $_SERVER["REMOTE_ADDR"] ?>
</h2>

<table>
<?php $keys = array_keys($_SERVER);
asort($keys);
foreach ($keys AS $k) { ?>
<tr>
	<td><?= $k ?></td>
	<td><?= $_SERVER[$k] ?></td>
</tr>
<?php } ?>
</table>