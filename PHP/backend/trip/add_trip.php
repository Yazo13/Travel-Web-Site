<?php
include '../config/conn.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$title = $_POST['title'];
$description = $_POST['description'];
$distance = $_POST['distance'];
$price = $_POST['price'];
$duration = $_POST['duration'];
$image_url = '';

if (isset($_FILES['image_url'])) {
    $target_dir = "../../../Travel-Web-Site/src/assets/";
    
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $target_file = $target_dir . basename($_FILES["image_url"]["name"]); 
    if (move_uploaded_file($_FILES["image_url"]["tmp_name"], $target_file)) {
        $image_url = 'src/assets/' . basename($_FILES["image_url"]["name"]);
    }
}

$query = "INSERT INTO trip (title, description, distance, price, duration, image_url) VALUES ('$title', '$description', '$distance', '$price', '$duration', '$image_url')";
if (mysqli_query($conn, $query)) {
    $new_trip_id = mysqli_insert_id($conn);
    $new_trip = array(
        'id' => $new_trip_id,
        'title' => $title,
        'description' => $description,
        'distance' => $distance,
        'price' => $price,
        'duration' => $duration,
        'image_url' => $image_url
    );
    echo json_encode($new_trip);
} else {
    echo json_encode(array('error' => 'Error adding trip'));
}
