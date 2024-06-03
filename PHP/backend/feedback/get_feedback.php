<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../config/conn.php';

$query = "SELECT f.description, u.Username, u.name FROM feedback f JOIN user u ON f.user_id = u.id";
$result = mysqli_query($conn, $query);

$feedback = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $feedback[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($feedback);
