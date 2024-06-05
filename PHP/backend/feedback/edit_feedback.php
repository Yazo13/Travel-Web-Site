<?php
include '../config/conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$id = $request->id;
$description = $request->description;
$user_id = $request->user_id;

$query = "UPDATE feedback SET description=?, user_id=? WHERE id=?";
$stmt = $conn->prepare($query);
$stmt->bind_param("sii", $description, $user_id, $id);

if ($stmt->execute()) {
    echo json_encode($request);
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Error updating feedback."));
}

mysqli_close($conn);