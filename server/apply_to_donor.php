<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$scholar_id = $data['scholar_id'] ?? null;
$donor_id = $data['donor_id'] ?? null;

if (!$scholar_id || !$donor_id) {
    echo json_encode(["success" => false, "message" => "Missing parameters."]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO scholar_applications (scholar_id, donor_id) VALUES (?, ?)");
    $stmt->execute([$scholar_id, $donor_id]);

    echo json_encode(["success" => true, "message" => "Application submitted successfully."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
?>
