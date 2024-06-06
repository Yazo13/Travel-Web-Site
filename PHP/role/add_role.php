<?php
include '../config/conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$name = mysqli_real_escape_string($conn, $request->name);

$query = "INSERT INTO role (name) VALUES ('$name')";

if (mysqli_query($conn, $query)) {
    $insertedRole = array(
        'id' => mysqli_insert_id($conn),
        'name' => $name
    );
    echo json_encode($insertedRole);
} else {
    echo json_encode(array("message" => "Error adding role."));
}

mysqli_close($conn);
