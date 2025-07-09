<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$password = $data['password']; // Plaintext version (for now)

$sql = "INSERT INTO mentor (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Mentor registered successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Mentor registration failed']);
}

$stmt->close();
$conn->close();
?>
