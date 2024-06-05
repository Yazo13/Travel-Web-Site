<?php
include '../config/conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$id = $request->id;
$title = $request->title;
$description = $request->description;


$query = "UPDATE service SET title=?, description=? WHERE id=?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssi", $title, $description, $id);

if ($stmt->execute()) {
    echo json_encode($request);
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Error updating booking."));
}
