<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

$id = $_GET['id'] ?? null;
if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Missing mentor id']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, name, email FROM mentor WHERE id = ?");
$stmt->execute([$id]);
$mentor = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($mentor);
?>
