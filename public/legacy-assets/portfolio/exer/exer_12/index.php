<?php for ($b = 0; $b < 256; $b += 32) { ?>
	<div class="col">
		<table>
			<?php for ($g = 0; $g < 256; $g += 32) { ?>
			<tr>
			<?php for ($r = 0; $r < 256; $r += 32) { 
				$color = "$r,$g,$b"; ?>
				<td style="width:5em;height:5em;background-color:rgb(<?php echo $color ?>);"></td>
			<?php } ?>
			</tr>
			<?php } ?>
		</table>
		<figcaption>Blauanteil: <?php echo $b ?></figcaption>
	</div>
<?php } ?>