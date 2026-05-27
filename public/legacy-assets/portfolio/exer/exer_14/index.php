<?php
	function authenticate(){
		if(	$_SERVER['PHP_AUTH_USER'] !== 'admin' &&
			$_SERVER['PHP_AUTH_PW'] !== 'admin'){
			header('WWW-Authenticate: Basic realm=\'Kein Zugang ohne Passwort.\'');
			header('HTTP\ 1.0 401 Unauthorized');
?>
<h2>Output:</h2>
<p>Kein Zugriff!</p>
<?php
		} else {
			?>
<h2>Output:</h2>
			<?php
			phpinfo();
		}
	}
	authenticate();
?>