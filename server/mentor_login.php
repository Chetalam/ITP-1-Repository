<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Get input
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Missing email or password']);
    exit;
}

$email = $data['email'];
$password = $data['password'];

include 'connect.php';

// Check if email and password match
$sql = "SELECT * FROM mentor_signin WHERE email = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $mentor = $result->fetch_assoc();
    echo json_encode(['success' => true, 'mentorId' => $mentor['id'], 'name' => $mentor['name']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
}

$stmt->close();
$conn->close();
?>
