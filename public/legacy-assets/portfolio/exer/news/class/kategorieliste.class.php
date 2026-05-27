<?php
/**
 * Klasse beschreibt das Objekt der Kategorienliste.
 * @version 1.0
 * @author Karateke
 */
class Kategorieliste extends Entity {
	public $kategorien_id;
	public $ereignisse_id;
	
	public function tableName() {
        return "kategorienliste";
    }
}
?>