<?php
/**
 * Klasse beschreibt das Objekt der Ereignisse.
 * @version 1.0
 * @author Karateke
 */
class Ereignis extends Entity {
	public $id;
	public $datum;
	public $zeit;
	public $ort;
	public $kurztitel;
	public $beschreibung;
	
	public function tableName() {
        return "ereignisse";
    }
}
?>