<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['email'], $data['password'])) {
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

$conn = new mysqli("localhost", "root", "", "women_empowerment_platform");
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$email = $conn->real_escape_string($data['email']);
$password = $conn->real_escape_string($data['password']);

$query = "INSERT INTO leadership_signin (email, password) VALUES ('$email', '$password')";
if ($conn->query($query)) {
    echo json_encode(['message' => 'Leadership sign-in successful']);
} else {
    echo json_encode(['error' => 'Insert failed']);
}
$conn->close();
?>
