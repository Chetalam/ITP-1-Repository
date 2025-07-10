<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

if (!isset($_GET['trainee_id'])) {
    echo json_encode(['success' => false, 'message' => 'Missing trainee_id']);
    exit;
}

$trainee_id = intval($_GET['trainee_id']);

try {
    $stmt = $pdo->prepare("
        SELECT tr.id, tr.name, tr.email
        FROM trainee_trainers tt
        JOIN trainer tr ON tt.trainer_id = tr.id
        WHERE tt.trainee_id = ?
    ");
    $stmt->execute([$trainee_id]);
    $trainers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'trainers' => $trainers
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
