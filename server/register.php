<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['email'], $data['phone'])) {
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];

$conn = new mysqli("localhost", "root", "", "empowerher_db");

if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$sql = "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $phone);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Registration successful']);
} else {
    echo json_encode(['error' => 'Failed to insert data']);
}

$stmt->close();
$conn->close();
?>
