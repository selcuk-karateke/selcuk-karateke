<?php
/**
 * Klasse beschreibt das Objekt der Kategorien.
 * @version 1.0
 * @author Karateke
 */
class Kategorie extends Entity {
	public $id;
	public $kategorie;
	
	public function tableName() {
        return "kategorien";
    }
}
?>