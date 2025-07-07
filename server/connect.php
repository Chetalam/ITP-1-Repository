<?php
// Reusable database connection file

$host = "localhost";
$user = "root";
$pass = ""; // Leave blank for default XAMPP config
$db   = "empowerher_db"; // Make sure this matches your actual DB name

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    // Output error in JSON format
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}
?>
