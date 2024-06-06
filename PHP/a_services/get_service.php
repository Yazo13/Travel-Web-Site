<?php
include '../config/conn.php';

$query = "SELECT * FROM service";
$result = mysqli_query($conn, $query);

$services = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $service = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description']
        );
        $services[] = $service;
    }
}

echo json_encode($services);
mysqli_close($conn);
