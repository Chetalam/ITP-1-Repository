<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM mentor WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered.']);
        exit;
    }

    $description = $data['description'] ?? '';
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO mentor (name, email, password, description) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $hashedPassword, $description]);

    $mentorId = $pdo->lastInsertId();

    echo json_encode([
        'success' => true,
        'message' => 'Mentor registered successfully.',
        'mentorId' => $mentorId,
        'name' => $name,
        'email' => $email
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
?>
