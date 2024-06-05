<?php
include '../config/conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$name = $request->name;

$query = "INSERT INTO role (name) VALUES (?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $name);

if ($stmt->execute()) {
    $insertedRole = array(
        'id' => $stmt->insert_id,
        'name' => $name
    );
    echo json_encode($insertedRole);
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Error adding role."));
}
mysqli_close($conn);
