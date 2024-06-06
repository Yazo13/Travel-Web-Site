<?php
include '../config/conn.php';


$query = "SELECT * FROM trip";
$result = mysqli_query($conn, $query);

$trips = [];

while ($row = mysqli_fetch_assoc($result)) {
    $trips[] = $row;
}

echo json_encode($trips);