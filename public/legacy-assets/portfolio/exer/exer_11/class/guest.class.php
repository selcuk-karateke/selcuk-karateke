<?php
class Guest {
    public $firstname;
    public $lastname;
    public $email;
    public $gender;
    public $age;
    public $comment;
    public $website;
    
    function testInput($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
}
?>