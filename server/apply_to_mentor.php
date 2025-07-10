<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$mentee_id = $data['mentee_id'] ?? null;
$mentor_id = $data['mentor_id'] ?? null;

if (!$mentee_id || !$mentor_id) {
    echo json_encode(["success" => false, "message" => "Missing parameters."]);
    exit;
}

try {
    // Insert into mentee_mentors table (not mentee_applications)
    $stmt = $pdo->prepare("INSERT INTO mentee_mentors (mentee_id, mentor_id) VALUES (?, ?)");
    $stmt->execute([$mentee_id, $mentor_id]);

    echo json_encode(["success" => true, "message" => "Application submitted successfully."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
?>
