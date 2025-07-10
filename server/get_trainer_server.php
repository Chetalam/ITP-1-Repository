<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

$id = $_GET['id'] ?? null;
if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Missing trainer id']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, name, email FROM trainer WHERE id = ?");
$stmt->execute([$id]);
$trainer = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($trainer);
?>
