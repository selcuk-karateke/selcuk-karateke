		<link rel="stylesheet" href="exer/exer9/css/multiplikation.css.php" type="text/css"/>
<div class="row">
	<div class="col">
		<h2>Input:</h2>
			<?php
			$p = (!empty($_POST["bis"])) ? $_POST["bis"] : 0;
			if ($p > 30) {
				echo "Bitte, nicht mehr als 30!";
				$p = 30;
			} else if (strpos($p, ".") || strpos($p, ",") == true) {
				echo "Bitte, nur gerade Zahlen eingeben!";
			} else if (!is_numeric($p)) {
				echo "Bitte, nur Zahlen eingeben!";
			} else if ($p == 0) {
				echo "Bitte eine Zahl zwischen 1-30 eingeben!";
			} else if ($p < 0) {
				echo "Bitte, keine negativen Zahlen!";
			} else {
				echo "Gratulation! Sie haben es verstanden!";
			}
			$p = abs(round($p)) * 1;
			?>

		<form method="post" action="?view=exercise&id=9">
			<input id="range" class="slider form-control-range" type="range" min="1" max="30" value="<?= $p ?>">
			<p>
				<input id="show" class="form-control" type="text" name="bis" value="<?= $p ?>"/>
				<button class="btn btn-primary btn-block">Lebe!</button>
			</p>
		</form>
	</div>
</div>
<div class="row">
	<div class="col">
		<h2>Output:</h2>
		<p></p>
        <table>
            <?php $tmp = 0; 
			for ($z = 0; $z < $p + 1; $z++) { 
			?>
                <tr class="trow">
                    <?php for ($s = 0; $s < $p + 1; $s++) { ?>
                        <td class="tcol"><?php
                            if ($z == 0 && $s == 0) {
                                echo "&times;";
                            } else if ($z == 0 && $s > 0) {
                                echo $s;
                            } else if ($s == 0 && $z > 0) {
                                echo $z;
                            } else {
                                if ($z < 0) {
                                    echo $z;
                                } else {
									$tmp++;
									if (($p - $z) + $s >= $p) { // Prüft, ob Zahl doppelt vorkommt
										echo $s * $z;
									} else {
										echo "<span style=\"color:red;\">". $s * $z."</span>";
									}
                                }
                            }
                            ?>
                        </td>
                    <?php } ?>
                </tr>
            <?php } ?>
        </table>
        <script>
            var slider = document.getElementById("range");
            var output = document.getElementById("show");
            output.value = slider.value;

            slider.oninput = function () {
                output.value = this.value;
            }
        </script>
	</div>
</div>