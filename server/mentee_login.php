<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Missing email or password']);
    exit;
}

$email = $data['email'];
$password = $data['password'];

// First, fetch the user by email
$sql = "SELECT * FROM mentee WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// If the user exists
if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Compare plain password (non-hashed)
    if ($user['password'] === $password) {
        echo json_encode(['success' => true, 'message' => 'Mentee login successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incorrect password']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Email not found']);
}

$stmt->close();
$conn->close();
?>
