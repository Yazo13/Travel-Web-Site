<?php
include '../config/conn.php';

$query = "SELECT * FROM user";
$result = mysqli_query($conn, $query);

$users = [];

while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row;
}

echo json_encode($users);