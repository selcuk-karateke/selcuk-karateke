<ul id="galerie">
<?php
// Ordnername 
$ordner = "pics"; //auch komplette Pfade möglich ($ordner = "download/files";)         

foreach ($bilder->getAll() as $bild) {
 
 // Zusammentragen der Dateiinfo
 $bildinfo = pathinfo($ordner."/".htmlspecialchars($bild->name)); 
 //Folgende Variablen stehen nach pathinfo zur Verfügung
 // $dateiinfo['filename'] = Dateiname ohne Dateiendung  *erst mit PHP 5.2
 // $dateiinfo['dirname'] = Verzeichnisname
 // $dateiinfo['extension'] = Dateityp -/endung
 // $dateiinfo['basename'] = voller Dateiname mit Dateiendung
 
 // Größe ermitteln für Ausgabe
 $size = ceil(filesize(htmlspecialchars($bild->name))/1024); 
 
 if ($bild != "." && $bild != ".."  && htmlspecialchars($bild->titel) != "_notes" && $bildinfo['basename'] != "Thumbs.db") { 
 ?>
    <li>
        <a href="<?php echo htmlspecialchars($bild->name); ?>">
        <img src="<?php echo htmlspecialchars($bild->name); ?>" width="140" alt="Vorschau" /></a> 
        <span><?php echo $bild->titel; ?> (<?php echo $size ; ?>kb)</span>
        <span><?php echo $bild->zeit; ?></span>
        <span><?php echo $besucher->ip; ?></span>
		<?php if (empty((new Bewertung())->findBy([
			"bilder_id"=>$bild->id,
			"besucher_id"=>$besucher->id]))) {
		?>
		<span>Ihre Bewertung</span>
		<form action="" method="POST">
			<input type="radio" id="star5" name="bewertung" value="5" />
			<input type="radio" id="star4" name="bewertung" value="4" />
			<input type="radio" id="star3" name="bewertung" value="3" />
			<input type="radio" id="star2" name="bewertung" value="2" />
			<input type="radio" id="star1" name="bewertung" value="1" />
		<input type="hidden" name="id" value="<?= $bild->id ?>" />
		<div></div>
		<input type="submit" value="Bewerten"/>
		</form>
		<?php } 
			$bewertungen = (new Bewertung())->findBy("bilder_id", $bild->id);
			$summe = 0;
			foreach ($bewertungen as $bewertung) {
				$summe += $bewertung->wert;
			}
		?>
        <span>Durchschnitt <span><?= count($bewertungen); ?> Stimme(n)</span> <?= count($bewertungen)==0 ? "Keine" : $summe / count($bewertungen); ?> Stern(e)</span>
    </li>
<?php
 };
 };
?>
</ul>