<?php
include '../config/conn.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$query = "SELECT * FROM trip";
$result = mysqli_query($conn, $query);

// echo  print_r(mysqli_fetch_all($result));
$trips = [];

while ($row = mysqli_fetch_assoc($result)) {
    $trips[] = $row;
}

echo json_encode($trips);