<?php
	function authenticate(){
		if(	$_SERVER['PHP_AUTH_USER'] !== 'admin' &&
			$_SERVER['PHP_AUTH_PW'] !== 'admin'){
			header('WWW-Authenticate: Basic realm=\'Kein Zugang ohne Passwort.\'');
			header('HTTP\ 1.0 401 Unauthorized');
?>
<h1>Serverinfo</h1>
<h2>
	Ihr PC hat die IP-Adresse: 
	<?php echo $_SERVER["REMOTE_ADDR"] ?>
</h2>
<p>Kein Zugriff!</p>

<h1>Unsortiert</h1>
<p>Kein Zugriff!</p>

<h1>Sortiert</h1>
<p>Kein Zugriff!</p>

<?php
		} else {
?>
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
<h1>Unsortiert</h1>

<table>
<?php foreach ($_SERVER AS $k => $v) { ?>
<tr>
	<td><?php echo $k ?></td>
	<td><?php echo $v ?></td>
</tr>
<?php } ?>
</table>

<h1>Sortiert</h1>

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
<?php
		}
	}
	authenticate();
?>