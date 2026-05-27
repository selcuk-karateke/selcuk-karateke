<head>
	<style type="text/css">
	body {
		font-family: monospace;
	}
	table {
		border-collapse: collapse;
	}
	</style>
</head>
<body>
<a href="index.php">Zurück</a>
<?php for ($b = 0; $b < 256; $b += 51) { ?>
<table>
<caption>Blauanteil: <?php echo $b ?></caption>
	<?php for ($g = 0; $g < 256; $g += 51) { ?>
	<tr>
	<?php for ($r = 0; $r < 256; $r += 51) { 
		$color = "$r,$g,$b"; ?>
	<td style="width:2em;height:2em;background-color:rgb(<?php echo $color ?>);"></td>
	<?php } ?>
	</tr>
	<?php } ?>
</table>
<?php } ?>
</body>