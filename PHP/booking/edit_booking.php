<?php
include '../config/conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$id = mysqli_real_escape_string($conn, $request->id);
$destination = mysqli_real_escape_string($conn, $request->destination);
$date_in = mysqli_real_escape_string($conn, $request->date_in);
$date_out = mysqli_real_escape_string($conn, $request->date_out);
$email = mysqli_real_escape_string($conn, $request->email);

$query = "UPDATE booking SET destination='$destination', date_in='$date_in', date_out='$date_out', email='$email' WHERE id=$id";

if (mysqli_query($conn, $query)) {
    echo json_encode($request);
} else {
    echo json_encode(array("message" => "Error updating booking."));
}
