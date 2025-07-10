<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

if (!isset($_GET['mentee_id'])) {
    echo json_encode(['success' => false, 'message' => 'Missing mentee_id']);
    exit;
}

$mentee_id = intval($_GET['mentee_id']);

try {
    // Adapted for mentee_mentors table (assuming mentee_id, mentor_id columns)
    $stmt = $pdo->prepare("
        SELECT m.id, m.name, m.email
        FROM mentee_mentors mm
        JOIN mentor m ON mm.mentor_id = m.id
        WHERE mm.mentee_id = ?
    ");
    $stmt->execute([$mentee_id]);
    $mentors = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'mentors' => $mentors
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
