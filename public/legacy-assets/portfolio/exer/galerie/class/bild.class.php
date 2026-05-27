<?php
/**
 * Klasse beschreibt das Objekt der Bilder.
 * @version 1.0
 * @author Karateke
 */
class Bild extends Entity {
	public $id;
	public $besucher_id;
	public $zeit;
	public $titel;
	public $name;
	
	public function tableName() {
        return "bilder";
    }
}
?>