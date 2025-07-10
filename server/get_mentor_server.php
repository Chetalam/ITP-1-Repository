<?php
require 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'connect.php';

if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'Missing mentor ID']);
    exit;
}

$mentorId = $_GET['id'];

// You can customize this query to join with mentee table if needed
$sql = "SELECT id, name, email FROM mentor WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $mentorId);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    // Optional: Count mentees if you have a mentee table with mentor_id
    $countStmt = $conn->prepare("SELECT COUNT(*) as total FROM mentee WHERE mentor_id = ?");
    $countStmt->bind_param("i", $mentorId);
    $countStmt->execute();
    $countResult = $countStmt->get_result();
    $countData = $countResult->fetch_assoc();
    $row['mentee_count'] = $countData['total'] ?? 0;
    $countStmt->close();

    echo json_encode($row);
} else {
    echo json_encode(['error' => 'Mentor not found']);
}

$stmt->close();
$conn->close();
?>
