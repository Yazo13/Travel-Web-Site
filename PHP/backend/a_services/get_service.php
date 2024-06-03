<?php
include '../config/conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$query = "SELECT * FROM service";
$result = mysqli_query($conn, $query);

$services = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $service = array(
            'title' => $row['title'],
            'description' => $row['description']
        );
        $services[] = $service;
    }
}

header('Content-Type: application/json');
echo json_encode($services);
