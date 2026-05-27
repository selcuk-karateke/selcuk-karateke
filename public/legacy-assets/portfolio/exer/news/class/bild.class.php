<?php
/**
 * Klasse beschreibt das Objekt der Bilder.
 * @version 1.0
 * @author Karateke
 */
class Bild extends Entity {
	public $id;
	public $dateiname;
	public $fotograf;
	
	public function tableName() {
        return "bilder";
    }
}
?>