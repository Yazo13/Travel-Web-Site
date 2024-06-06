<?php

include '../config/conn.php';


$data = json_decode(file_get_contents("php://input"), true);

$id = intval(mysqli_real_escape_string($conn, $data['id']));
$name = mysqli_real_escape_string($conn, $data['name']);
$username = mysqli_real_escape_string($conn, $data['Username']);
$email = mysqli_real_escape_string($conn, $data['Email']);
$user_role = intval(mysqli_real_escape_string($conn, $data['user_role']));
$password = mysqli_real_escape_string($conn, $data['password']);

$query = "UPDATE user SET name = '$name', username = '$username', email = '$email', user_role = $user_role, password = '$password' WHERE id = $id";
if (mysqli_query($conn, $query)) {
    echo json_encode(array('id' => $id, 'name' => $name, 'username' => $username, 'email' => $email, 'user_role' => $user_role, 'password' => $password));
} else {
    echo json_encode(array('error' => 'Error updating user'));
}