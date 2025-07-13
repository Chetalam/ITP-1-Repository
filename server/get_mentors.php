<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

$stmt = $pdo->query("SELECT id, name, email, description FROM mentor ORDER BY id DESC");
$mentors = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($mentors);
?>
