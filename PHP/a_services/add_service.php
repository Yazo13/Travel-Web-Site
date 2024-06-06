<?php
include '../config/conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

$title = mysqli_real_escape_string($conn, $request['title']);
$description = mysqli_real_escape_string($conn, $request['description']);

$query = "INSERT INTO service (title, description) VALUES ('$title', '$description')";

if (mysqli_query($conn, $query)) {
    $insertedService = array(
        'id' => mysqli_insert_id($conn),
        'title' => $title,
        'description' => $description
    );
    echo json_encode($insertedService);
} else {
    echo json_encode(array("message" => "Error adding booking."));
}

mysqli_close($conn);