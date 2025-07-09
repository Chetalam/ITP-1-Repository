<?php
header("Content-Type: application/json");
include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['name'], $data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];

$sql = "INSERT INTO trainee_users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Trainee registered successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed']);
}

$stmt->close();
$conn->close();
?>
