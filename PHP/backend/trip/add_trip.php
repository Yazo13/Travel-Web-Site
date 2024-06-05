<?php
include '../config/conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

// Ensure POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve JSON data from formData
    $title = $_POST['title'];
    $description = $_POST['description'];
    $distance = $_POST['distance'];
    $price = $_POST['price'];
    $duration = $_POST['duration'];
    $image_url = '';

    // Handle file upload
    if (isset($_FILES['image_url'])) {
        $target_dir = "C:\Users\Admin\Desktop\Travel-Web-Site\src\assets\storage/";
        
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        $target_file = $target_dir . basename($_FILES["image_url"]["name"]); 
        if (move_uploaded_file($_FILES["image_url"]["tmp_name"], $target_file)) {
            $image_url = '../src/assets/storage/' . basename($_FILES["image_url"]["name"]);
        } else {
            echo json_encode(array('error' => 'Error uploading file', 'details' => $_FILES["image_url"]["error"]));
            exit;
        }
    }

    // Insert data into the database
    $query = "INSERT INTO trip (title, description, distance, price, duration, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssddds", $title, $description, $distance, $price, $duration, $image_url);

    if ($stmt->execute()) {
        $new_trip_id = $stmt->insert_id;
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
    $stmt->close();
} else {
    echo json_encode(array('error' => 'Invalid request method'));
}

mysqli_close($conn);
