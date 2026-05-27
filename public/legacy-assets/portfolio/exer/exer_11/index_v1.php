<!DOCTYPE HTML>  
<html>
<head>
<link rel="stylesheet" href="css/default.css">
</head>
<body><p style="float: right;"><?php date_default_timezone_set("Germany/Berlin"); echo "Today is " . date("Y/m/d") . "<br>" . "The time is " . date("h:i:sa");; ?></p>
    <header>
        <div class="headline">
            <h1 id="headline">Mittels FORM</h1>
        </div>
        <div class="teaser">
            <h2 id="teaser">in die DB speichern und anzeigen</h2>
        </div>
        
    </header>
<!-- get-Methode
<form action="test.php" method="get">
    Name: <input type="text" name="name"><br>
    E-mail: <input type="text" name="email"><br>
    <input type="submit">
</form>

Welcome <?php echo $_GET["name"]; ?><br>
Your email address is: <?php echo $_GET["email"]; ?> -->

<?php
// define variables and set to empty values
$firstnameErr = $lastname = $emailErr = $genderErr = $websiteErr = "";
$firstname = $lastname = $email = $gender = $comment = $website = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["firstname"])) {
    $firstnameErr = "is required";
    } else {
    $firstname = test_input($_POST["firstname"]);
    // check if firstname only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$firstname)) {
    $firstnameErr = "Only letters and white space allowed"; 
    }
    }
    
    if (empty($_POST["lastname"])) {
    $lastnameErr = "is required";
    } else {
    $lastname = test_input($_POST["lastname"]);
    // check if lastname only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$lastname)) {
    $lastnameErr = "Only letters and white space allowed"; 
    }
    }
    
    if (empty($_POST["email"])) {
    $emailErr = "is required";
    } else {
    $email = test_input($_POST["email"]);
    // check if e-mail address is well-formed
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $emailErr = "Invalid email format"; 
    }
    }
    
    if (empty($_POST["website"])) {
    $website = "";
    } else {
    $website = test_input($_POST["website"]);
    // check if URL address syntax is valid
    if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$website)) {
    $websiteErr = "Invalid URL"; 
    }    
    }
    
    if (empty($_POST["comment"])) {
    $comment = "";
    } else {
    $comment = test_input($_POST["comment"]);
    }
    
    if (empty($_POST["gender"])) {
    $genderErr = " is required";
    } else {
    $gender = test_input($_POST["gender"]);
    }
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>

<!-- post-Methode 
htmlspecialchars() function converts special characters to HTML entities
$_SERVER["PHP_SELF"] sends the submitted form data to the page itself
-->
<div class="grid-container">
<div class="grid-item">
    <h2>Your Form:</h2>
    <p><span class="error">* required field.</span></p>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
        Firstname: <span class="error">* <?php echo $firstnameErr;?></span>
        <input type="text" name="firstname" value="<?php echo $firstname;?>">
        <br>
        Lastname: <span class="error">* <?php echo $lastnameErr;?></span>
        <input type="text" name="lastname" value="<?php echo $lastname;?>">
        <br>
        E-mail: <span class="error">* <?php echo $emailErr;?></span>
        <input type="text" name="email" value="<?php echo $email;?>">
        <br>
        Website: <span class="error"><?php echo $websiteErr;?></span>
        <input type="text" name="website" value="<?php echo $website;?>">
        <br>
        Comment: <textarea name="comment" rows="5" cols="40"><?php echo $comment;?></textarea>
        <br>
        Country:   
        <select id="country" name="country">
            <option value="au">Australia</option>
            <option value="ca">Canada</option>
            <option value="usa">USA</option>
        </select>
        <br>
        Gender: <span class="error">* <?php echo $genderErr;?></span>
        <input type="radio" name="gender" value="female" <?php if (isset($gender) && $gender=="female") echo "checked";?>>Female
        <input type="radio" name="gender" value="male" <?php if (isset($gender) && $gender=="male") echo "checked";?>>Male
        <br>
        Search:
        <input class="src" type="text" name="search" placeholder="Search..">
        <br>
        <input type="submit" name="submit" value="Submit">  
    </form>
</div>

<div class="grid-item">
    <?php
        echo "<h2>Your Input:</h2>";
        echo "Firstname: $firstname";
        echo "<br>";
        echo "Lastname: $lastname";
        echo "<br>";
        echo "E-Mail: $email";
        echo "<br>";
        echo "Website: $website";
        echo "<br>";
        echo "Country: $country";
        echo "<br>";
        echo "Comment: $comment";
        echo "<br>";
        echo "Gender: $gender";
        echo "<br>";
        echo "Search: $search";
    ?>
</div>
<?php
echo "<div class='grid-item' style='overflow-x:auto;'>";
echo "<h2>Your Database:</h2>";
echo "<table>";
echo "<tr>
    <th>Id</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>E-Mail</th>
        <th>Website</th>
        <th>Comment</th>
        <!--th>Country</th-->
        <th>Gender</th>
        <th>Registry Date</th>
    </tr>";
    
class TableRows extends RecursiveIteratorIterator { 
    function __construct($it) { 
        parent::__construct($it, self::LEAVES_ONLY); 
    }
    function current() {
        return "<td>" . parent::current(). "</td>";
    }
    function beginChildren() { 
        echo "<tr>"; 
    } 
    function endChildren() { 
        echo "</tr>" . "\n";
    } 
} 

try {
// connect to the database
    require_once 'incl/connect.php';
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// use Tools ...



// count table row with prep
    $count = $db->prepare("SELECT * FROM myGuests");
    $count->execute();
// show table with prep
    $stmt = $db->prepare("SELECT * FROM myGuests LIMIT 10 OFFSET 0"); 
    $stmt->execute();


    echo $stmt->rowCount() . " selected records from " . $count->rowCount();

// set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
// loop through results of database query, displaying them in the table
    foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
        echo $v;
    }
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$db = null;
echo "</table>";
echo "</div>";

?>
</div>
</body>
</html>



<?php
// Tools PDO

// sql to create database
/*
    $sql = "DROP DATABASE IF EXISTS mydb";
    $db->exec($sql);
    
    $sql = "CREATE DATABASE IF NOT EXISTS mydb";
    $db->exec($sql);
*/    
// sql to create table
/*
    $sql = "DROP TABLE IF EXISTS myGuests";
    $db->exec($sql);
    
    $sql = "CREATE TABLE IF NOT EXISTS myGuests (
    id INT(11) UNSIGNED AUTO_INCREMENT, 
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    website VARCHAR(50),
    comment TEXT,
    age DATE NOT NULL,
    gender enum('male','female') NOT NULL, -- ENUM stands for ...
    reg_date TIMESTAMP
    PRIMARY KEY (id)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=11";
    $db->exec($sql);
*/
// sql to alter table
/*
    $sql = "ALTER TABLE myGuests CHANGE firstname firstname VARCHAR(30)";
    $db->exec($sql);
    
    $sql = "ALTER TABLE myGuests ADD age DATEFIRST|AFTER gender";
    $db->exec($sql);
    
    $sql = "ALTER TABLE myGuests DROP age DATE";
    $db->exec($sql);
    
    $db->query('TRUNCATE TABLE myGuests');
    $db->execute();
    
*/
// sql to create new record
/*
    $sql = "INSERT INTO myGuests (firstname, lastname, email, website, comment, gender)
    VALUES ('$firstname','$lastname','$email','$website','$comment','$gender')";
    $db->exec($sql); 
    $last_id = $db->lastInsertId();
    echo "New record created successfully. Last inserted ID is: " . $last_id . "<br>";
*/
// create new records (multiple)
/*
// begin the transaction
    $db->beginTransaction();
// our SQL statements
    $db->exec("INSERT INTO MyGuests (firstname, lastname, email) 
    VALUES ('John', 'Doe', 'john@example.com')");
    $db->exec("INSERT INTO MyGuests (firstname, lastname, email) 
    VALUES ('Mary', 'Moe', 'mary@example.com')");
    $db->exec("INSERT INTO MyGuests (firstname, lastname, email) 
    VALUES ('Julie', 'Dooley', 'julie@example.com')");
// commit the transaction
    $db->commit();
    echo "New records created successfully";
*/
// create new records with prepared statements
/*
// prepare sql and bind parameters
    $stmt = $db->prepare("INSERT INTO table1 (title, content) 
    VALUES (:title, :content)");
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':content', $content);
    
// insert a row
    $title = "John";
    $content = "Doe";
    $stmt->execute();

// insert another row
    $title = "Mary";
    $content = "Moe";
    $stmt->execute();

// insert another row
    $title = "Julie";
    $content = "Dooley";
    $stmt->execute();
*/
// sql to delete a record
/*
    $sql = "DELETE FROM table1 WHERE id=3";
    // use exec() because no results are returned
    $db->exec($sql);
*/ 
// sql to update a record
/*
    $sql = "UPDATE table1 SET title='Doe' WHERE id=2";
    // Prepare statement
    $stmt = $db->prepare($sql);
    // execute the query
    $stmt->execute();
    // echo a message to say the UPDATE succeeded
    echo $stmt->rowCount() . " records UPDATED successfully";
*/
// sql to show all rows with limit
/*
    $stmt = $db->prepare("SELECT * FROM table1 LIMIT 10 OFFSET 3"); 
    $stmt->execute();
*/
?>