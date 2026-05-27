<a href="index.php">zurück</a>
<?php
// testentity.php
function my_autoloader($class) {
    include 'class/' . $class . '.class.php';
}

spl_autoload_register('my_autoloader');

require_once ".ht_dbdata";

$dsn = "mysql:dbhost=" . DBHOST . ";dbname=" . DBNAME;
$db = new PDO($dsn, DBUSER, DBPASS);
Entity::setDB($db);

class Buch extends Entity {
    public function tableName() {
        return "buecher";
    }
}

class Wohnort extends Entity {
    public function tableName() {
        return "wohnorte";
    }
}

class Person extends Entity {
    public function tableName() {
        return "personen";
    }
}

$buch = new Buch();
$buecher = $buch->getAll();

$wohnung = new Wohnort();

$person = new Person();

//var_dump($buecher);
foreach ($buecher as $b) {
    ?>
    <p>
    <?php echo $b->id, ": ", htmlspecialchars($b->titel) ?>  
    </p>
<?php
}

//var_dump(get_object_vars($buecher[0]));
$b = $buecher[0];

$b->autor = "Karl Kaufmann";
$b->save();

var_dump($b->getAll());

