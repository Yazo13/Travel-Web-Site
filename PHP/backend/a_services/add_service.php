<?php
include '../config/conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

$title = $request['title'];
$description = $request['description'];

$query = "INSERT INTO service (title, description) VALUES (?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $title, $description);

if ($stmt->execute()) {
    $insertedService = array(
        'id' => $stmt->insert_id,
        'title' => $title,
        'description' => $description
    );
    echo json_encode($insertedService);
} else {
    echo json_encode(array("message" => "Error adding booking."));
}

mysqli_close($conn);