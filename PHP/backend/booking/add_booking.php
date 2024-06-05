<?php
include '../config/conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

$destination = $request['destination'];
$date_in = $request['date_in'];
$date_out = $request['date_out'];
$email = $request['email'];

$query = "INSERT INTO booking (destination, date_in, date_out, email) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssss", $destination, $date_in, $date_out, $email);

if ($stmt->execute()) {
    $insertedBooking = array(
        'id' => $stmt->insert_id,
        'destination' => $destination,
        'date_in' => $date_in,
        'date_out' => $date_out,
        'email' => $email
    );
    echo json_encode($insertedBooking);
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Error adding booking."));
}
mysqli_close($conn);