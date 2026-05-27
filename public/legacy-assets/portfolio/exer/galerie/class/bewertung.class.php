<?php
/**
 * Klasse beschreibt das Objekt der Bewertungen.
 * @version 1.0
 * @author Karateke
 */
class Bewertung extends Entity {
    public $id;
    public $bilder_id;
    public $besucher_id;
    public $zeit;
    public $wert;
	
	public function tableName() {
        return "bewertungen";
    }
}
?>