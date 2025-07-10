<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

$id = $_GET['id'] ?? null;
if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Missing mentor id']);
    exit;
}

try {
    // Get mentor info
    $stmt = $pdo->prepare("SELECT id, name, email FROM mentor WHERE id = ?");
    $stmt->execute([$id]);
    $mentor = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$mentor) {
        echo json_encode(['success' => false, 'message' => 'Mentor not found']);
        exit;
    }

    // Get mentee count from mentee_mentors table
    $stmt2 = $pdo->prepare("SELECT COUNT(*) as mentee_count FROM mentee_mentors WHERE mentor_id = ?");
    $stmt2->execute([$id]);
    $mentee_count = $stmt2->fetchColumn();

    $mentor['mentee_count'] = $mentee_count;

    echo json_encode($mentor);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
