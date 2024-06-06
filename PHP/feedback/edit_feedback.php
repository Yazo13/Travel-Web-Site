<?php
include '../config/conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$id = mysqli_real_escape_string($conn, $request->id);
$description = mysqli_real_escape_string($conn, $request->description);
$user_id = mysqli_real_escape_string($conn, $request->user_id);

if (empty($description) || empty($user_id) || empty($id)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit();
}


$query = "UPDATE feedback SET description='$description', user_id='$user_id' WHERE id=$id";

if (mysqli_query($conn, $query)) {
    echo json_encode($request);
} else {
    echo json_encode(array("message" => "Error updating feedback."));
}

mysqli_close($conn);