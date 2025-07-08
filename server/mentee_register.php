<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Read data
$data = json_decode(file_get_contents("php://input"), true);

// Validate
if (!isset($data['name'], $data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Missing name, email, or password']);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);

include 'connect.php';

$sql = "INSERT INTO user_mentee (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Mentee registered successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to register']);
}

$stmt->close();
$conn->close();
?>

