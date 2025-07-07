<?php
$host = "localhost";
$user = "root";
$pass = ""; // leave blank if no password
$db   = "empowerher_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}
?>

