<?php
include '../config/conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$id = mysqli_real_escape_string($conn, $request->id);
$name = mysqli_real_escape_string($conn, $request->name);

$query = "UPDATE role SET name='$name' WHERE id=$id";

if (mysqli_query($conn, $query)) {
    echo json_encode($request);
} else {
    echo json_encode(array("message" => "Error updating role."));
}

mysqli_close($conn);
