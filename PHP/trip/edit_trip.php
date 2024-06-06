<?php
include '../config/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $distance = mysqli_real_escape_string($conn, $_POST['distance']);
    $price = mysqli_real_escape_string($conn, $_POST['price']);
    $duration = mysqli_real_escape_string($conn, $_POST['duration']);
    $image_url = '';


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

    if ($image_url) {
        $query = "UPDATE trip SET title = '$title', description = '$description', distance = '$distance', price = '$price', duration = '$duration', image_url = '$image_url' WHERE id = $id";
        mysqli_query($conn, $query);
    } else {
        $query = "UPDATE trip SET title = '$title', description = '$description', distance = '$distance', price = '$price', duration = '$duration',  image_url = 'Not uploaded' WHERE id = $id";
        mysqli_query($conn, $query);
    }

} else {
    echo json_encode(array('error' => 'Invalid request method'));
}

mysqli_close($conn);
