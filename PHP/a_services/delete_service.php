<?php
include '../config/conn.php';

(int)$id = $_GET['del_service'];

$query = "DELETE FROM service WHERE id = '$id'";
if (mysqli_query($conn, $query)) {
    echo json_encode(array('success' => 'Service deleted successfully'));
} else {
    echo json_encode(array('error' => 'Error deleting trip'));
}