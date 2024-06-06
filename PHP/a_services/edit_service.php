<?php
include '../config/conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$id = mysqli_real_escape_string($conn, $request->id);
$title = mysqli_real_escape_string($conn, $request->title);
$description = mysqli_real_escape_string($conn, $request->description);

$query = "UPDATE service SET title='$title', description='$description' WHERE id=$id";

if (mysqli_query($conn, $query)) {
    echo json_encode($request);
} else {
    echo json_encode(array("message" => "Error updating booking."));
}
