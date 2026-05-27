<?php
/**
 * Klasse beschreibt das Objekt der Besucher.
 * @version 1.0
 * @author Karateke
 */
class Besucher extends Entity {
    public $id;
    public $ip;
    public $zeit;
	
	public function tableName() {
        return "besucher"; // Tabellenname
    }
}
?>