<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
    exit;
}

include 'connect.php';

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];

$sql = "INSERT INTO scholar (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Scholar registered successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed']);
}
?>
