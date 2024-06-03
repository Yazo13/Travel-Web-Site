<?php
include '../config/conn.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$id = $_POST['id'];
$title = $_POST['title'];
$description = $_POST['description'];
$distance = $_POST['distance'];
$price = $_POST['price'];
$duration = $_POST['duration'];
$image_url = $_POST['image_url'];

if (isset($_FILES['image_url'])) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["image_url"]["name"]);
    if (move_uploaded_file($_FILES["image_url"]["tmp_name"], $target_file)) {
        $image_url = $target_file;
    }
}

$query = "UPDATE trip SET title = '$title', description = '$description', distance = '$distance', price = '$price', duration = '$duration', image_url = '$image_url' WHERE id = $id";
if (mysqli_query($conn, $query)) {
    $updated_trip = array(
        'id' => $id,
        'title' => $title,
        'description' => $description,
        'distance' => $distance,
        'price' => $price,
        'duration' => $duration,
        'image_url' => $image_url
    );
    echo json_encode($updated_trip);
} else {
    echo json_encode(array('error' => 'Error updating trip'));
}