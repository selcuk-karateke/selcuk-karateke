<?php
if (!empty($_FILES)) {
	$dir = SITE_ROOT.'\\exer\\exer6\\uploads\\';
	$upload = $_FILES["datei"];
	$errs = array(
		0 => 'There is no error, the file uploaded with success',
		1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
		2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
		3 => 'The uploaded file was only partially uploaded',
		4 => 'No file was uploaded',
		6 => 'Missing a temporary folder',
		7 => 'Failed to write file to disk.',
		8 => 'A PHP extension stopped the file upload.',
	);
?> 
<div class="row">
	<div class="col">
		<h2>Output:</h2>
		<p>Deine Dateien, die du hochgeladen hast.</p>

		<table>
		<?php foreach ($_FILES['datei']['name'] AS $key => $img) { ?>
		<tr>
			<img src="exer/exer6/uploads/<?= !empty($img) ? $img : 'no_pic.gif'; ?>" alt="" width="100" height="100">
			<p><?= $errs[$upload["error"][$key]] ?></p>
		</tr>
		<?php } ?>
		</table>
	</div>
</div>
<?php

	if ($upload["error"][0] == 0 && $upload["size"][0] <= 4097){
		$file1 = $dir . basename($_FILES['datei']['name'][0]);
		move_uploaded_file($upload["tmp_name"][0],$file1);
	}
	
	if ($upload["error"][1] == 0){
		$file2 = $dir . basename($_FILES['datei']['name'][1]);
		move_uploaded_file($upload["tmp_name"][1],$file2);
	}
	
	if ($upload["error"][2] == 0){
		$file3 = $dir . basename($_FILES['datei']['name'][2]);
		move_uploaded_file($upload["tmp_name"][2],$file3);
	}
	
	if ($upload["error"][3] == 0){
		$file4 = $dir . basename($_FILES['datei']['name'][3]);
		move_uploaded_file($upload["tmp_name"][3],$file4);
	}
}
?>

<div class="row">
	<div class="col">
		<h2>Input:</h2>
		<p>Wähle deine Dateien aus und lade sie hoch, um sie anzeigen zu lassen.</p>
		<form action="" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="MAX_FILE_SIZE" value="4097" />
		<p> <input type="file" name="datei[]" accept="image/*"/> </p> <!-- oder ohne Array -->
		<p> <input type="file" name="datei[]" accept="video/*"/> </p>
		<p> <input type="file" name="datei[]" accept="audio/*"/> </p>
		<p> <input type="file" name="datei[]" accept=".jpg,.png"/> </p>
		<p> <input type="submit" value="Hochladen"/> </p>
		</form>
	</div>
</div>