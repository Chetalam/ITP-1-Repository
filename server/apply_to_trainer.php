<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$trainee_id = $data['trainee_id'] ?? null;
$trainer_id = $data['trainer_id'] ?? null;

if (!$trainee_id || !$trainer_id) {
    echo json_encode(["success" => false, "message" => "Missing parameters."]);
    exit;
}

try {
    // Insert into trainee_trainers table (trainee_id, trainer_id)
    $stmt = $pdo->prepare("INSERT INTO trainee_trainers (trainee_id, trainer_id) VALUES (?, ?)");
    $stmt->execute([$trainee_id, $trainer_id]);

    echo json_encode(["success" => true, "message" => "Application submitted successfully."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
?>
