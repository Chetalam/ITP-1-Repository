<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// ✅ Make sure you have db.php and it creates $pdo
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$description = $data['description'] ?? '';

if (empty($name) || empty($email) || empty($password) || empty($description)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

try {
    // Check if donor already exists
    $stmt = $pdo->prepare("SELECT id FROM donor WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered.']);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert donor with scholarship scope
    $stmt = $pdo->prepare("INSERT INTO donor (name, email, password, description) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $hashedPassword, $description]);

    // Get last inserted ID
    $donorId = $pdo->lastInsertId();

    echo json_encode([
        'success' => true,
        'message' => 'Donor registered successfully.',
        'donorId' => $donorId,
        'name' => $name,
        'email' => $email
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
