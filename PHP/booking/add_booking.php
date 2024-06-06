<?php
include '../config/conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$destination = mysqli_real_escape_string($conn, $request->destination);
$date_in = mysqli_real_escape_string($conn, $request->date_in);
$date_out = mysqli_real_escape_string($conn, $request->date_out);
$email = mysqli_real_escape_string($conn, $request->email);

$query = "INSERT INTO booking (destination, date_in, date_out, email) VALUES ('$destination', '$date_in', '$date_out', '$email')";

if (mysqli_query($conn, $query)) {
    $insertedBooking = array(
        'destination' => $destination,
        'date_in' => $date_in,
        'date_out' => $date_out,
        'email' => $email
    );
    echo json_encode($insertedBooking);
} else {
    echo json_encode(array("message" => "Error adding booking."));
}
mysqli_close($conn);