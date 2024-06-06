
<?php
//----------------------- Add ----------------------------

include '../config/conn.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($data && isset($data['name']) && isset($data['username']) && isset($data['email']) && isset($data['user_role'])) {
        $name = mysqli_real_escape_string($conn, $data['name']);
        $username = mysqli_real_escape_string($conn, $data['username']);
        $email = mysqli_real_escape_string($conn, $data['email']);
        $user_role = intval(mysqli_real_escape_string($conn, $data['user_role']));
        $password = mysqli_real_escape_string($conn, $data['password']);

        $query = "INSERT INTO user (name, username, email, user_role, password) VALUES ('$name', '$username', '$email', '$user_role', '$password')";
        mysqli_query($conn, $query);
    } else {
        echo json_encode(array('error' => 'Invalid request data'));
    }
}


//----------------------- DELETE ----------------------------
(int)$id = $_GET['del_user'];
$query = "DELETE FROM user WHERE id = $id";
if (mysqli_query($conn, $query)) {
    echo json_encode(array('message' => 'User deleted successfully'));
} else {
    echo json_encode(array('error' => 'Error deleting user'));
}

