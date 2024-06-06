<?php
include '../config/conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$description = mysqli_real_escape_string($conn, $request->description);
$user_id = mysqli_real_escape_string($conn, $request->user_id);

if (empty($description) || empty($user_id)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit();
}

$query = "INSERT INTO feedback (description, user_id) VALUES ('$description', '$user_id')";

if (mysqli_query($conn, $query)) {
    $inserted_feedback = array(
        'description' => $description,
        'user_id' => $user_id
    );
    echo json_encode(['status' => 'success', 'feedback' => $inserted_feedback]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error adding feedback']);
}

mysqli_close($conn);