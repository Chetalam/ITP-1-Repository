<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "women_empowerment_platform";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
