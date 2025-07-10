<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

if (!isset($_GET['trainer_id'])) {
    echo json_encode(['success' => false, 'message' => 'Missing trainer_id']);
    exit;
}

$trainer_id = intval($_GET['trainer_id']);

try {
    $stmt = $pdo->prepare("
        SELECT t.id, t.name, t.email
        FROM trainee_trainers tt
        JOIN trainee t ON tt.trainee_id = t.id
        WHERE tt.trainer_id = ?
    ");
    $stmt->execute([$trainer_id]);
    $trainees = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'trainees' => $trainees
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
