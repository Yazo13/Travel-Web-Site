<?php
include '../config/conn.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

(int)$id = $_GET['del_service'];

$query = "DELETE FROM service WHERE id = '$id'";
if (mysqli_query($conn, $query)) {
    echo json_encode(array('success' => 'Service deleted successfully'));
} else {
    echo json_encode(array('error' => 'Error deleting trip'));
}