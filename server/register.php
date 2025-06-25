<?php
// Allow requests from frontend (React)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Read JSON data sent from React
$data = json_decode(file_get_contents("php://input"), true);

// Check if required fields exist
if (!isset($data['name'], $data['email'], $data['phone'])) {
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

// Store data in variables
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];

// Database connection
$host = "localhost";
$db = "women_empowerment_platform";  // Use your actual database name
$user = "root";  // Default XAMPP MySQL user
$pass = "";      // Default XAMPP MySQL password is blank

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Insert into users table
$sql = "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("sss", $name, $email, $phone);
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Registration successful']);
    } else {
        echo json_encode(['error' => 'Failed to insert data']);
    }
    $stmt->close();
} else {
    echo json_encode(['error' => 'SQL prepare failed']);
}

$conn->close();
?>

