<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$description = $data['description'] ?? '';

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}
if (empty($description)) {
    echo json_encode(['success' => false, 'message' => 'Leadership scope is required.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM trainer WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered.']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO trainer (name, email, password, description) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $hashedPassword, $description]);

    $trainerId = $pdo->lastInsertId();

    echo json_encode([
        'success' => true,
        'message' => 'Trainer registered successfully.',
        'trainerId' => $trainerId,
        'name' => $name,
        'email' => $email,
        'description' => $description
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
?>

