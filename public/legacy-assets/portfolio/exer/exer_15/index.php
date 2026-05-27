<div class="row">
	<div class="col">
		<?php if (!empty($_POST["gemuese"])) { ?>
		<h2>Output:</h2>
		<p>Du magst folgendes Gemüse:</p>

		<table>
		<?php foreach ($_POST["gemuese"] AS $g) { ?>
		<tr>
			<img src="exer/exer5/pics/<?php echo $g ?>.jpg" alt="<?php echo $g ?>" width="100" height="100">
		</tr>
		<?php } ?>
		</table>
		<?php } ?>

		<?php if (!empty($_POST["obst"])) { ?>
		<h2>Output:</h2>
		<p>Du magst folgendes Obst:</p>

		<table>
		<?php foreach ($_POST["obst"] AS $o) { ?>
		<tr>
			<img src="exer/exer5/pics/<?php echo $o ?>.jpg" alt="<?php echo $o ?>" width="100" height="100">
		</tr>
		<?php } ?>
		</table>
		<?php } ?>
	</div>
</div>

<form action="?view=exercise&id=5" method="post">
<div class="row">
	<div class="col">
		<h2>Input:</h2>
		<p>Ich mag folgendes Gemüse:</p>
		<div class="card-group">
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/tomate.jpg" alt="Tomate">
				<div class="card-body">
					<h5 class="card-title">Tomate</h5>
					<div class="form-check">
						<input class="form-check-input" id="Tomate" type="checkbox" name="gemuese[]" value="Tomate" checked />
						<label class="form-check-label" for="Tomate">auswählen</label>
					</div>
				</div>
			</div>
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/gurke.jpg" alt="Gurke">
				<div class="card-body">
					<h5 class="card-title">Gurke</h5>
					<div class="form-check">
						<input class="form-check-input" id="Gurke" type="checkbox" name="gemuese[]" value="Gurke" />
						<label class="form-check-label" for="Gurke">auswählen</label>
					</div>
				</div>
			</div>
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/kopfsalat.jpg" alt="Kopfsalat">
				<div class="card-body">
					<h5 class="card-title">Kopfsalat</h5>
					<div class="form-check">
						<input class="form-check-input" id="Kopfsalat" type="checkbox" name="gemuese[]" value="Kopfsalat" />
						<label class="form-check-label" for="Kopfsalat">auswählen</label>
					</div>
				</div>
			</div>
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/mohrruebe.jpg" alt="Mohrruebe">
				<div class="card-body">
					<h5 class="card-title">Mohrruebe</h5>
					<div class="form-check">
						<input class="form-check-input" id="Mohrruebe" type="checkbox" name="gemuese[]" value="Mohrruebe" />
						<label class="form-check-label" for="Mohrruebe">auswählen</label>
					</div>
				</div>
			</div>
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/spargel.jpg" alt="Spargel">
				<div class="card-body">
					<h5 class="card-title">Spargel</h5>
					<div class="form-check">
						<input class="form-check-input" id="Spargel" type="checkbox" name="gemuese[]" value="Spargel" />
						<label class="form-check-label" for="Spargel">auswählen</label>
					</div>
				</div>
			</div>
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/paprika.jpg" alt="Paprika">
				<div class="card-body">
					<h5 class="card-title">Paprika</h5>
					<div class="form-check">
						<input class="form-check-input" id="Paprika" type="checkbox" name="gemuese[]" value="Paprika" />
						<label class="form-check-label" for="Paprika">auswählen</label>
					</div>
				</div>
			</div>
		</div>

		<h2>Input:</h2>
		<p>Ich mag folgendes Obst:</p>
		<div class="card-group">
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/nopic.jpg" alt="Apfel">
				<div class="card-body">
					<h5 class="card-title">Apfel</h5>
					<div class="form-check">
						<input class="form-check-input" id="Apfel" type="checkbox" name="obst[]" value="Apfel" checked />
						<label class="form-check-label" for="Apfel">auswählen</label>
					</div>
				</div>
			</div>
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/nopic.jpg" alt="Birne">
				<div class="card-body">
					<h5 class="card-title">Birne</h5>
					<div class="form-check">
						<input class="form-check-input" id="Birne" type="checkbox" name="obst[]" value="Birne" />
						<label class="form-check-label" for="Birne">auswählen</label>
					</div>
				</div>
			</div>
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/nopic.jpg" alt="Pflaume">
				<div class="card-body">
					<h5 class="card-title">Pflaume</h5>
					<div class="form-check">
						<input class="form-check-input" id="Pflaume" type="checkbox" name="obst[]" value="Pflaume" />
						<label class="form-check-label" for="Pflaume">auswählen</label>
					</div>
				</div>
			</div>
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/nopic.jpg" alt="Erdbeeren">
				<div class="card-body">
					<h5 class="card-title">Erdbeeren</h5>
					<div class="form-check">
						<input class="form-check-input" id="Erdbeeren" type="checkbox" name="obst[]" value="Erdbeeren" />
						<label class="form-check-label" for="Erdbeeren">auswählen</label>
					</div>
				</div>
			</div>
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/nopic.jpg" alt="Himbeeren">
				<div class="card-body">
					<h5 class="card-title">Himbeeren</h5>
					<div class="form-check">
						<input class="form-check-input" id="Himbeeren" type="checkbox" name="obst[]" value="Himbeeren" />
						<label class="form-check-label" for="Himbeeren">auswählen</label>
					</div>
				</div>
			</div>
			<div class="card">
				<img class="card-img-top" src="exer/exer5/pics/nopic.jpg" alt="Brombeeren">
				<div class="card-body">
					<h5 class="card-title">Brombeeren</h5>
					<div class="form-check">
						<input class="form-check-input" id="Brombeeren" type="checkbox" name="obst[]" value="Brombeeren" />
						<label class="form-check-label" for="Brombeeren">auswählen</label>
					</div>
				</div>
			</div>
			<input class="form-control" type="submit" value="Daten senden"/>
		</div>
	</div>
</div>
</form>