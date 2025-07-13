<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require '../db.php';

try {
    // Girls Mentored: mentee_mentors table
    $stmt1 = $pdo->query("SELECT COUNT(*) FROM mentee_mentors");
    $mentored = $stmt1->fetchColumn();

    // Scholarships Awarded: scholar_donors table
    $stmt2 = $pdo->query("SELECT COUNT(*) FROM scholar_donors");
    $scholarships = $stmt2->fetchColumn();

    // Leaders Engaged: trainee_trainers table
    $stmt3 = $pdo->query("SELECT COUNT(*) FROM trainee_trainers");
    $leaders = $stmt3->fetchColumn();

    echo json_encode([
        "mentored" => (int)$mentored,
        "scholarships" => (int)$scholarships,
        "leaders" => (int)$leaders
    ]);
} catch (Exception $e) {
    echo json_encode([
        "mentored" => 0,
        "scholarships" => 0,
        "leaders" => 0,
        "error" => $e->getMessage()
    ]);
}
?>
