<?php
include '../config/conn.php';

(int)$id = $_GET['del_role'];

$query = "DELETE FROM role WHERE id = '$id'";
if (mysqli_query($conn, $query)) {
    echo json_encode(array('success' => 'Trip deleted successfully'));
} else {
    echo json_encode(array('error' => 'Error deleting trip'));
}