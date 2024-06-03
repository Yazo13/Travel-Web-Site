<?php
include '../config/conn.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$query = "SELECT * FROM user";
$result = mysqli_query($conn, $query);

// echo  print_r(mysqli_fetch_all($result));
$users = [];

while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row;
}

echo json_encode($users);