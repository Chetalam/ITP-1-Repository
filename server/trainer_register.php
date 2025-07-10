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
$password = $data['password'];

$sql = "INSERT INTO trainer_users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("sss", $name, $email, $password);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Trainer registered successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to register: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Statement error: ' . $conn->error]);
}

$conn->close();
?>

