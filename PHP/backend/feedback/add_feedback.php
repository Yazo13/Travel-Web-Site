<?php
include '../config/conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$description = $request->description;
$user_id = $request->user_id;

$query = "INSERT INTO feedback (description, user_id) VALUES (?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("si", $description, $user_id);

if ($stmt->execute()) {
    $inserted_feedback = array(
        'description' => $description,
        'user_id' => $user_id
    );
    echo json_encode($inserted_feedback);
} else {
    echo json_encode(array('error' => 'Error adding feedback'));
}

mysqli_close($conn);