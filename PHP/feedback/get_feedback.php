<?php
session_start();

include '../config/conn.php';

$query = "SELECT f.id, f.description, u.Username, u.name, f.user_id FROM feedback f JOIN user u ON f.user_id = u.id";
$result = mysqli_query($conn, $query);

$feedback = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $feedback[] = $row;
    }
}

echo json_encode($feedback);
