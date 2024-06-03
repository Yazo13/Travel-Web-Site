
<?php
//----------------------- Add ----------------------------

include '../config/conn.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($data && isset($data['name']) && isset($data['username']) && isset($data['email']) && isset($data['user_role'])) {
        $name = $data['name'];
        $username = $data['username'];
        $email = $data['email'];
        $user_role = intval($data['user_role']);
        $password = $data['password'];

        $query = "INSERT INTO user (name, username, email, user_role, password) VALUES ('$name', '$username', '$email', '$user_role', '$password')";
        if (mysqli_query($conn, $query)) {
            $new_user_id = mysqli_insert_id($conn);
            $new_user = array(
                'id' => $new_user_id,
                'name' => $name,
                'username' => $username,
                'email' => $email,
                'user_role' => $user_role,
                'password' => $password
            );
            echo json_encode($new_user);
        } else {
            echo json_encode(array('error' => 'Error adding user: ' . mysqli_error($conn)));
        }
    } else {
        echo json_encode(array('error' => 'Invalid request data'));
    }
}


//----------------------- DELETE ----------------------------
(int)$id = $_GET['delete'];
$query = "DELETE FROM user WHERE id = $id";
if (mysqli_query($conn, $query)) {
    echo json_encode(array('message' => 'User deleted successfully'));
} else {
    echo json_encode(array('error' => 'Error deleting user'));
}

