<?php

/**
 * Abstrakte Klasse zur Handhabung von Entitäten.
 * @version 1.0
 * @author Karateke
 */
abstract class Entity {

    /**
     * Klassenvariable zur Aufnahme des PDO-Objekts.
     */
    static $db = null;

    /**
     * Setzen des PDO-Objekts.
     * @param $db das PDO-Objekt mit Verbindung zur Datenbank
     */
    static function setDB(PDO $db) {
        self::$db = $db;
    }

    /**
     * Holen des PDO-Objekts.
     * @return das PDO-Objekt mit Verbindung zur Datenbank
     */
    static function getDB() {
        return self::$db;
    }

    /**
     * Bestimmen des aktuellen Tabellennamens zur Entität.
     * @return Name der Tabelle
     */
    abstract function tableName();

    /**
     * Holen der Daten zur Entität aus der zugeordneten
     * Tabelle mit vorgegebenem id-Wert.
     * @param id-Wert
     * @return Objekt mit allen Attributen der Klasse
     */
    public function getById($id) {
        $sql = "SELECT * FROM " . $this->tableName() . " WHERE id = ?";
        $stmt = self::$db->prepare($sql);
        $stmt->execute([$id]);
        $obj = $stmt->fetchObject(get_class($this));
        return $obj;
    }

    /**
     * Holen aller Entitäten aus der zugeordneten Tabelle.
     * @return Array mit allen Objekten aus der Tabelle
     */
    public function getAll() {
        $sql = "SELECT * FROM " . $this->tableName();
        $stmt = self::$db->prepare($sql);
        $stmt->execute();
        $obj = $stmt->fetchAll(PDO::FETCH_CLASS, get_class($this));
        return $obj;
    }

    /**
     * Speichern der Attribute des aktuellen Objekts in die
     * zugehörige Tabelle.
     */
    public function save() {
        if (!empty($this->id)) {
            $this->_update();
        } else {
            $this->_insert();
        }
    }
    /**
     * Funktion zum Eintragen eines neuen Objekts in die
     * zugehörige Tabelle.
     * Nach dem "INSERT" wird die "ID" dem Objekt zugewiesen.
     */
    private function _insert() {
        $keys = get_object_vars($this);
        unset($keys["id"]);
        $sql = sprintf(
                "INSERT INTO " . $this->tableName() .
                " (`%s`) VALUES (:%s)", 
				implode("`,`", array_keys($keys)), 
				implode(",:", array_keys($keys))
        );
        $stmt = self::$db->prepare($sql);
        $stmt->execute($keys);
        $this->id = self::$db->lastInsertId();
    }    
    /**
     * Aktualisieren eines vorhandenen Eintrags
     * in der zugeordneten Tabelle für dieses Objekt.
     */
    private function _update() {
        $keys = get_object_vars($this);
        unset($keys["id"]);
        $sql = vsprintf(
                sprintf(
                        "UPDATE " . $this->tableName() .
                        " SET %s=:%%s WHERE id=:id", implode("=:%s,", array_keys($keys))
                ), array_keys($keys)
        );
        $stmt = self::$db->prepare($sql);
        $stmt->execute(get_object_vars($this));
    }

    public function findBy($attr, $value = null) {
		if (!is_array($attr)){
			$sql = "SELECT * FROM " . $this->tableName() . " WHERE $attr=?";
			$stmt = self::$db->prepare($sql);
			$stmt->execute([$value]);
		} else {
			$sql = sprintf("SELECT * FROM ".$this->tableName()." WHERE %s=?",
			implode("=? AND ", array_keys($attr))
		);
		$stmt = self::$db->prepare($sql);
		$stmt->execute(array_values($attr));
		}
		$obj = $stmt->fetchAll(PDO::FETCH_CLASS, get_class($this));
		return $obj;
    }
}