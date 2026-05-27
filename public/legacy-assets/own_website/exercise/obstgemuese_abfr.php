<?php ?>
<head>

</head>
<body>
<a href="obstgemuese.php">Zurück</a>
<br>
<h1>Du magst folgendes Gemüse:</h1>

<?php if (!empty($_POST["gemuese"])) { ?>
<table>
<?php foreach ($_POST["gemuese"] AS $g) { ?>
<tr>
	<td><img src="<?php echo $g ?>.jpg" alt="<?php echo $g ?>" width="100" height="100"></td>
</tr>
<?php } ?>
</table>
<?php } ?>

<h1>Du magst folgendes Obst:</h1>

<?php if (!empty($_POST["obst"])) { ?>
<table>
<?php foreach ($_POST["obst"] AS $o) { ?>
<tr>
	<td><img src="<?php echo $o ?>.jpg" alt="<?php echo $o ?>" width="100" height="100"></td>
</tr>
<?php } ?>
</table>
<?php } ?>

</body>