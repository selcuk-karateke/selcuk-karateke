<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>Büchererfassung</title>
		<style type="text/css">
		form{display:table;margin:auto;}
		p{display:flex;flex-direction:row-reverse;}
		input[required] + label:after {content:"*"}
		input:not([required]) + label:after {content:"\00a0\00a0"}
		label{margin-right: .5em}
		</style>
	</head>
	<body>
		<a href="index.php">Zurück</a><br>

		<form action="buecheranzeige.php" method="POST">
			<p><input name="titel" required> <label>Buchtitel</label></p>
			<p><input name="autor"> <label>Buchautor</label></p>
			<p><input type="number" name="isbn" required> <label>ISBN</label></p>
			<p><input name="verlag"> <label>Verlag</label></p>
			<p><input name="ausgabejahr"> <label>Ausgabejahr</label></p>
			<p><input name="auflage"> <label>Auflage</label></p>
			<p><input type="submit" value="Speichern" /></p>
		</form>
	</body>
</html>