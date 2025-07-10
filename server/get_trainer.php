<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'])) {
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit;
}

$email = $data['email'];

$sql = "SELECT name, email FROM trainer_users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $trainer = $result->fetch_assoc();
    echo json_encode(['success' => true, 'trainer' => $trainer]);
} else {
    echo json_encode(['success' => false, 'message' => 'Trainer not found']);
}

$stmt->close();
$conn->close();
?>
