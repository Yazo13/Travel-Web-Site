<?php
include '../config/conn.php';

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

echo json_encode($role);
mysqli_close($conn);
