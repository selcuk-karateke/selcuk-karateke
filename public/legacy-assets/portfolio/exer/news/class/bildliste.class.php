<?php
/**
 * Klasse beschreibt das Objekt der Bilderliste.
 * @version 1.0
 * @author Karateke
 */
class Bildliste extends Entity {
	public $bilder_id;
	public $ereignisse_id;
	
	public function tableName() {
        return "bildliste";
    }
}
?> 	