<?php
session_start();

include_once './config/conn.php'; 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $destination = isset($data['Destination']) ? trim($data['Destination']) : '';
    $date_in = isset($data['date_in']) ? trim($data['date_in']) : '';
    $date_out = isset($data['date_out']) ? trim($data['date_out']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';

    if (empty($destination) || empty($date_in) || empty($date_out) || empty($email)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO booking (destination, date_in, date_out, email) VALUES (?, ?, ?, ?)");
    if ($stmt === false) {
        error_log('prepare() failed: ' . htmlspecialchars($conn->error));
        echo json_encode(['status' => 'error', 'message' => 'Database prepare failed.']);
        exit();
    }

    $bind = $stmt->bind_param("ssss", $destination, $date_in, $date_out, $email);
    if ($bind === false) {
        error_log('bind_param() failed: ' . htmlspecialchars($stmt->error));
        echo json_encode(['status' => 'error', 'message' => 'Parameter binding failed.']);
        exit();
    }

    $exec = $stmt->execute();   
    if ($exec) {
        echo json_encode(['status' => 'success', 'message' => 'Booking successful.']);
    } else {
        error_log('execute() failed: ' . htmlspecialchars($stmt->error));
        echo json_encode(['status' => 'error', 'message' => 'Execution failed.']);
    }

}

mysqli_close($conn);
