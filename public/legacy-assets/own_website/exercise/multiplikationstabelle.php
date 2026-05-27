<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>Büchererfassung</title>
		<style>
		table {
		border: 1px solid #ddd;
		}

		th, td {
			text-align: center;border: 1px solid #ddd;
			width: 50px;
			height: 50px;
		}

		tr.tbl:first-child {
			background-color: lightgrey;
			border: 1px solid;
		}
		td.tbl1:first-child {
			background-color: lightgrey;
		}
		tr.tbl:hover {
			background-color: lightgrey;
		}
		td.tbl1:hover {
			background-color: grey;
		}
.alert {
    padding: 20px;
	width: 250px;
    background-color: #f44336;
    color: white;
    opacity: 1;
    transition: opacity 0.6s;
    margin-bottom: 15px;
}
		tr:nth-child(even){background-color: #f2f2f2}
		</style>
	</head>
	<body>
		<a href="index.php">Zurück</a><br>
		<?php
		$p = 10;
		$p = (!empty($_GET["bis"])) ? abs($_GET["bis"]*1) : 10;
		if ($p > 30) {
			echo "Bitte, nicht mehr als 30!";
			$p = 30;
		}
			echo "<p class=\"alert\">
			Nicht erlaubt sind Buchstabe(n), 
			<br>Nichts mal nichts, 
			<br>Weniger als nix und Kommatapunkto!<p>";
		
		?>
		<form action="#" method="GET">
			<p><input name="bis" value="<?= $p ?>"/></p>
			<p><input type="submit" value="Lebe!"/></p>
		</form>

		<table>
			<?php for ($z = 0; $z < $p +1; $z++) { ?>
			<tr class="tbl">
			<?php for ($s = 0; $s < $p +1; $s++) { ?>
			<td class="tbl1"><?php 
				if ($z == 0 && $s == 0) {
					echo "*";
				} else if ($z == 0 && $s > 0) {
					echo $s;
				} else if ($s == 0 && $z > 0) {
					echo $z;
				} else {
					if ($z < 0){
						echo $z;
					} else {	
						echo $s * $z;
					}
				}
				?>
			</td>
			<?php } ?>
			</tr>
			<?php } ?>
		</table>
	</body>
</html>