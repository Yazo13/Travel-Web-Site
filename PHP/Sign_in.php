<?php
session_start();

include_once './config/conn.php'; 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = isset($data['email']) ? trim($data['email']) : '';
    $password = isset($data['password']) ? trim($data['password']) : '';
    
    if (empty($email) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit();
    }

    $query = "SELECT * FROM user WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        while ($item = mysqli_fetch_assoc($result)) {
            if (md5($password) === $item['password']) {
                $_SESSION['user'] = $item;
                echo json_encode(['status' => 'success', 'user' => $item]);
                exit();
            }
        }
        echo json_encode(['status' => 'error', 'message' => 'Incorrect Password!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Incorrect Email!']);
    }
    exit();
}
