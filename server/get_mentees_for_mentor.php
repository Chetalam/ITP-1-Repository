<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

if (!isset($_GET['mentor_id'])) {
    echo json_encode(['success' => false, 'message' => 'Missing mentor_id']);
    exit;
}

$mentor_id = intval($_GET['mentor_id']);

try {
    // Use mentee_mentors table for assigned mentees
    $stmt = $pdo->prepare("
        SELECT me.id, me.name, me.email
        FROM mentee_mentors mm
        JOIN mentee me ON mm.mentee_id = me.id
        WHERE mm.mentor_id = ?
    ");
    $stmt->execute([$mentor_id]);
    $mentees = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'mentees' => $mentees
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
