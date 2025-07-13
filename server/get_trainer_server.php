<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

$trainer_id = $_GET['trainer_id'] ?? null;
if (!$trainer_id) {
    echo json_encode(['success' => false, 'message' => 'Missing trainer_id']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, name, email, description FROM trainer WHERE id = ?");
    $stmt->execute([$trainer_id]);
    $trainer = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($trainer) {
        echo json_encode(['success' => true, 'trainer' => $trainer]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Trainer not found']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
