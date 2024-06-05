<?php
include '../config/conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$query = "SELECT * FROM booking";
$result = mysqli_query($conn, $query);

$bookings = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $bookings[] = array(
            'id' => $row['id'],
            'destination' => $row['destination'],
            'date_in' => $row['date_in'],
            'date_out' => $row['date_out'],
            'email' => $row['Email']
        );
    }
}

header('Content-Type: application/json');
echo json_encode($bookings);

mysqli_close($conn);
