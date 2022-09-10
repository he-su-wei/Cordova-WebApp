<?php

    // session_start();
    include("db_conn.php");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Origin, Methods, Content-Type");

    if(isset($_POST)){

        $storeName = $_POST['storeName'];

        $sql = "SELECT account, comment, img, time FROM `$storeName`";
        $result = mysqli_query($conn, $sql);

        $account = array();

        while ($row = mysqli_fetch_assoc($result)) {
            array_push($account, array($row['account'], $row['comment'], $row['img'], $row['time']));
        }

        echo json_encode($account, JSON_UNESCAPED_UNICODE);

    }
    else{
        $state = array("status" => "fail");
        echo json_encode($state, JSON_UNESCAPED_UNICODE);
    }

    
?>