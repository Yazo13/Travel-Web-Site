<?php
include '../config/conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$query = "SELECT * FROM role";
$result = mysqli_query($conn, $query);

$role = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $role[] = array(
            'id' => $row['id'],
            'name' => $row['name']
        );
    }
}

header('Content-Type: application/json');
echo json_encode($role);
mysqli_close($conn);
