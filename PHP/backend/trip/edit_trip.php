<?php
include '../config/conn.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

// Ensure POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from formData
    $id = $_POST['id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $distance = $_POST['distance'];
    $price = $_POST['price'];
    $duration = $_POST['duration'];
    $image_url = '';

    // Handle file upload if a new file is provided
    if (isset($_FILES['image_url'])) {
        $target_dir = "C:/Users/Admin/Desktop/Travel-Web-Site/src/assets/storage/";

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

    // Prepare the query with optional image_url
    if ($image_url) {
        $query = "UPDATE trip SET title = ?, description = ?, distance = ?, price = ?, duration = ?, image_url = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssdddsi", $title, $description, $distance, $price, $duration, $image_url, $id);
    } else {
        $query = "UPDATE trip SET title = ?, description = ?, distance = ?, price = ?, duration = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssdddi", $title, $description, $distance, $price, $duration, $id);
    }

    // Execute the query
    if ($stmt->execute()) {
        $updated_trip = array(
            'id' => $id,
            'title' => $title,
            'description' => $description,
            'distance' => $distance,
            'price' => $price,
            'duration' => $duration,
            'image_url' => $image_url ? $image_url : $_POST['image_url']
        );
        echo json_encode($updated_trip);
    } else {
        echo json_encode(array('error' => 'Error updating trip'));
    }

    $stmt->close();
} else {
    echo json_encode(array('error' => 'Invalid request method'));
}

mysqli_close($conn);
?>
