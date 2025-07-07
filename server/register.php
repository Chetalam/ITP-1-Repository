<?php
// Allow requests from any origin and JSON input
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['name'], $data['email'], $data['phone'])) {
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

$name = trim($data['name']);
$email = trim($data['email']);
$phone = trim($data['phone']);

// Connect to DB
include 'connect.php';

// Prepare insert query
$sql = "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

// Check if statement preparation was successful
if (!$stmt) {
    echo json_encode(['error' => 'Database error: ' . $conn->error]);
    exit;
}

// Bind parameters and execute
$stmt->bind_param("sss", $name, $email, $phone);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Registration successful']);
} else {
    echo json_encode(['error' => 'Failed to insert data: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

