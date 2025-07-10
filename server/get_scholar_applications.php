<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php'; // your PDO connection

if (!isset($_GET['scholar_id'])) {
    echo json_encode(['success' => false, 'message' => 'Missing scholar_id']);
    exit;
}

$scholar_id = intval($_GET['scholar_id']);

try {
    // Assuming your table is scholar_applications(scholar_id, donor_id)
    $stmt = $pdo->prepare("
        SELECT d.id, d.name, d.email
        FROM scholar_applications sa
        JOIN donor d ON sa.donor_id = d.id
        WHERE sa.scholar_id = ?
    ");
    $stmt->execute([$scholar_id]);
    $donors = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'donors' => $donors
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
