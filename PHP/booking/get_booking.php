<?php
include '../config/conn.php';

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

echo json_encode($bookings);
mysqli_close($conn);
