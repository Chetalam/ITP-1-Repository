<?php
// Reusable connection file

$host = "localhost";
$user = "root";
$pass = ""; // Default is blank in XAMPP
$db   = "empowerher_db"; // Use your database name

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}
?>

