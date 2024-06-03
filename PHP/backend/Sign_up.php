<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include './config/conn.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = isset($data['name']) ? trim($data['name']) : '';
    $username = isset($data['username']) ? trim($data['username']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';
    $password = isset($data['password']) ? trim($data['password']) : '';

    // Basic validation
    if (empty($name) || empty($username) || empty($email) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit();
    }

    // Additional validation
    if (strlen($name) <= 3) {
        echo json_encode(['status' => 'error', 'message' => 'Name must be more than 3 characters.']);
        exit();
    }

    if (strlen($password) <= 8) {
        echo json_encode(['status' => 'error', 'message' => 'Password must be more than 8 characters.']);
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email format.']);
        exit();
    }

    $query = "SELECT * FROM user WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Email already in use.']);
        exit();
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $query = "INSERT INTO user (name, username, email, password) VALUES ('$name', '$username', '$email', '$hashedPassword')";
    $success = mysqli_query($conn, $query);

    if ($success) {
        echo json_encode(['status' => 'success', 'message' => 'Sign up successful! Please log in.']);
        exit();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'An error occurred. Please try again.']);
        exit();
    }
}
