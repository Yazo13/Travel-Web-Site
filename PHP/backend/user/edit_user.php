<?php
//----------------------- Edit ----------------------------

include '../config/conn.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data['id']);
$name = $data['name'];
$username = $data['Username'];
$email = $data['Email'];
$user_role = intval($data['user_role']);
$password = $data['password'];

$query = "UPDATE user SET name = '$name', username = '$username', email = '$email', user_role = $user_role, password = '$password' WHERE id = $id";
if (mysqli_query($conn, $query)) {
    echo json_encode(array('id' => $id, 'name' => $name, 'username' => $username, 'email' => $email, 'user_role' => $user_role, 'password' => $password));
} else {
    echo json_encode(array('error' => 'Error updating user'));
}