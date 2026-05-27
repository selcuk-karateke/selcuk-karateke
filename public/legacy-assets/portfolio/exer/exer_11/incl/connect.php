<?php
// MySQL
$dsn = 'mysql:host=localhost;dbname=db_test';
// $dsn = 'mysql:host=localhost;dbname=dbtest';port=8889;

// SQLite3
// $dsn = 'sqlite:C:/xampp/htdocs/sqlite/dbtest.db';
// $dsn = 'sqlite:/Applications/MAMP/htdocs/sqlite/dbtest.db';

// MS SQL Server
// $dsn = 'sqlsrv:Server=localhost;Database=dbtest';

$db = new PDO($dsn, 'root', '');