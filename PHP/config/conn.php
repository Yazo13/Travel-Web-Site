<?php 
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
    $server = "localhost";
    $user = "root";
    $password = "";
    $database = "yazo_travel";

    $conn = mysqli_connect($server, $user, $password,$database);
    // echo "<pre>";
    // echo print_r($conn);
    // echo "</pre>";


    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }