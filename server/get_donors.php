<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

$stmt = $pdo->query("SELECT id, name, email, description FROM donor ORDER BY id DESC");
$donors = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($donors);
?>
