<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

$donor_id = $_GET['donor_id'] ?? null;

if (!$donor_id) {
    echo json_encode([]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT s.id, s.name, s.email
    FROM scholar_donors sa
    JOIN scholar s ON sa.scholar_id = s.id
    WHERE sa.donor_id = ?
");
$stmt->execute([$donor_id]);
$scholars = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($scholars);
?>
