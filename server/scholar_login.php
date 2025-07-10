<?php
// Allow CORS and set JSON response headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include your PDO connection (make sure you have $pdo inside db.php)
require 'db.php';

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Get email and password safely
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// Validate inputs
if (empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required."
    ]);
    exit;
}

try {
    // Check if scholar exists
    $stmt = $pdo->prepare("SELECT id, name, email, password FROM scholar WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        // Success
        echo json_encode([
            "success" => true,
            "message" => "Login successful.",
            "scholarId" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email']
        ]);
    } else {
        // Invalid credentials
        echo json_encode([
            "success" => false,
            "message" => "Invalid email or password."
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Server error: " . $e->getMessage()
    ]);
}
?>
