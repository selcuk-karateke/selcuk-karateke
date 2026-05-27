<?php
// include database class
include 'exer/exer_11/class/db.class.php';
include 'exer/exer_11/class/tablerows.class.php';

// define variables
$valid = "valid.php";
if($_SERVER["REMOTE_ADDR"] == "::1"){
	// interne Datenbank
	define("DB_HOST", "localhost");
	define("DB_NAME", "db_test");
	define("DB_USER", "root");
	define("DB_PASS", "");
} else {
	// interne Datenbank
	define("DB_HOST", "localhost");
	define("DB_NAME", "db_test");
	define("DB_USER", "deilnefle");
	define("DB_PASS", "nojoins0");
}
// instantiate database
$db = new Database();

// define variables and set to empty values
$firstnameErr = $lastnameErr = $emailErr = $genderErr = $ageErr = $websiteErr = "";
$firstname = $lastname = $country = $email = $gender = $search = $age = $comment = $website = "";

// define state for valid
$state = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $state = true;
    
    if (empty($_POST["firstname"])) {
        $firstnameErr = "is required";
        $state = false;
    } else {
        $firstname = test_input($_POST["firstname"]);
        // check if firstname only contains letters and whitespace
        if (!preg_match("/^[a-zA-Z ]*$/", $firstname)) {
            $firstnameErr = "Only letters and white space allowed";
            $state = false;
        }
    }
    
    if (empty($_POST["lastname"])) {
        $lastnameErr = "is required";
        $state = false;
    } else {
        $lastname = test_input($_POST["lastname"]);
        // check if lastname only contains letters and whitespace
        if (!preg_match("/^[a-zA-Z ]*$/", $lastname)) {
            $lastnameErr = "Only letters and white space allowed";
            $state = false;
        }
    }
    
    if (empty($_POST["email"])) {
        $emailErr = "is required";
        $state = false;
    } else {
        $email = test_input($_POST["email"]);
        // check if e-mail address is well-formed
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Invalid email format";
            $state = false;
        }
    }
    
    if (empty($_POST["website"])) {
        $website = "";
    } else {
        $website = test_input($_POST["website"]);
        // check if URL address syntax is valid
        if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i", $website)) {
            $websiteErr = "Invalid URL";
            $state = false;
        }
    }
    
    if (empty($_POST["comment"])) {
        $comment = "";
    } else {
        $comment = test_input($_POST["comment"]);
    }
    
    if (empty($_POST["gender"])) {
        $genderErr = " is required";
        $state = false;
    } else {
        $gender = test_input($_POST["gender"]);
    }

    if (empty($_POST["age"])) {
        $ageErr = " is required";
        $state = false;
    } else {
        $age = test_input($_POST["age"]);
    }
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
<style>
.src{
    background-image: url('exer/exer_11/img/searchicon.png');
    background-position: 96% 50%;
    background-repeat: no-repeat;
}
.error {
	color: #FF0000;
}

.ok {
	color: #00FF00;
}
</style>
<div class="row">
	<div class="col">
		<h2>Input:</h2>
		<p><span class="error">* required field.</span></p>
		<form method="post" action="<?php echo htmlspecialchars('?view=exercise&id=1');?>">
		
			<label for="fname">Firstname <span class="error">* <?php echo $firstnameErr;?></span></label>
			<input type="text" class="form-control" id="fname" name="firstname" value="<?php echo $firstname;?>">
			
			<label for="lname">Lastname <span class="error">* <?php echo $lastnameErr;?></span></label>
			<input type="text" class="form-control" id="lname" name="lastname" value="<?php echo $lastname;?>">
			
			<label for="email">E-mail <span class="error">* <?php echo $emailErr;?></span></label>
			<input type="text" class="form-control" name="email" value="<?php echo $email;?>">
			
			<label for="website">Website <span class="error"><?php echo $websiteErr;?></span></label>
			<input type="text" class="form-control" name="website" value="<?php echo $website;?>">
			
			<label for="comment">Comment</label>
			<textarea class="form-control" name="comment" id="comment" rows="5" cols="100%"><?php echo $comment;?></textarea>
			
			<label for="country">Country</label>
			<select id="country" class="form-control" multiple>
				<option value="de">Germany</option>
				<option value="au">Australia</option>
				<option value="ca">Canada</option>
				<option value="us">USA</option>
			</select>
			
			<label for="gender">Gender <span class="error">* <?php echo $genderErr;?></span></label>
			<input type="radio" name="gender" id="male" value="male" <?php if (isset($gender) && $gender=='male') echo 'checked';?>>
			<label for="male" class="form-check-label" >Male</label>
			<input type="radio" name="gender" id="female" value="female" <?php if (isset($gender) && $gender=='female') echo 'checked';?>>
			<label for="female" class="form-check-label" >Female</label>
			<input type="radio" name="gender" id="other" value="other" <?php if (isset($gender) && $gender=='others') echo 'checked';?>>
			<label for="other" class="form-check-label" >Other</label>
			<br/>
			<label for="age">Age <span class="error">* <?php echo $ageErr;?></span></label>
			<input type="date" class="form-control" name="age" id="age" value="$age">
			
			<label for="search">Search</label>
			<input type="text" class="form-control src" name="search" placeholder="Search..">
			
			<label for="action"></label>
			<button class="btn btn-primary btn-block" name="action">Submit</button>
		</form>
	</div>
	<div class="col">
		<?php
			echo "<h2>Output:</h2>";
			echo "Firstname: <span class='ok'>$firstname</span> <span class='error'> $firstnameErr </span>";
			echo "<br>";
			echo "Lastname: <span class='ok'>$lastname</span> <span class='error'> $lastnameErr </span>";
			echo "<br>";
			echo "E-Mail:  <span class='ok'>$email</span> <span class='error'> $emailErr </span>";
			echo "<br>";
			echo "Website:  <span class='ok'>$website</span> <span class='error'> $websiteErr </span>";
			echo "<br>";
			echo "Country:  <span class='ok'>$country</span>";
			echo "<br>";
			echo "Comment:  <span class='ok'>$comment</span>";
			echo "<br>";
			echo "Gender:  <span class='ok'>$gender</span> <span class='error'> $genderErr </span>";
			echo "<br>";
			echo "Age:  <span class='ok'>$age</span> <span class='error'> $ageErr </span>";
			echo "<br>";
			echo "Search:  <span class='ok'>$search</span>";
			echo "<br>";
		?>
	</div>
	<div class="col-sm-12">
		<?php

		$crud = '';

		if ($crud == 'd'){
			$db->query('TRUNCATE TABLE myGuests');
			$db->execute();
		}

		if ($crud == 'u'){
			$db->query('ALTER TABLE myGuests ADD age DATE AFTER gender');
			$db->execute();
			}
			
		if ($state == true){
			$db->query('INSERT INTO myGuests (fname, lname, email, website, comment, gender, age) 
							VALUES (:fname, :lname, :email, :website, :comment, :gender, :age)');
			
			$db->bind(':fname', $firstname);
			$db->bind(':lname', $lastname);
			$db->bind(':email', $email);
			$db->bind(':website', $website);
			$db->bind(':comment', $comment);
			$db->bind(':gender', $gender);
			$db->bind(':age', $age);
			
			$db->execute();

		}
		$db->query('SELECT * FROM myguests ORDER BY id DESC');
		
		try {
            $rows = $db->resultset();
        }
        // Catch any errors
        catch (PDOException $e) {
			echo "<p>Fehler aufgetreten: " . $e->getMessage() . "</p>";
			$rows = "";
        }
		?>
		<h2>Output:</h2>
	
		<div class="table-responsive">
			<table class="table">
			<tr>
				<th>Id</th>
					<th>Firstname</th>
					<th>Lastname</th>
					<th>E-Mail</th>
					<th>Website</th>
					<th>Comment</th>
					<!--th>Country</th-->
					<th>Gender</th>
					<th>Age</th>
					<th>Registry Date</th>
				</tr>
			<?php
			// loop through results of database query, displaying them in the table
			foreach (new TableRows(new RecursiveArrayIterator($rows)) as $k => $v) { echo $v; }
			?>
			</table>
		</div>
		<p>Last insert ID: <?= $db->lastInsertId(); ?></p>
		<p>Row Count: <?= $db->rowCount(); ?></p>
		
		<pre>
			<?php print_r($rows); ?>
		</pre>
	</div>
</div>
<?php 

//include 'class/cronjob.class.php';

//*** instantiate
//$crontab = new Cronjob();

//*** append new cron job
//$crontab->append_cronjob('0 0 1 * * /usr/bin/php7.1 -f /var/www/html/bagobag/test.php');

//*** append multiple cron jobs
/*$new_cronjobs = array(
	'2 11 * * * /etc/webmin/package-updates/update.pl',
	'0 8-16 * * 1-6 /root/./backup #WWW Ordnerbackup von bagobag',
	'0 6 * * 1-6 /root/./backuptar #Packt alle backups als tar in das /data/backup verzeichnis, wird um 7 uhr morgens ausgeführt',
    '0 0 1 * * /usr/bin/php7.1 -f /var/www/html/bagobag/test.php',
    '30 8 * * 6 /usr/bin/php7.1 -f /var/www/html/bagobag/test.php'
    );
$crontab->append_cronjob($new_cronjobs);*/

//*** remove cron job
//$cron_regex = "/\/usr\/bin\/php7.1 -f \/var\/www\/html\/bagobag\/test.php/";  
//$cron_regex = "/0 0 1 \* \* /";
//$crontab->remove_cronjob($cron_regex);

//*** remove multiple cron jobs
/*$cron_regex = array(
    '`0 0 1 \* \* \/var\/www\/html\/bagobag\/test.php\/`',
    '`30 8 \* \* 6 \/var\/www\/html\/bagobag\/test.php\/`'
    ); 
$crontab->remove_cronjob($cron_regex);*/

//$cronj = '0 0 '.$day.' '.$month.' * /usr/bin/php7.1 -f /var/www/html/bagobag/test.php pid='.$pid.' prodid='.$prodID.' prodende='.$prodDate;
//$regex = '/\/usr\/bin\/php7.1 -f \/var\/www\/html\/bagobag\/test.php pid='.$pid.' prodid='.$prodID.'/';
?>